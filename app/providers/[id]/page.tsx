"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import "./providerProfile.css";

export default function ProviderProfile() {

  const { id } = useParams();
  const [provider, setProvider] = useState<any>(null);
  const [date, setDate] = useState("");
const [address, setAddress] = useState("");

  useEffect(() => {

    const fetchProvider = async () => {

      const res = await fetch(`/api/providers/${id}`);
      const data = await res.json();

      setProvider(data);
    };

    fetchProvider();

  }, []);

const handleBooking = async () => {

  if (!date || !address) {
    alert("Please fill all fields");
    return;
  }

  const res = await fetch("/api/bookings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      providerId: id,
      date,
      address
    }),
  });

  const data = await res.json();

  if (res.ok) {
    alert("Booking created successfully");
  } else {
    alert(data.error);
  }

};
  if (!provider) return <p className="loading">Loading...</p>;

  return (

    <div className="provider-page">

      <div className="provider-card">

        <h1>{provider.user.name}</h1>

        <h3 className="service">{provider.serviceType}</h3>

        <p className="description">{provider.description}</p>

        <div className="provider-details">

          <p><strong>Experience:</strong> {provider.experience} years</p>

          <p><strong>Rating:</strong> {provider.rating} ⭐</p>

        </div>

        <div className="booking-box">

  <label>Select Date</label>
  <input
    type="date"
    value={date}
    onChange={(e) => setDate(e.target.value)}
  />

  <label>Service Address</label>

  <textarea
    placeholder="Enter service address"
    value={address}
    onChange={(e) => setAddress(e.target.value)}
  />

  <button onClick={handleBooking}>
    Book Service
  </button>

</div>

      </div>

    </div>

  );

}