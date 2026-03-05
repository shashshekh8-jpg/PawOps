"use client";
import React from 'react';
import GlassCard from '@/components/ui/GlassCard';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', adoptions: 40 },
  { name: 'Feb', adoptions: 64 },
  { name: 'Mar', adoptions: 58 },
  { name: 'Apr', adoptions: 72 },
  { name: 'May', adoptions: 61 },
];

export default function AdoptionTrends() {
  return (
    <GlassCard className="h-[300px] flex flex-col">
      <h3 className="text-lg font-bold text-white mb-6">Adoption Trends</h3>
      {/* Container ensures recharts calculates dimensions correctly within flexbox [cite: 177, 401] */}
      <div className="flex-1 w-full min-h-[200px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
            <XAxis dataKey="name" stroke="#ffffff40" fontSize={12} axisLine={false} tickLine={false} />
            <YAxis stroke="#ffffff40" fontSize={12} axisLine={false} tickLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0F172A', border: '1px solid #ffffff20', borderRadius: '12px' }}
              itemStyle={{ color: '#4ECDC4' }}
            />
            <Line type="monotone" dataKey="adoptions" stroke="#4ECDC4" strokeWidth={3} dot={{ fill: '#4ECDC4', r: 4 }} activeDot={{ r: 6, fill: '#FF6B6B' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
}

