'use client';

import { useQuery } from '@tanstack/react-query';

export function useCurrencies() {
  return useQuery({
    queryKey: ['currencies'],
    queryFn: async () => {
      const res = await fetch('/api/currencies');
      if (!res.ok) throw new Error('Failed to fetch currencies');
      return res.json();
    },
  });
}