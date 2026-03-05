"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import api from '@/lib/api';
import GlassCard from '@/components/ui/GlassCard';
import StatusBadge from '@/components/ui/StatusBadge';
import MedicalTimeline from '@/components/features/animals/MedicalTimeline';
import AdoptionGauge from '@/components/features/animals/AdoptionGauge';
import SkeletonLoader from '@/components/ui/SkeletonLoader';

export default function AnimalProfilePage() {
  const params = useParams();
  const [animal, setAnimal] = useState<any>(null);
  const [probability, setProbability] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Concurrent execution initiates both HTTP requests simultaneously [cite: 2, 3]
        const [animalRes, mlRes] = await Promise.all([
          api.get(`/animals/${params.id}`),
          api.get(`/analytics/predict/${params.id}`)
        ]);
        setAnimal(animalRes);
        setProbability(mlRes.probability);
      } catch (err) {
        console.error("Profile load failed", err);
      }
    };
    if (params.id) fetchData();
  }, [params.id]);

  if (!animal) return <div className="space-y-6"><SkeletonLoader className="h-64 w-full" /></div>;

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold text-white">{animal.name}'s Profile</h1>
        <StatusBadge status={animal.adoption_status} type="adoption" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard className="lg:col-span-2 space-y-8">
          <div className="flex items-center space-x-6">
             <div className="w-32 h-32 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-4xl overflow-hidden">
                {animal.image_url ? <img src={animal.image_url} alt={animal.name} className="w-full h-full object-cover" /> : "🐾"}
             </div>
             <div className="space-y-1">
                <p className="text-sm text-gray-400">{animal.breed} ({animal.species})</p>
                <p className="text-sm text-gray-400">Rescued from: <span className="text-white">{animal.rescue_location}</span></p>
             </div>
          </div>
          
          <div className="pt-6 border-t border-white/5">
            <h3 className="text-lg font-bold mb-6 text-teal">Recovery Journey</h3>
            <MedicalTimeline currentStep={animal.health_status === 'Healthy' ? 3 : 1} />
          </div>
        </GlassCard>

        <div className="lg:col-span-1 space-y-6">
          <AdoptionGauge probability={probability || 0} />
          <GlassCard>
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Internal Notes</h3>
            <p className="text-sm text-gray-300 italic">"Highly social interaction observed. Recommended for family placement."</p>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

