"use client";
import React from 'react';
import GlassCard from '@/components/ui/GlassCard';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: 'Indie Puppy', days: 12 },
  { name: 'Labrador', days: 18 },
  { name: 'Indie Adult', days: 34 },
  { name: 'Cat (Any)', days: 22 },
];

export default function BreedAnalytics() {
  return (
    <GlassCard>
      <h3 className="text-lg font-bold text-white mb-6">Adoption Speed (Days)</h3>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical">
            <XAxis type="number" hide />
            <YAxis dataKey="name" type="category" stroke="#9CA3AF" fontSize={10} axisLine={false} tickLine={false} />
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

