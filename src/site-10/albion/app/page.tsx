'use client';

import { useEffect } from 'react';

/* Static export has no middleware — redirect client-side to /en. */
export default function RootPage() {
  useEffect(() => {
    window.location.replace('en/');
  }, []);
  return null;
}
