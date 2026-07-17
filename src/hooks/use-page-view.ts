'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { initializeGoogleAnalytics, pageview } from 'lib/gtag';

export const usePageView = () => {
  const pathname = usePathname();
  useEffect(() => {
    initializeGoogleAnalytics();
    const path = pathname ?? '/';
    pageview(`${path}${window.location.search}`);
  }, [pathname]);
};
