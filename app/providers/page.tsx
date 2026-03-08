"use client";

import { useEffect, useState } from "react";
import "./providers.css";
import { useRouter } from "next/navigation";

export default function ProvidersPage() {

    const [providers, setProviders] = useState([]);
    const router = useRouter();
    useEffect(() => {
        const fetchProviders = async () => {
            const res = await fetch("/api/providers");
            const data = await res.json();
            setProviders(data);
        };
        fetchProviders();
    }, []);

    return (
        <div className="providers-container">
            <h1>Service Providers</h1>
            <div className="providers-grid">
                {providers.map((provider: any) => (
                    <div key={provider.id} className="provider-card">
                        <h3>{provider.user.name}</h3>
                        <p className="service">{provider.service}</p>
                        <p>{provider.description}</p>
                        <p className="exp">
                            Experience: {provider.experience} years
                        </p>
                        <button onClick={() => router.push(`/providers/${provider.id}`)}>
                            View Profile
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}