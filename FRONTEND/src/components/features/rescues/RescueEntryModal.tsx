"use client";
import React, { useState } from 'react';
import api from '@/lib/api';
import MapPicker from './MapPicker';

export default function RescueEntryModal({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({ species: '', breed: '', health: '', location: '' });
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'processing' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('processing');

    let imageUrl = '';
    if (file) {
      const cloudForm = new FormData();
      cloudForm.append('file', file);
      // Fulfills Cloudinary unsigned upload requirement
      cloudForm.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_PRESET || 'pawops_preset');
      
      const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: cloudForm
      });
      const data = await res.json();
      imageUrl = data.secure_url;
    }

    try {
      // Sends full payload to trigger the ACID transaction on the backend
      await api.post('/rescues', { 
        species: formData.species,
        breed: formData.breed,
        health: formData.health,
        location: formData.location, 
        image_url: imageUrl 
      });
      setStatus('success');
      setTimeout(onClose, 2000);
    } catch (err) {
      setStatus('idle');
    }
  };

  if (status === 'success') {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60] flex items-center justify-center">
        <div className="bg-background border border-teal p-10 rounded-3xl text-center animate-pulse shadow-[0_0_50px_rgba(78,205,196,0.2)]">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-xl font-bold text-teal uppercase tracking-widest">Rescue Recorded</h2>
          <p className="text-gray-400 text-sm mt-2">Data synced with Command Center</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#111827] border border-white/10 p-8 rounded-3xl w-full max-w-lg shadow-2xl overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-bold text-white mb-6">Log Field Rescue</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Species" required onChange={e => setFormData({...formData, species: e.target.value})} className="bg-white/5 border border-white/10 p-3 rounded-xl text-sm text-white focus:border-coral outline-none" />
            <input type="text" placeholder="Breed" onChange={e => setFormData({...formData, breed: e.target.value})} className="bg-white/5 border border-white/10 p-3 rounded-xl text-sm text-white focus:border-coral outline-none" />
          </div>
          <input type="text" placeholder="Health Condition" required onChange={e => setFormData({...formData, health: e.target.value})} className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-sm text-white focus:border-coral outline-none" />
          
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Pin Rescue Location</label>
            <MapPicker />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Rescue Photo</label>
            <input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} className="w-full text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-coral file:text-white hover:file:bg-[#ff5252]" />
          </div>

          <div className="flex space-x-3 pt-4">
            <button type="button" onClick={onClose} className="flex-1 py-3 text-sm font-bold text-gray-400 hover:text-white transition">Cancel</button>
            <button type="submit" disabled={status === 'processing'} className="flex-2 bg-coral py-3 px-8 rounded-xl font-bold text-white hover:opacity-90 disabled:opacity-50 transition">
              {status === 'processing' ? 'Syncing...' : 'Log Rescue'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

