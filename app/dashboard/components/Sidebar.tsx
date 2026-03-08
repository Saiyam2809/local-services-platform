"use client";

import Link from "next/link";

export default function Sidebar() {
    return (
        <div className="sidebar">

            <h2 className="logo">LocalServe</h2>

            <nav>

                <Link href="/dashboard">Dashboard</Link>

                <Link href="/providers">Providers</Link>

                <Link href="/bookings">Bookings</Link>

                <Link href="/reviews">Reviews</Link>

            </nav>

        </div>
    );
}