"use client";
import React from 'react';
import GlassCard from '@/components/ui/GlassCard';

export default function RescueHeatmap() {
  return (
    <GlassCard className="h-[400px] flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-white">Rescue Heatmap</h3>
        <span className="text-xs text-coral font-bold uppercase tracking-widest flex items-center">
          <span className="w-2 h-2 bg-coral rounded-full mr-2 animate-ping"></span> High Activity Zones
        </span>
      </div>
      <div className="flex-1 bg-black/40 rounded-xl border border-white/5 relative flex items-center justify-center group overflow-hidden">
        <div className="absolute inset-0 opacity-20 grayscale" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        <p className="text-gray-500 text-sm font-medium z-10 group-hover:text-teal transition-colors">Interactive Map Layer (Gurgaon)</p>
        
        <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-coral rounded-full shadow-[0_0_15px_#FF6B6B] animate-pulse"></div>
        <div className="absolute top-2/3 left-1/2 w-4 h-4 bg-coral rounded-full shadow-[0_0_20px_#FF6B6B] animate-pulse"></div>
      </div>
    </GlassCard>
  );
}

