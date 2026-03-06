"use client";
import React, { useEffect, useState } from 'react';
import GlassCard from '@/components/ui/GlassCard';
import api from '@/lib/api';

export default function VolunteerLeaderboard() {
  const [leaders, setLeaders] = useState<any[]>([]);

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        const data = await api.get('/volunteers');
        // Grab only the top 5 for the dashboard widget
        setLeaders(data.slice(0, 5)); 
      } catch (err) { 
        console.error(err); 
      }
    };
    fetchLeaders();
  }, []);

  return (
    <GlassCard className="h-full">
      <h3 className="text-lg font-bold text-white mb-6">Top Volunteers</h3>
      <div className="space-y-4">
        {leaders.map((v, index) => (
          <div key={v.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group cursor-pointer">
            <div className="flex items-center space-x-3">
              <span className="w-8 h-8 rounded-full bg-teal/20 text-teal flex items-center justify-center font-bold text-xs">{index + 1}</span>
              <span className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">{v.name}</span>
            </div>
            <span className="text-xs font-bold text-teal">{v.rescues} Rescues</span>
          </div>
        ))}
        {leaders.length === 0 && <p className="text-xs text-gray-500 text-center">No active volunteers found.</p>}
      </div>
    </GlassCard>
  );
}
