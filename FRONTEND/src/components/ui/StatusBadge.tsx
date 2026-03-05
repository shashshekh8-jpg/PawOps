import React from 'react';

export default function StatusBadge({ status, type }: { status: string, type: 'health' | 'adoption' | 'role' }) {
  const styles: Record<string, string> = {
    "Healthy": "bg-teal/20 text-teal border-teal/30",
    "Treatment": "bg-coral/20 text-coral border-coral/30",
    "Available": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    "Adopted": "bg-blue-500/20 text-blue-400 border-blue-500/30",
    "admin": "bg-purple-500/20 text-purple-400 border-purple-500/30",
    "volunteer": "bg-accent/20 text-accent border-accent/30",
  };

  return (
    <span className={`px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest border rounded-full ${styles[status] || 'bg-white/10 text-gray-400'}`}>
      {status}
    </span>
  );
}

