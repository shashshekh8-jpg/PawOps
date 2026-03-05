"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [creds, setCreds] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Mandated by technical audit [cite: 332]
        body: JSON.stringify(creds),
      });
      if (res.ok) {
        router.push('/');
      }
    } catch (err) {
      console.error("Login Error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-4">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl w-full max-w-sm shadow-2xl">
        <h1 className="text-2xl font-bold text-center mb-6 text-white uppercase tracking-tighter">pawops OPS</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="email" placeholder="Email" required onChange={e => setCreds({...creds, email: e.target.value})} className="w-full p-3 bg-black/20 border border-white/10 rounded-lg text-white focus:border-teal outline-none" />
          <input type="password" placeholder="Password" required onChange={e => setCreds({...creds, password: e.target.value})} className="w-full p-3 bg-black/20 border border-white/10 rounded-lg text-white focus:border-teal outline-none" />
          <button type="submit" disabled={loading} className="w-full bg-coral py-3 rounded-lg font-bold text-white hover:opacity-90 transition disabled:opacity-50">
            {loading ? "Syncing..." : "Access Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}

