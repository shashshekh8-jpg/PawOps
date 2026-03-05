import React from 'react';
import GlassCard from '@/components/ui/GlassCard';

export default function AdoptionGauge({ probability }: { probability: number }) {
  const dashArray = 314; // Circumference calculation [cite: 2, 3]
  const offset = dashArray - (dashArray * (probability || 0)) / 100;

  return (
    <GlassCard className="flex flex-col items-center justify-center text-center">
      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Adoption Prediction</h3>
      <div className="relative flex items-center justify-center">
        <svg className="w-32 h-32 transform -rotate-90">
          <circle cx="64" cy="64" r="50" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
          <circle 
            cx="64" cy="64" r="50" fill="transparent" stroke="#4ECDC4" strokeWidth="8" 
            strokeDasharray={dashArray} strokeDashoffset={offset} 
            strokeLinecap="round" className="transition-all duration-1000 ease-out" 
          />
        </svg>
        <span className="absolute text-2xl font-black text-white">{probability}%</span>
      </div>
      <p className="mt-6 text-[10px] text-gray-400 max-w-[150px]">Calculated based on breed, health history, and campaign trends.</p>
    </GlassCard>
  );
}

