"use client";
import React, { useEffect, useState } from 'react';
import CampaignFunnel from '@/components/features/analytics/CampaignFunnel';
import GlassCard from '@/components/ui/GlassCard';
import api from '@/lib/api';

export default function CampaignsPage() {
  const [topDrive, setTopDrive] = useState<any>(null);

  useEffect(() => {
    const fetchTop = async () => {
      try {
        const data = await api.get('/campaigns/top');
        setTopDrive(data);
      } catch (err) { console.error(err); }
    };
    fetchTop();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Campaign Efficiency</h1>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <CampaignFunnel />
        <GlassCard>
          <h3 className="text-lg font-bold mb-4">Top Performing Drive</h3>
          {topDrive ? (
             <p className="text-sm text-gray-400 animate-in fade-in">
               "<span className="text-white font-bold">{topDrive.name}</span>" generated <span className="text-teal font-bold">{topDrive.adoptions_driven}</span> successful placements in {topDrive.duration_days} days.
             </p>
          ) : (
             <p className="text-sm text-gray-600">Calculating metrics...</p>
          )}
        </GlassCard>
      </div>
    </div>
  );
}
