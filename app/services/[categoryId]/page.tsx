"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import "./providers.css";

export default function ProvidersPage() {

  const { categoryId } = useParams();
  const [providers, setProviders] = useState < any[] > ([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {

    const fetchProviders = async () => {
      try {
        const res = await fetch(`/api/providers?categoryId=${categoryId}`);
        const data = await res.json();
        setProviders(data);
      } catch (error) {
        console.error("Error fetching providers", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();

  }, [categoryId]);

  if (loading) {
    return <div className="providers-container">Loading providers...</div>;
  }

  return (
    <div className="providers-container">

      <h1 className="providers-title">Available Service Providers</h1>

      <div className="providers-grid">

        {providers.length === 0 && (
          <p>No providers available for this service.</p>
        )}

        {providers.map((provider) => (

          <div key={provider.id} className="provider-card">

            <div className="provider-header">
              <div className="provider-avatar">
                {provider.user.name.charAt(0)}
              </div>

              <div>
                <h3>{provider.user.name}</h3>
                <p className="rating">⭐ {provider.rating ?? 4.5}</p>
              </div>
            </div>

            <p className="description">{provider.description}</p>

            <div className="provider-info">
              <span>Experience: {provider.experience} yrs</span>
            </div>

            <button
              className="book-btn"
              onClick={() => router.push(`/booking/${provider.id}`)}
            >
              Book Now
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}