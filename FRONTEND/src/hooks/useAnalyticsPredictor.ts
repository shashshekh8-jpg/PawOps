import { useState, useEffect } from 'react';
import api from '@/lib/api';

export function useAnalyticsPredictor(animalId: string) {
  const [probability, setProbability] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!animalId) return;
    const getPrediction = async () => {
      try {
        const res = await api.get(`/analytics/predict/${animalId}`);
        setProbability(res.probability);
      } catch (err) {
        setProbability(0);
      } finally {
        setLoading(false);
      }
    };
    getPrediction();
  }, [animalId]);

  return { probability, loading };
}

