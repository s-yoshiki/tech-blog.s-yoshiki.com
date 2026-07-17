'use client';

import { useEffect } from 'react';
import { GOOGLE_ADSENSE_CLIENT } from 'config/google';

const SCRIPT_ID = 'google-adsense-script';

export default function AdsenseScript() {
  useEffect(() => {
    if (document.getElementById(SCRIPT_ID)) return;
    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${GOOGLE_ADSENSE_CLIENT}`;
    document.head.appendChild(script);
  }, []);
  return null;
}
