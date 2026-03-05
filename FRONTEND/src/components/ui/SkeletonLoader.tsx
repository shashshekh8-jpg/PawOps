import React from 'react';

export default function SkeletonLoader({ className }: { className?: string }) {
  return (
    <div className={`bg-white/5 animate-pulse rounded-xl ${className || 'h-4 w-full'}`}></div>
  );
}

