"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Dog, Ambulance, Users, BarChart2, DollarSign, LayoutGrid } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', path: '/', icon: Home },
  { name: 'Animals', path: '/animals', icon: Dog },
  { name: 'Rescues', path: '/rescues', icon: Ambulance },
  { name: 'Volunteers', path: '/volunteers', icon: Users },
  { name: 'Campaigns', path: '/campaigns', icon: BarChart2 },
  { name: 'Donations', path: '/donations', icon: DollarSign },
  { name: 'Intelligence', path: '/analytics', icon: LayoutGrid },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-64 border-r border-white/10 flex flex-col hidden lg:flex">
      <div className="p-8"><span className="text-xl font-black text-coral">pawops</span></div>
      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link key={item.path} href={item.path} className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-white/10 text-white border-l-4 border-coral' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
              <item.icon size={20} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

