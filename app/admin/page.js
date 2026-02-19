"use client";
import React, { useState, useEffect } from "react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    properties: 0,
    cities: 0,
    areas: 0,
    enquiries: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/admin/dashboard/stats");
        const data = await res.json();
        if (data.success) {
          setStats(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    { title: "Total Properties", value: stats.properties },
    { title: "Active Cities", value: stats.cities },
    { title: "Active Areas", value: stats.areas },
    { title: "New Enquiries", value: stats.enquiries },
  ];

  return (
    <div className="space-y-6 max-w-[1440px] mx-auto w-full">
      {/* <div className="mb-8">
        <h1 className="font-heading text-3xl text-brand-dark">
          Dashboard Overview
        </h1>
        <p className="mt-1 text-gray-500">
          Welcome back! Here's what's happening today.
        </p>
      </div> */}

      <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className="rounded-xl bg-white p-6 shadow-sm transition hover:shadow-md border border-gray-100"
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
              {card.title}
            </h3>
            <p className="mt-2 font-heading text-4xl text-brand-primary">
              {loading ? "..." : card.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
