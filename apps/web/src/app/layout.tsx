import AdsenseScript from 'components/analytics/adsense-script';
import PageViewTracker from 'components/analytics/page-view-tracker';
import Footer from 'components/layout/footer';
import Header from 'components/layout/header';
import ThemeScript from 'components/layout/theme-script';
import { siteMetaData } from 'config/site-config';
import type { Metadata, Viewport } from 'next';
import 'styles/globals.css';
import styles from './layout.module.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteMetaData.siteUrl),
  title: {
    default: siteMetaData.title,
    template: `%s | ${siteMetaData.title}`,
  },
  description: siteMetaData.description,
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: { type: 'website', siteName: siteMetaData.title },
  twitter: { card: 'summary', creator: '@s_yoshiki_dev' },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fbfbfd' },
    { media: '(prefers-color-scheme: dark)', color: '#0f1116' },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body>
        <AdsenseScript />
        <PageViewTracker />
        <a href="#main" className={styles.skip}>
          本文へスキップ
        </a>
        <div className={styles.shell}>
          <Header title={siteMetaData.title} />
          <main id="main" className={styles.main}>
            {children}
          </main>
          <Footer title={siteMetaData.title} />
        </div>
      </body>
    </html>
  );
}
