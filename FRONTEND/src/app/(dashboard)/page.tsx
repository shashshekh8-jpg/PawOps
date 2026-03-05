"use client";
import React from 'react';
import MetricStat from '@/components/ui/MetricStat';
import RescueHeatmap from '@/components/features/dashboard/RescueHeatmap';
import AdoptionTrends from '@/components/features/dashboard/AdoptionTrends';
import VolunteerLeaderboard from '@/components/features/dashboard/VolunteerLeaderboard';
import ErrorBoundary from '@/components/ui/ErrorBoundary';

export default function DashboardHome() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-white">Command Center</h1>
        <p className="text-gray-400 text-sm">Real-time rescue intelligence for pawops Operations.</p>
      </div>
      
      {/* Top Metrics Section - Implements animated counting [cite: 165] */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricStat label="Animals Rescued" value={82} color="#FF6B6B" trend="+12%" />
        <MetricStat label="Adoptions Completed" value={61} color="#4ECDC4" trend="+5%" />
        <MetricStat label="Active Volunteers" value={47} color="#FFE66D" trend="+2" />
        <MetricStat label="Donations (Month)" value="₹1.2L" color="#3B82F6" trend="+18%" />
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

