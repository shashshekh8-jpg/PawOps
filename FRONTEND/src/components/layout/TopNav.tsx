"use client";
import React, { useState } from 'react';
import { Search, Bell, Calendar, Menu, Loader2 } from 'lucide-react';
import { useGlobalSearch } from '@/hooks/useGlobalSearch';
import { useRouter } from 'next/navigation';

export default function TopNav() {
  const [query, setQuery] = useState('');
  const { results, isSearching } = useGlobalSearch(query);
  const router = useRouter();

  const handleSelect = (id: number, type: string) => {
    setQuery('');
    if (type === 'Animal') router.push(`/animals/${id}`);
    if (type === 'Volunteer') router.push(`/volunteers`);
  };

  return (
    <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-background/50 backdrop-blur-md sticky top-0 z-50">
      <div className="flex md:hidden"><Menu className="text-white" /></div>
      
      <div className="hidden md:flex relative w-96">
        <div className="flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-1.5 w-full focus-within:border-teal transition-colors">
          {isSearching ? <Loader2 size={16} className="text-teal mr-2 animate-spin" /> : <Search size={16} className="text-gray-400 mr-2" />}
          <input 
            type="text" 
            placeholder="Locate animals, volunteers..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-transparent text-sm text-white outline-none w-full" 
          />
        </div>
        
        {/* Debounced Search Results [cite: 270] */}
        {results.length > 0 && (
          <div className="absolute top-full mt-2 w-full bg-[#0F172A] border border-white/10 rounded-xl shadow-2xl overflow-hidden py-2 z-[60]">
            {results.map((res: any, idx: number) => (
              <div key={idx} onClick={() => handleSelect(res.id, res.type)} className="px-4 py-2 hover:bg-white/5 cursor-pointer flex justify-between items-center transition-colors">
                <div>
                  <p className="text-sm font-bold text-white">{res.name}</p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest">{res.subtext}</p>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full border ${res.type === 'Animal' ? 'bg-coral/20 text-coral border-coral/30' : 'bg-teal/20 text-teal border-teal/30'}`}>
                  {res.type}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center space-x-4">
        <Bell size={20} className="text-gray-400 cursor-pointer hover:text-white transition" />
        <Calendar size={20} className="text-gray-400 cursor-pointer hover:text-white transition" />
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-coral to-accent border border-white/10 shadow-lg"></div>
      </div>
    </header>
  );
}

