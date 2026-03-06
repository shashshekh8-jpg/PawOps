"use client";
import React, { useEffect, useState } from 'react';
import MetricStat from '@/components/ui/MetricStat';
import RescueHeatmap from '@/components/features/dashboard/RescueHeatmap';
import AdoptionTrends from '@/components/features/dashboard/AdoptionTrends';
import VolunteerLeaderboard from '@/components/features/dashboard/VolunteerLeaderboard';
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import api from '@/lib/api';

export default function DashboardHome() {
  const [metrics, setMetrics] = useState({
    animalsRescued: 0,
    adoptionsCompleted: 0,
    activeVolunteers: 0,
    monthlyDonations: "₹0"
  });

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const data = await api.get('/analytics/summary');
        setMetrics(data);
      } catch (err) {
        console.error("Failed to fetch summary", err);
      }
    };
    fetchSummary();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-white">Command Center</h1>
        <p className="text-gray-400 text-sm">Real-time rescue intelligence for pawops Operations.</p>
      </div>
      
      {/* Top Metrics Section - Now wired to live database metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricStat label="Animals Rescued" value={metrics.animalsRescued} color="#FF6B6B" trend="Live" />
        <MetricStat label="Adoptions Completed" value={metrics.adoptionsCompleted} color="#4ECDC4" trend="Live" />
        <MetricStat label="Active Volunteers" value={metrics.activeVolunteers} color="#FFE66D" trend="Live" />
        <MetricStat label="Donations (Month)" value={metrics.monthlyDonations} color="#3B82F6" trend="Live" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ErrorBoundary fallbackName="Rescue Heatmap">
            <RescueHeatmap />
          </ErrorBoundary>
          <ErrorBoundary fallbackName="Adoption Trends">
            <AdoptionTrends />
          </ErrorBoundary>
        </div>
        <div className="lg:col-span-1">
          <VolunteerLeaderboard />
        </div>
      </div>
    </div>
  );
}
