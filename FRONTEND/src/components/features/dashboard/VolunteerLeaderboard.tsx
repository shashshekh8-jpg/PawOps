import React from 'react';
import GlassCard from '@/components/ui/GlassCard';

const leaders = [
  { name: 'Rahul Sharma', count: 24, rank: 1 },
  { name: 'Priya Singh', count: 18, rank: 2 },
  { name: 'Arjun Mehta', count: 16, rank: 3 },
];

export default function VolunteerLeaderboard() {
  return (
    <GlassCard className="h-full">
      <h3 className="text-lg font-bold text-white mb-6">Top Volunteers</h3>
      <div className="space-y-4">
        {leaders.map((v) => (
          <div key={v.name} className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group cursor-pointer">
            <div className="flex items-center space-x-3">
              <span className="w-8 h-8 rounded-full bg-teal/20 text-teal flex items-center justify-center font-bold text-xs">{v.rank}</span>
              <span className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">{v.name}</span>
            </div>
            <span className="text-xs font-bold text-teal">{v.count} Rescues</span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

