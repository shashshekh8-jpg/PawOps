import React from 'react';
import CampaignFunnel from '@/components/features/analytics/CampaignFunnel';
import GlassCard from '@/components/ui/GlassCard';

export default function CampaignsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Campaign Efficiency</h1>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <CampaignFunnel />
        <GlassCard>
          <h3 className="text-lg font-bold mb-4">Top Performing Drive</h3>
          <p className="text-sm text-gray-400">"Adopt Don't Shop 2025" generated 14 successful placements in 30 days.</p>
        </GlassCard>
      </div>
    </div>
  );
}

