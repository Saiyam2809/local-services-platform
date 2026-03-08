/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import "./categories.css";

export default function CategoriesPage() {

const [categories,setCategories] = useState<any[]>([]);
const [name,setName] = useState("");

const fetchCategories = async () => {
const res = await fetch("/api/admin/categories");
const data = await res.json();
setCategories(data);
};

useEffect(()=>{
fetchCategories();
},[]);

const addCategory = async () => {

if(!name) return;

await fetch("/api/admin/categories",{
  method:"POST",
  headers:{ "Content-Type":"application/json"},
  body:JSON.stringify({name})
});

setName("");
fetchCategories();

};

const deleteCategory = async(id: string)=>{

await fetch(`/api/admin/categories/${id}`,{
  method:"DELETE"
});

fetchCategories();

};

return(

<div className="categories-container">

  <h1>Manage Categories</h1>

  <div className="add-category">

    <input
      placeholder="Category name"
      value={name}
      onChange={(e)=>setName(e.target.value)}
    />

    <button onClick={addCategory}>
      Add Category
    </button>

  </div>

  <div className="categories-grid">

    {categories.map(cat=>(
      <div key={cat.id} className="category-card">

        <p>{cat.name}</p>

        <button
          onClick={()=>deleteCategory(cat.id)}
          className="delete-btn"
        >
          Delete
        </button>

      </div>
    ))}

  </div>

</div>

)
}