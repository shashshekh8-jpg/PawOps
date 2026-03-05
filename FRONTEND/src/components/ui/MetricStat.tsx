"use client";
import React, { useState, useEffect } from 'react';
import GlassCard from './GlassCard';

export default function MetricStat({ label, value, color, trend }: { label: string, value: string | number, color: string, trend: string }) {
  const [displayValue, setDisplayValue] = useState<number>(0);
  const [prefix, setPrefix] = useState('');
  const [suffix, setSuffix] = useState('');

  useEffect(() => {
    let target = 0;

    if (typeof value === 'number') {
      target = value;
    } else if (typeof value === 'string') {
      // Regex isolates leading/trailing non-numeric chars for safe counting [cite: 169]
      const match = value.match(/^([^0-9]*)([0-9.]+)([^0-9]*)$/);
      if (match) {
        setPrefix(match[1]);
        target = parseFloat(match[2]);
        setSuffix(match[3]);
      }
    }

    if (target > 0) {
      let start = 0;
      const duration = 1000;
      const steps = 20;
      const increment = target / steps;
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setDisplayValue(target);
          clearInterval(timer);
        } else {
          setDisplayValue(start);
        }
      }, duration / steps); // [cite: 166]
    }
  }, [value]);

  const formattedValue = displayValue % 1 !== 0 ? displayValue.toFixed(1) : Math.round(displayValue);

  return (
    <GlassCard className="group cursor-default hover:-translate-y-1">
      <div className="flex justify-between items-start">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</p>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-teal">{trend}</span>
      </div>
      <h3 className="text-3xl font-bold mt-2 transition-colors duration-300 group-hover:text-white" style={{ color }}>
        {prefix}{formattedValue}{suffix}
      </h3>
      <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
        <div className="h-full bg-current opacity-30 animate-pulse" style={{ width: '60%', backgroundColor: color }}></div>
      </div>
    </GlassCard>
  );
}

