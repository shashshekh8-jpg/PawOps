"use client";
import React, { useEffect, useState } from 'react';
import GlassCard from '@/components/ui/GlassCard';
import SkeletonLoader from '@/components/ui/SkeletonLoader';
import api from '@/lib/api';

export default function DonationsPage() {
  const [metrics, setMetrics] = useState<any>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const data = await api.get('/donations/metrics');
        setMetrics(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMetrics();
  }, []);

  if (!metrics) return <SkeletonLoader className="h-48" />;

  return (
    <div className="space-y-6 text-white animate-in fade-in">
      <h1 className="text-2xl font-bold">Donation Intelligence</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <GlassCard className="border-l-4 border-teal">
          <p className="text-xs text-gray-400">Monthly Total</p>
          <h2 className="text-2xl font-bold">{metrics.monthlyTotal}</h2>
        </GlassCard>
        <GlassCard className="border-l-4 border-coral">
          <p className="text-xs text-gray-400">Corporate Grants</p>
          <h2 className="text-2xl font-bold">{metrics.corporateGrants}</h2>
        </GlassCard>
        <GlassCard className="border-l-4 border-accent">
          <p className="text-xs text-gray-400">Indv. Recurring</p>
          <h2 className="text-2xl font-bold">{metrics.individualRecurring}</h2>
        </GlassCard>
      </div>
    </div>
  );
}

