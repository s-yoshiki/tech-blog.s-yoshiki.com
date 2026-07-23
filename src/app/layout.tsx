import AdsenseScript from 'components/analytics/adsense-script';
import PageViewTracker from 'components/analytics/page-view-tracker';
import Footer from 'components/layout/footer';
import Header from 'components/layout/header';
import ThemeScript from 'components/layout/theme-script';
import { siteMetaData } from 'config/site-config';
import type { Metadata, Viewport } from 'next';
import 'styles/globals.css';
import 'styles/gtihub-markdown.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteMetaData.siteUrl),
  title: {
    default: siteMetaData.title,
    template: `%s | ${siteMetaData.title}`,
  },
  description: siteMetaData.description,
  icons: { icon: '/favicon-32x32.png', apple: '/favicon-32x32.png' },
  openGraph: { type: 'website', siteName: siteMetaData.title },
  twitter: { card: 'summary', creator: '@s_yoshiki_dev' },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fbfbfd' },
    { media: '(prefers-color-scheme: dark)', color: '#0f1116' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body>
        <AdsenseScript />
        <PageViewTracker />
        <a
          href="#main"
          className="-translate-x-1/2 sr-only left-1/2 z-100 rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground text-sm focus:not-sr-only focus:fixed focus:top-3"
        >
          本文へスキップ
        </a>
        <div className="flex min-h-screen flex-col">
          <Header title={siteMetaData.title} />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer title={siteMetaData.title} />
        </div>
      </body>
    </html>
  );
}
