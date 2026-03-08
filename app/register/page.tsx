"use client";

import { useState, useEffect } from "react";
import styles from "./register.module.css";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const [role, setRole] = useState("USER");
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const router = useRouter();

  // Fetch service categories
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("/api/services");
      const data = await res.json();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const form = new FormData(e.target);

    const data = {
      name: form.get("name"),
      email: form.get("email"),
      password: form.get("password"),
      role,
      categoryId: form.get("categoryId"),
      description: form.get("description"),
      experience: Number(form.get("experience")),
    };

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (res.ok) {
      setMessage("Registration successful!");
      e.target.reset();
      router.push("/login");
    } else {
      setMessage(result.error || "Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Create Account</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            className={styles.input}
            name="name"
            placeholder="Full Name"
            required
          />

          <input
            className={styles.input}
            name="email"
            type="email"
            placeholder="Email"
            required
          />

          <input
            className={styles.input}
            name="password"
            type="password"
            placeholder="Password"
            required
          />

          <div className={styles.roleBox}>
            <label>Select Account Type</label>

            <select
              className={styles.select}
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="USER">User</option>
              <option value="PROVIDER">Service Provider</option>
            </select>
          </div>

          {role === "PROVIDER" && (
            <div className={styles.providerFields}>
              <select
                className={styles.select}
                name="categoryId"
                required
              >
                <option value="">Select Service</option>

                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <textarea
                className={styles.textarea}
                name="description"
                placeholder="Describe your service"
              />

              <input
                className={styles.input}
                name="experience"
                type="number"
                placeholder="Years of Experience"
              />
            </div>
          )}
<div className="auth-links">

        <p>
          Already have an account?{" "}
          <Link href="/login">Login</Link>
        </p>

        <Link href="/">Back to Home</Link>

      </div>

          <button className={styles.button} disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>

          {message && <p className={styles.message}>{message}</p>}
        </form>
      </div>
    </div>
  );
}