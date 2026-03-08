"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import StatCard from "./components/StatCard";

import "./dashboard.css";

export default function Dashboard() {

  const router = useRouter();
  const { data: session, status } = useSession();

  const [stats, setStats] = useState({
    totalBookings: 0,
    completed: 0,
    pending: 0,
    reviews: 0
  });

  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (status === "loading") return;

    if (!session) {
      router.push("/login");
      return;
    }

    const role = (session.user as any).role;

    // 🔒 Prevent providers/admin from accessing user dashboard
    if (role === "PROVIDER") {
  router.push("/provider/dashboard");
  return;
}

if (role === "ADMIN") {
  router.push("/admin/dashboard");
  return;
}

    const fetchData = async () => {

      try {

        const statsRes = await fetch("/api/dashboard");
        const statsData = await statsRes.json();

        setStats(statsData);

        const bookingsRes = await fetch("/api/user/bookings");
        const bookingsData = await bookingsRes.json();

        setBookings(bookingsData);

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }

    };

    fetchData();

  }, [session, status, router]);

  if (loading) {
    return <p style={{ padding: "40px" }}>Loading dashboard...</p>;
  }

  return (

    <div className="dashboard">

      <Sidebar />

      <div className="dashboard-main">

        <Header />

        <div className="dashboard-content">

          <h1>Dashboard</h1>

          <div className="stats-grid">

            <StatCard
              title="Total Bookings"
              value={stats.totalBookings.toString()}
            />

            <StatCard
              title="Completed Jobs"
              value={stats.completed.toString()}
            />

            <StatCard
              title="Pending Requests"
              value={stats.pending.toString()}
            />

            <StatCard
              title="Reviews"
              value={stats.reviews.toString()}
            />

          </div>

          <h2 style={{ marginTop: "40px" }}>Recent Bookings</h2>

          {bookings.length === 0 && (
            <p>No bookings yet</p>
          )}

          {bookings.map((b) => (

            <div key={b.id} className="booking-item">

              <p><strong>Provider:</strong> {b.provider?.user?.name}</p>

              <p><strong>Status:</strong> {b.status}</p>

              <p><strong>Date:</strong> {new Date(b.date).toDateString()}</p>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}