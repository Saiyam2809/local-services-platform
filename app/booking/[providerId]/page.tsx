"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import "./booking.css";

export default function BookingPage() {

    const { providerId } = useParams();
    const router = useRouter();
    const [date, setDate] = useState("");
    const [address, setAddress] = useState("");
    const [loading, setLoading] = useState(false);

const handleBooking = async () => {

  if (!date || !address) {
    alert("Please fill all fields");
    return;
  }

  try {

    setLoading(true);

    const providerIdStr = Array.isArray(providerId)
      ? providerId[0]
      : providerId;

    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        providerId: providerIdStr,
        date,
        address
      }),
    });

    const data = await res.json();

    setLoading(false);

    if (!res.ok) {
      alert(data.error);
      return;
    }

    alert("Booking created successfully!");
    router.push("/dashboard");

  } catch (error) {

    console.error(error);
    alert("Something went wrong");

    setLoading(false);
  }
};

    return (
  <div className="booking-container">

    <h1>Book Service</h1>

    <div className="booking-card">

      <label>Select Date</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <label>Service Address</label>

      <textarea
        placeholder="Enter your service address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <button onClick={handleBooking} disabled={loading}>
        {loading ? "Booking..." : "Book Service"}
      </button>

    </div>

  </div>
);
}