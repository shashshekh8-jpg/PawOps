"use client";
import React, { useEffect, useState } from 'react';
import GlassCard from '@/components/ui/GlassCard';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import api from '@/lib/api';

export default function BreedAnalytics() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const res = await api.get('/analytics/breeds');
        setData(res);
      } catch (err) { 
        console.error(err); 
      }
    };
    fetchBreeds();
  }, []);

  return (
    <GlassCard>
      <h3 className="text-lg font-bold text-white mb-6">Adoption Speed (Avg Days)</h3>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical">
            <XAxis type="number" hide />
            <YAxis dataKey="name" type="category" stroke="#9CA3AF" fontSize={10} axisLine={false} tickLine={false} width={80} />
            <Bar dataKey="days" radius={[0, 4, 4, 0]} barSize={20}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index === 0 ? '#4ECDC4' : '#FF6B6B'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
}
