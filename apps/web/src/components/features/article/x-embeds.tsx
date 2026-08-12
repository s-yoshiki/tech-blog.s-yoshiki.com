'use client';

import { useEffect } from 'react';

interface Props {
  containerId: string;
}

interface XWidgets {
  widgets: {
    load: (element?: HTMLElement) => unknown;
  };
}

declare global {
  interface Window {
    twttr?: XWidgets;
  }
}

const SCRIPT_ID = 'x-widgets-script';
const SCRIPT_URL = 'https://platform.twitter.com/widgets.js';

export default function XEmbeds({ containerId }: Props) {
  useEffect(() => {
    const container = document.getElementById(containerId);
    if (!container?.querySelector('blockquote.twitter-tweet')) return;

    container
      .querySelectorAll<HTMLScriptElement>(
        'script[src*="platform.twitter.com/widgets.js"]',
      )
      .forEach((script) => {
        script.remove();
      });

    const renderEmbeds = () => {
      void window.twttr?.widgets.load(container);
    };

    const existing = document.getElementById(
      SCRIPT_ID,
    ) as HTMLScriptElement | null;

    if (window.twttr?.widgets) {
      renderEmbeds();
      return;
    }

    const script = existing ?? document.createElement('script');
    if (!existing) {
      script.id = SCRIPT_ID;
      script.async = true;
      script.src = SCRIPT_URL;
      document.body.appendChild(script);
    }

    script.addEventListener('load', renderEmbeds);
    return () => script.removeEventListener('load', renderEmbeds);
  }, [containerId]);

  return null;
}
