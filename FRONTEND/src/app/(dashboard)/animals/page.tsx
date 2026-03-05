"use client";
import React from 'react';
import AnimalDataTable from '@/components/features/animals/AnimalDataTable';

export default function AnimalsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-white">Animal Database</h1>
          <p className="text-sm text-gray-400">Manage operational records.</p>
        </div>
        <div className="flex space-x-2">
          <select className="bg-white/5 border border-white/10 text-xs text-gray-300 rounded-lg px-3 py-2 outline-none focus:border-teal cursor-pointer">
            <option>All Species</option>
            <option>Dogs</option>
            <option>Cats</option>
          </select>
          <select className="bg-white/5 border border-white/10 text-xs text-gray-300 rounded-lg px-3 py-2 outline-none focus:border-teal cursor-pointer">
            <option>Any Health</option>
            <option>Healthy</option>
            <option>Treatment</option>
          </select>
        </div>
      </div>
      <AnimalDataTable />
    </div>
  );
}

