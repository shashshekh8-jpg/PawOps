import React from 'react';
import { cn } from '@/lib/utils';

export default function GlassCard({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={cn(
      "bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-xl", // [cite: 150]
      "hover:border-white/20 transition-all duration-300", // [cite: 151]
      className
    )}>
      {children}
    </div>
  );
}

