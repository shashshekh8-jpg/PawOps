"use client";
import React from 'react';
import GlassCard from '@/components/ui/GlassCard';

export default function ShelterOccupancy() {
  const cap = 150;
  const occ = 138;
  const per = (occ / cap) * 100;

  return (
    <GlassCard>
      <h3 className="text-lg font-bold text-white mb-6">Shelter Occupancy</h3>
      <div className="w-full bg-white/5 h-12 rounded-2xl border border-white/10 relative overflow-hidden p-1">
        <div 
          className="h-full bg-gradient-to-r from-teal to-coral rounded-xl transition-all duration-1000 flex items-center px-4"
          style={{ width: `${per}%` }}
        >
          <span className="text-[10px] font-black text-background">{Math.round(per)}% Full</span>
        </div>
      </div>
      <div className="mt-4 flex justify-between text-[10px] font-bold text-gray-500 uppercase">
        <span>Current: {occ}</span>
        <span>Capacity: {cap}</span>
      </div>
    </GlassCard>
  );
}

