interface Window {
  adsbygoogle?: { [key: string]: unknown }[];
  dataLayer?: unknown[];
  gtag(
    command: 'config' | 'event' | 'set' | 'js',
    target: string | Date,
    parameters?: Record<string, unknown>,
  ): void;
}
