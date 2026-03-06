"use client";
import React, { useState, useEffect } from 'react';
import api from '@/lib/api';

export default function NotificationSystem() {
  const [notification, setNotification] = useState<string | null>(null);
  const [lastSeenId, setLastSeenId] = useState<number | null>(null);

  useEffect(() => {
    const checkNewRescues = async () => {
      try {
        const res = await api.get('/rescues/list');
        if (res && res.length > 0) {
          const latestRescue = res[0].rescue_id;
          if (lastSeenId !== null && latestRescue > lastSeenId) {
            setNotification(`Alert: New Rescue ID #${latestRescue} Logged in ${res[0].rescue_location}`);
            setTimeout(() => setNotification(null), 8000); // Hide after 8s
          }
          setLastSeenId(latestRescue);
        }
      } catch (err) { 
        console.error(err); 
      }
    };

    // Poll every 15 seconds
    const interval = setInterval(checkNewRescues, 15000);
    checkNewRescues(); // Initial check

    return () => clearInterval(interval);
  }, [lastSeenId]);

  if (!notification) return null;

  return (
    <div className="fixed top-20 right-6 z-[100] bg-teal/20 backdrop-blur-md border border-teal/40 p-4 rounded-xl shadow-2xl animate-bounce">
      <p className="text-sm font-bold text-teal">{notification}</p>
    </div>
  );
}
