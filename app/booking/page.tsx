"use client";

import { useEffect, useState } from "react";

export default function BookingsPage() {

    const [bookings, setBookings] = useState([]);

    useEffect(() => {

        const fetchBookings = async () => {

            const res = await fetch("/api/bookings");
            const data = await res.json();

            setBookings(data);

        };

        fetchBookings();

    }, []);

    return (

        <div style={{ padding: "40px" }}>

            <h1>Your Bookings</h1>

            {bookings.map((booking) => (
                <div key={booking.id}>

                    <p>{booking.provider.user.name}</p>
                    <p>{booking.date}</p>
                    <p>{booking.status}</p>

                </div>
            ))}

        </div>

    );

}