import React from 'react';

export default function FloatingActionButton({ onClick, label }: { onClick?: () => void, label: string }) {
  return (
    <button 
      onClick={onClick}
      className="fixed bottom-8 right-8 bg-coral hover:bg-[#ff5252] text-white font-bold py-4 px-8 rounded-full shadow-2xl shadow-coral/20 hover:scale-105 active:scale-95 transition-all z-40"
    >
      {label}
    </button>
  );
}

