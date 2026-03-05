"use client";
import React from 'react';
import ShelterOccupancy from '@/components/features/analytics/ShelterOccupancy';
import BreedAnalytics from '@/components/features/analytics/BreedAnalytics';
import GlassCard from '@/components/ui/GlassCard';

export default function AdvancedAnalyticsPage() {
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
          <h3 className="text-lg font-bold text-coral mb-4">Strategic Recommendations</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>• Promote Simba: High adoption probability but low exposure.</li>
            <li>• Feature Indie puppies on Instagram; they are trending 3x faster this week.</li>
          </ul>
        </GlassCard>
      </div>
    </div>
  );
}

