import { GOOGLE_ANALYTICS_ID } from 'config/google';

const SCRIPT_ID = 'google-analytics-script';

export const initializeGoogleAnalytics = () => {
  if (typeof window === 'undefined') return;
  window.dataLayer ??= [];
  if (!window.gtag) {
    window.gtag = ((...args: unknown[]) => window.dataLayer?.push(args)) as Window['gtag'];
    window.gtag('js', new Date());
    window.gtag('config', GOOGLE_ANALYTICS_ID, { send_page_view: false });
  }
  if (!document.getElementById(SCRIPT_ID)) {
    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`;
    document.head.appendChild(script);
  }
};

// PVを測定する
export const pageview = (path: string) => {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', 'page_view', {
    send_to: GOOGLE_ANALYTICS_ID,
    page_title: document.title,
    page_location: new URL(path, window.location.origin).href,
  });
};

// GAイベントを発火させる
export const event = ({ action, category, label, value = '' }: any) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: JSON.stringify(label),
    value,
  });
};
