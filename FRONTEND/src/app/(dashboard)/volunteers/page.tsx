"use client";
import React, { useEffect, useState } from 'react';
import GlassCard from '@/components/ui/GlassCard';
import StatusBadge from '@/components/ui/StatusBadge';
import SkeletonLoader from '@/components/ui/SkeletonLoader';
import api from '@/lib/api';

export default function VolunteersPage() {
  const [team, setTeam] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const data = await api.get('/volunteers');
        setTeam(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  if (loading) return <SkeletonLoader className="h-96 w-full" />;

  return (
    <div className="space-y-6 animate-in fade-in">
      <h1 className="text-2xl font-bold text-white">Volunteer Force</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {team.map((v) => (
          <GlassCard key={v.id} className="flex items-center justify-between hover:border-teal/50 transition-colors">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-teal to-blue-500 shadow-lg flex items-center justify-center font-bold text-white text-xs">
                {v.name.charAt(0)}
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">{v.name}</h4>
                <StatusBadge status={v.role} type="role" />
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-teal font-bold">{v.rescues} Rescues</p>
              {/* Dynamic Impact Score calculated in backend [cite: 101] */}
              <p className="text-[10px] text-accent font-mono mt-1">Impact Score: {v.impactScore}</p>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

