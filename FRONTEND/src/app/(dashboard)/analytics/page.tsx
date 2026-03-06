"use client";
import React, { useEffect, useState } from 'react';
import ShelterOccupancy from '@/components/features/analytics/ShelterOccupancy';
import BreedAnalytics from '@/components/features/analytics/BreedAnalytics';
import GlassCard from '@/components/ui/GlassCard';
import api from '@/lib/api';

export default function AdvancedAnalyticsPage() {
  const [recs, setRecs] = useState<string[]>([]);

  useEffect(() => {
    const fetchRecs = async () => {
      try {
        const data = await api.get('/analytics/recommendations');
        setRecs(data);
      } catch (err) { console.error(err); }
    };
    fetchRecs();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-teal/20 rounded-lg text-teal">🚀</div>
        <h1 className="text-2xl font-bold text-white">Intelligence Panel</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ShelterOccupancy />
        <BreedAnalytics />
        <GlassCard className="lg:col-span-2">
          <h3 className="text-lg font-bold text-coral mb-4">AI Strategic Recommendations</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            {recs.length > 0 ? recs.map((r, i) => <li key={i}>{r}</li>) : <li>• Analyzing database telemetry...</li>}
          </ul>
        </GlassCard>
      </div>
    </div>
  );
}
