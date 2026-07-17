'use client';

import { GOOGLE_ADSENSE_CLIENT } from 'config/google';
import { usePathname } from 'next/navigation';
import type { CSSProperties } from 'react';
import { useEffect } from 'react';

interface AdsenseProps {
  layout?: string;
  format?: string;
  slot?: string;
  style?: CSSProperties;
  fullWidthResponsive?: 'true' | 'false';
}

const Ads = (props: AdsenseProps) => {
  const pathname = usePathname();

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      if (process.env.NODE_ENV === 'development')
        console.error('AdSense initialization failed', error);
    }
  }, [pathname]);

  return (
    <div
      key={pathname}
      className="max-w-4xl mx-auto content-center bg-slate-200 h-full max-h-lg"
    >
      <ins
        className="adsbygoogle"
        style={props.style}
        data-ad-layout={props.layout}
        data-ad-format={props.format}
        data-ad-client={GOOGLE_ADSENSE_CLIENT}
        data-ad-slot={props.slot}
        data-full-width-responsive={props.fullWidthResponsive}
      />
    </div>
  );
};

export default Ads;
