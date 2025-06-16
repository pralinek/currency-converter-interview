'use client';

import { ReactNode } from 'react';
import ReactQueryProvider from './ReactQueryProvider';

export function Providers({ children }: { children: ReactNode }) {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
}