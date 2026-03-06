"use client";
import React, { useState, useEffect } from 'react';
import RescueEntryModal from '@/components/features/rescues/RescueEntryModal';
import FloatingActionButton from '@/components/ui/FloatingActionButton';
import GlassCard from '@/components/ui/GlassCard';
import SkeletonLoader from '@/components/ui/SkeletonLoader';
import api from '@/lib/api';

export default function RescuesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rescues, setRescues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRescues = async () => {
      try {
        const data = await api.get('/rescues/list');
        setRescues(data);
      } catch (err) { 
        console.error(err); 
      } finally { 
        setLoading(false); 
      }
    };
    fetchRescues();
  }, []);

  return (
    <div className="space-y-6 relative min-h-[80vh]">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Rescue Operations</h1>
      </div>

      {loading ? (
        <SkeletonLoader className="h-64" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rescues.map((rescue) => (
            <GlassCard key={rescue.rescue_id} className="flex flex-col space-y-4">
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-xl">🚑</div>
                <span className="text-[10px] text-gray-500 font-mono">ID: #RSC-{rescue.rescue_id}</span>
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">{rescue.rescue_location}</h3>
                <p className="text-xs text-gray-400 mt-1">{rescue.species} • {rescue.breed || 'Unknown'} • {rescue.health_status}</p>
              </div>
              <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                <span className="text-[10px] font-bold text-teal uppercase tracking-widest">Logged</span>
                <span className="text-[10px] font-bold text-gray-500">{new Date(rescue.created_at).toLocaleDateString()}</span>
              </div>
            </GlassCard>
          ))}
        </div>
      )}

      {isModalOpen && <RescueEntryModal onClose={() => {
        setIsModalOpen(false);
        window.location.reload(); // Refresh to show the new rescue
      }} />}
      
      <FloatingActionButton label="Log New Rescue" onClick={() => setIsModalOpen(true)} />
    </div>
  );
}
