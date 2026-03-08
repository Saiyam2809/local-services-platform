"use client";

import { useEffect, useState } from "react";
import "./providers.css";

export default function AdminProviders() {

  const [providers, setProviders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchProviders = async () => {

      const res = await fetch("/api/admin/providers");
      const data = await res.json();

      setProviders(data);
      setLoading(false);
    };

    fetchProviders();

  }, []);


  const approveProvider = async (id: string) => {

    await fetch(`/api/admin/providers/${id}`, {
      method: "PATCH"
    });

    setProviders(prev =>
      prev.map(p =>
        p.id === id ? { ...p, isApproved: true } : p
      )
    );
  };


  if (loading) {
    return <p className="loading">Loading providers...</p>;
  }


  return (

    <div className="providers-container">

      <h1>Provider Approvals</h1>

      {providers.length === 0 && (
        <p>No providers found</p>
      )}

      <div className="providers-grid">

        {providers.map(provider => (

          <div key={provider.id} className="provider-card">

            <h3>{provider.user?.name}</h3>

            <p><b>Email:</b> {provider.user?.email}</p>

            <p><b>Experience:</b> {provider.experience || 0} years</p>

            <p><b>Category:</b> {provider.category?.name}</p>

            <p>
              <b>Status:</b>
              {provider.isApproved ? (
                <span className="approved"> Approved</span>
              ) : (
                <span className="pending"> Pending</span>
              )}
            </p>

            {!provider.isApproved && (
              <button
                className="approve-btn"
                onClick={() => approveProvider(provider.id)}
              >
                Approve Provider
              </button>
            )}

          </div>

        ))}

      </div>

    </div>

  );

}