"use client";
import React, { useState } from 'react';

export default function MapPicker() {
  const [coords, setCoords] = useState({ x: 50, y: 50 });

  return (
    <div 
      className="h-32 bg-white/5 border border-white/10 rounded-xl relative cursor-crosshair group overflow-hidden"
      onClick={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setCoords({ 
          x: ((e.clientX - rect.left) / rect.width) * 100, 
          y: ((e.clientY - rect.top) / rect.height) * 100 
        });
      }}
    >
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '15px 15px' }}></div>
      <div 
        className="absolute w-4 h-4 text-xl -translate-x-1/2 -translate-y-full transition-all duration-300 ease-out"
        style={{ left: `${coords.x}%`, top: `${coords.y}%` }}
      >
        📍
      </div>
      <p className="absolute bottom-2 right-2 text-[8px] text-gray-500 uppercase tracking-widest">Click to set coordinates</p>
    </div>
  );
}

