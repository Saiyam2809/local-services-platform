"use client";

import { useEffect, useState } from "react";
import "./reviews.css";

export default function ReviewsPage(){

const [reviews,setReviews] = useState<any[]>([]);

const fetchReviews = async()=>{
const res = await fetch("/api/admin/reviews");
const data = await res.json();
setReviews(data);
};

useEffect(()=>{
(async () => {
  await fetchReviews();
})();
},[]);

const deleteReview = async(id: string)=>{

await fetch(`/api/admin/reviews/${id}`,{
method:"DELETE"
});

fetchReviews();
};

return(
<>
<h1>Moderate Reviews</h1>
{reviews.map((r) => (
  <div key={r.id} className="review-card">

    <p><b>User:</b> {r.user?.name}</p>

    <p><b>Provider:</b> {r.provider?.user?.name}</p>

    <p><b>Rating:</b> ⭐ {r.rating}</p>

    <p>{r.comment}</p>

    <button
      onClick={() => deleteReview(r.id)}
      className="delete-btn"
    >
      Delete Review
    </button>

  </div>
))}
</>
)
}