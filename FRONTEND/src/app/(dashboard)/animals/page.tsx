"use client";
import React, { useState } from 'react';
import AnimalDataTable from '@/components/features/animals/AnimalDataTable';

export default function AnimalsPage() {
  const [speciesFilter, setSpeciesFilter] = useState('All Species');
  const [healthFilter, setHealthFilter] = useState('Any Health');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-white">Animal Database</h1>
          <p className="text-sm text-gray-400">Manage operational records.</p>
        </div>
        <div className="flex space-x-2">
          <select 
            value={speciesFilter}
            onChange={(e) => setSpeciesFilter(e.target.value)}
            className="bg-white/5 border border-white/10 text-xs text-gray-300 rounded-lg px-3 py-2 outline-none focus:border-teal cursor-pointer"
          >
            <option>All Species</option>
            <option>Dogs</option>
            <option>Cats</option>
          </select>
          <select 
            value={healthFilter}
            onChange={(e) => setHealthFilter(e.target.value)}
            className="bg-white/5 border border-white/10 text-xs text-gray-300 rounded-lg px-3 py-2 outline-none focus:border-teal cursor-pointer"
          >
            <option>Any Health</option>
            <option>Healthy</option>
            <option>Treatment</option>
            <option>Critical</option>
          </select>
        </div>
      </div>
      {/* Pass the live filters down to the table component */}
      <AnimalDataTable speciesFilter={speciesFilter} healthFilter={healthFilter} />
    </div>
  );
}
