"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import "./provider.css";

export default function ProviderDashboard() {

  const { data: session, status } = useSession();
  const router = useRouter();

  const [providerId, setProviderId] = useState("");

  const [stats, setStats] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0
  });

  const [bookings, setBookings] = useState<any[]>([]);
  const [available, setAvailable] = useState(true);

  /*
  -----------------------------
  ROLE PROTECTION
  -----------------------------
  */

  useEffect(() => {

    if (status === "loading") return;

    if (!session) {
      router.push("/login");
      return;
    }

    const role = (session.user as any).role;

    if (role === "USER") {
  router.push("/dashboard");
}

if (role === "ADMIN") {
  router.push("/admin/dashboard");
}

  }, [session, status, router]);

  /*
  -----------------------------
  FETCH PROVIDER PROFILE
  -----------------------------
  */

  useEffect(() => {

    const fetchProvider = async () => {

      const res = await fetch("/api/provider/profile");
const data = await res.json();

if (!data) {
  console.log("Provider profile not found");
  return;
}

setProviderId(data.id);
setAvailable(data.isAvailable);
    };

    fetchProvider();

  }, []);

  /*
  -----------------------------
  FETCH STATS
  -----------------------------
  */

  useEffect(() => {

    if (!providerId) return;

    const fetchStats = async () => {

      const res = await fetch(`/api/provider/stats?providerId=${providerId}`);
      const data = await res.json();

      setStats(data);
    };

    fetchStats();

  }, [providerId]);

  /*
  -----------------------------
  FETCH BOOKINGS
  -----------------------------
  */

  useEffect(() => {

    const fetchBookings = async () => {

      const res = await fetch("/api/provider/bookings");
      const data = await res.json();

      setBookings(data);
    };

    fetchBookings();

  }, []);

  /*
  -----------------------------
  UPDATE BOOKING STATUS
  -----------------------------
  */

  const updateStatus = async (bookingId: string, status: string) => {

    await fetch(`/api/bookings/${bookingId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ status })
    });

    const res = await fetch("/api/provider/bookings");
    const data = await res.json();

    setBookings(data);
  };

  /*
  -----------------------------
  TOGGLE AVAILABILITY
  -----------------------------
  */

  const toggleAvailability = async () => {

    await fetch("/api/provider/availability", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ isAvailable: !available })
    });

    setAvailable(!available);
  };

  return (
    <div className="provider-container">

      <h1>Provider Dashboard</h1>

      {/* Availability toggle */}

      <div className="availability-toggle">

        <p>Status:</p>

        <button onClick={toggleAvailability}>
          {available ? "Set Unavailable" : "Set Available"}
        </button>

      </div>


      {/* Stats cards */}

      <div className="dashboard-cards">

        <div className="dashboard-card">
          <h3>Total Bookings</h3>
          <p>{stats.totalBookings}</p>
        </div>

        <div className="dashboard-card">
          <h3>Pending Requests</h3>
          <p>{stats.pendingBookings}</p>
        </div>

        <div className="dashboard-card">
          <h3>Completed Jobs</h3>
          <p>{stats.completedBookings}</p>
        </div>

      </div>


      {/* Booking requests */}

      <h2>Booking Requests</h2>

      {bookings.length === 0 && (
        <p>No bookings yet</p>
      )}

      {bookings.map((b) => (

        <div key={b.id} className="booking-card">

          <p><strong>User:</strong> {b.user?.name}</p>
          <p><strong>Date:</strong> {new Date(b.date).toDateString()}</p>
          <p><strong>Status:</strong> {b.status}</p>

          {/* Pending */}

          {b.status === "PENDING" && (
            <>
              <button onClick={() => updateStatus(b.id, "ACCEPTED")}>
                Accept
              </button>

              <button onClick={() => updateStatus(b.id, "CANCELLED")}>
                Reject
              </button>
            </>
          )}

          {/* Confirmed */}

          {b.status === "ACCEPTED" && (
  <button onClick={() => updateStatus(b.id, "IN_PROGRESS")}>
    Start Job
  </button>
)}

          {/* In Progress */}

          {b.status === "IN_PROGRESS" && (
            <button onClick={() => updateStatus(b.id, "COMPLETED")}>
              Complete Job
            </button>
          )}

        </div>

      ))}

    </div>
  );
}