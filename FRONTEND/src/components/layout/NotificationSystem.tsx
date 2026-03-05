"use client";
import React, { useState, useEffect } from 'react';

export default function NotificationSystem() {
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    // Simulated operational alert [cite: 160]
    const timer = setTimeout(() => setNotification("Alert: New Rescue ID A1024 Logged"), 8000);
    return () => clearTimeout(timer);
  }, []);

  if (!notification) return null;

  return (
    <div className="fixed top-20 right-6 z-[100] bg-teal/20 backdrop-blur-md border border-teal/40 p-4 rounded-xl shadow-2xl animate-bounce">
      <p className="text-sm font-bold text-teal">{notification}</p>
    </div>
  );
}

