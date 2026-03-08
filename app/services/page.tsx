"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import "./services.css";

export default function ServicesPage() {

  const { data: session, status } = useSession();
  const router = useRouter();

  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {

    if (status === "loading") return;

    if (!session) {
      router.push("/login");
      return;
    }

    const role = (session.user as any).role;

    if (role !== "USER") {
      router.push("/provider/dashboard");
      return;
    }

  }, [session, status, router]);

  useEffect(() => {

    const fetchServices = async () => {
      const res = await fetch("/api/services");
      const data = await res.json();
      setServices(data);
    };

    fetchServices();

  }, []);

  return (

    <div className="services-container">

      {/* Header Navigation */}

      <div className="services-header">

        <h1>Available Services</h1>

        <button
          className="dashboard-btn"
          onClick={() => router.push("/dashboard")}
        >
          Go to Dashboard
        </button>

      </div>

      <div className="services-grid">

        {services.map((service) => (

          <div key={service.id} className="service-card">

            <h3>{service.name}</h3>

            <button
              className="book-btn"
              onClick={() => router.push(`/services/${service.id}`)}
            >
              View Providers
            </button>

          </div>

        ))}

      </div>

    </div>

  );
}