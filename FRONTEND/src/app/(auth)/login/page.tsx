"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [creds, setCreds] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(creds),
      });

      if (res.ok) {
        // Drop the local storage flag to unlock the dashboard layout
        localStorage.setItem('pawzz_auth', 'true');
        router.push('/');
      } else {
        const errorData = await res.json().catch(() => ({}));
        setErrorMsg(errorData.error || 'Invalid credentials');
      }
    } catch (err) {
      console.error("Login Error", err);
      setErrorMsg('Connection failed. Is the API running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-4">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl w-full max-w-sm shadow-2xl">
        <h1 className="text-2xl font-bold text-center mb-6 text-white uppercase tracking-tighter">pawops OPS</h1>
        
        {/* Added error messaging UI */}
        {errorMsg && (
          <p className="text-coral text-sm font-bold text-center mb-4 animate-pulse">
            {errorMsg}
          </p>
        )}

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
