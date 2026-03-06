"use client";
import React, { useEffect, useState } from 'react';
import GlassCard from '@/components/ui/GlassCard';
import api from '@/lib/api';

export default function ShelterOccupancy() {
  const [stats, setStats] = useState({ current: 0, capacity: 200 });

  useEffect(() => {
    const fetchOccupancy = async () => {
      try {
        const res = await api.get('/analytics/occupancy');
        setStats(res);
      } catch (err) { 
        console.error(err); 
      }
    };
    fetchOccupancy();
  }, []);

  const per = Math.min((stats.current / stats.capacity) * 100, 100);

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
        <span>Current: {stats.current}</span>
        <span>Capacity: {stats.capacity}</span>
      </div>
    </GlassCard>
  );
}
