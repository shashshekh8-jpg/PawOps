"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar';
import TopNav from '@/components/layout/TopNav';
import NotificationSystem from '@/components/layout/NotificationSystem';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Check if the auth flag exists
    const hasAuth = localStorage.getItem('pawzz_auth');
    if (!hasAuth) {
      router.push('/login');
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  // Don't render the dashboard skeleton until we verify they should be here
  if (!isAuthorized) return <div className="min-h-screen bg-[#0F172A]" />;

  return (
    <div className="flex h-screen bg-background overflow-hidden animate-in fade-in duration-500">
      <Sidebar />
      <div className="flex-1 flex flex-col relative">
        <NotificationSystem />
        <TopNav />
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
