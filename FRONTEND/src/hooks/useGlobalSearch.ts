import { useState, useEffect } from 'react';
import api from '@/lib/api';

export function useGlobalSearch(query: string) {
  const [results, setResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setIsSearching(true);
      try {
        const data = await api.get(`/search?q=${encodeURIComponent(query)}`);
        setResults(data.results || []);
      } catch (err) {
        console.error('Search error', err);
        setResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return { results, isSearching };
}

