"use client";
import React from 'react';
import Link from 'next/link';
import StatusBadge from '@/components/ui/StatusBadge';
import { useAnimals } from '@/hooks/useAnimals';
import SkeletonLoader from '@/components/ui/SkeletonLoader';

export default function AnimalDataTable({ speciesFilter, healthFilter }: { speciesFilter?: string, healthFilter?: string }) {
  const { animals, loading } = useAnimals();

  if (loading) return <SkeletonLoader className="h-96 w-full" />;

  // Dynamically filter the database results based on the dropdowns
  const filteredAnimals = animals.filter((animal: any) => {
    if (speciesFilter && speciesFilter !== 'All Species') {
      const targetSpecies = speciesFilter === 'Dogs' ? 'Dog' : 'Cat';
      if (animal.species !== targetSpecies) return false;
    }
    if (healthFilter && healthFilter !== 'Any Health' && animal.health_status !== healthFilter) {
      return false;
    }
    return true;
  });

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-white/5 border-b border-white/10 text-gray-400 text-[10px] uppercase tracking-widest">
            <th className="p-4 font-bold">Identifier</th>
            <th className="p-4 font-bold">Name</th>
            <th className="p-4 font-bold">Species/Breed</th>
            <th className="p-4 font-bold">Health</th>
            <th className="p-4 font-bold">Status</th>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {filteredAnimals.length === 0 && (
            <tr><td colSpan={6} className="p-8 text-center text-gray-500">No records found matching filters.</td></tr>
          )}
          {filteredAnimals.map((animal: any) => (
            <tr key={animal.animal_id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
              <td className="p-4 text-gray-500 font-mono text-xs">#{animal.animal_id}</td>
              <td className="p-4 font-bold text-white">{animal.name}</td>
              <td className="p-4 text-gray-400">{animal.species} • {animal.breed}</td>
              <td className="p-4"><StatusBadge status={animal.health_status} type="health" /></td>
              <td className="p-4"><StatusBadge status={animal.adoption_status} type="adoption" /></td>
              <td className="p-4 text-right">
                <Link href={`/animals/${animal.animal_id}`} className="text-teal font-bold opacity-0 group-hover:opacity-100 transition-opacity hover:underline">
                  View Intelligence
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
