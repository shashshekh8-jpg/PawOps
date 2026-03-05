import { useState } from 'react';
import api from '@/lib/api';

export function useRescueOperations() {
  const [loading, setLoading] = useState(false);

  const logNewRescue = async (payload: any) => {
    setLoading(true);
    try {
      // Coordinates with backend to handle biological and operational data [cite: 2, 3]
      const res = await api.post('/rescues', payload);
      return res;
    } finally {
      setLoading(false);
    }
  };

  return { logNewRescue, loading };
}

