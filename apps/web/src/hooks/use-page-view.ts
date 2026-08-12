'use client';

import { initializeGoogleAnalytics, pageview } from 'lib/gtag';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export const usePageView = () => {
  const pathname = usePathname();
  useEffect(() => {
    initializeGoogleAnalytics();
    const path = pathname ?? '/';
    pageview(`${path}${window.location.search}`);
  }, [pathname]);
};
