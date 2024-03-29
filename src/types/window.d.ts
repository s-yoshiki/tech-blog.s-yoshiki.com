interface Window {
  adsbygoogle?: { [key: string]: unknown }[];
  // pageviewのため
  gtag(type: 'config', googleAnalyticsId: string, { page_path: string });
  // eventのため
  gtag(
    type: 'event',
    eventAction: string,
    fieldObject: {
      event_label: string;
      event_category: string;
      value?: string;
    },
  );
}
