"use client";
import React, { useEffect, useState } from 'react';
import GlassCard from '@/components/ui/GlassCard';
import SkeletonLoader from '@/components/ui/SkeletonLoader';
import api from '@/lib/api';

export default function CampaignFunnel() {
  const [funnel, setFunnel] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFunnel = async () => {
      try {
        const data = await api.get('/campaigns/funnel');
        setFunnel(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFunnel();
  }, []);

  if (loading) return <SkeletonLoader className="h-64" />;

  return (
    <GlassCard>
      <h3 className="text-lg font-bold text-white mb-6">Conversion Funnel</h3>
      <div className="space-y-3">
        {funnel.map((f) => (
          <div key={f.stage} className="space-y-1">
            <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              <span>{f.stage}</span>
              <span>{f.val}</span>
            </div>
            <div className={`h-8 ${f.color} ${f.w} rounded-lg shadow-lg opacity-80 hover:opacity-100 transition-opacity`}></div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

