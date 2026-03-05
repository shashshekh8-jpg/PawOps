"use client";
import React, { useState } from 'react';
import RescueEntryModal from '@/components/features/rescues/RescueEntryModal';
import FloatingActionButton from '@/components/ui/FloatingActionButton';
import GlassCard from '@/components/ui/GlassCard';

export default function RescuesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6 relative min-h-[80vh]">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Rescue Operations</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <GlassCard key={i} className="flex flex-col space-y-4">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-xl">🚑</div>
              <span className="text-[10px] text-gray-500 font-mono">ID: #RSC-982{i}</span>
            </div>
            <div>
              <h3 className="text-white font-bold text-sm">Gurgaon Sector 14</h3>
              <p className="text-xs text-gray-400 mt-1">Indie Dog • Leg Injury • Reported 2h ago</p>
            </div>
            <div className="pt-4 border-t border-white/5 flex justify-between items-center">
              <span className="text-[10px] font-bold text-teal uppercase tracking-widest">In Transit</span>
              <button className="text-[10px] font-bold text-gray-400 hover:text-white transition">View Log</button>
            </div>
          </GlassCard>
        ))}
      </div>

      {isModalOpen && <RescueEntryModal onClose={() => setIsModalOpen(false)} />}
      <FloatingActionButton label="Log New Rescue" onClick={() => setIsModalOpen(true)} />
    </div>
  );
}

