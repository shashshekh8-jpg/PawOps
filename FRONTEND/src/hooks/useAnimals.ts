import { useState, useEffect } from 'react';
import api from '@/lib/api';

export function useAnimals() {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await api.get('/animals');
        setAnimals(data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return { animals, loading };
}

