"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "./admin.css";

export default function AdminDashboard() {

  const router = useRouter();

  const [stats,setStats] = useState({
    users:0,
    providers:0,
    bookings:0
  });

  useEffect(()=>{

    const fetchStats = async()=>{

      const res = await fetch("/api/admin/stats");
      const data = await res.json();

      setStats(data);
    };

    fetchStats();

  },[]);

  return (
    <div className="admin-container">

      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Manage providers, bookings and platform activity</p>
      </header>

      <div className="admin-grid">

        <div className="admin-card">
          <h3>Total Users</h3>
          <p>{stats.users}</p>
        </div>

        <div className="admin-card">
          <h3>Total Providers</h3>
          <p>{stats.providers}</p>
        </div>

        <div className="admin-card">
          <h3>Total Bookings</h3>
          <p>{stats.bookings}</p>
        </div>

      </div>

      <div className="admin-section">

        <h2>Quick Actions</h2>

        <div className="admin-actions">

          <button
            className="admin-btn"
            onClick={() => router.push("/admin/providers")}
          >
            Approve Providers
          </button>

          <button
            className="admin-btn"
            onClick={() => router.push("/admin/categories")}
          >
            Manage Categories
          </button>

          <button
            className="admin-btn"
            onClick={() => router.push("/admin/reviews")}
          >
            Moderate Reviews
          </button>

        </div>

      </div>

    </div>
  );
}