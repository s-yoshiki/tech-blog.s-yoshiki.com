import type { Metadata } from 'next';
import Footer from 'components/layout/footer';
import Header from 'components/layout/header';
import PageViewTracker from 'components/analytics/page-view-tracker';
import AdsenseScript from 'components/analytics/adsense-script';
import { siteMetaData } from 'config/site-config';
import 'styles/globals.css';
import 'styles/gtihub-markdown.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteMetaData.siteUrl),
  title: { default: siteMetaData.title, template: `%s | ${siteMetaData.title}` },
  description: siteMetaData.description,
  icons: { icon: '/favicon-32x32.png', apple: '/favicon-32x32.png' },
  openGraph: { type: 'website', siteName: siteMetaData.title },
  twitter: { card: 'summary', creator: '@s_yoshiki_dev' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" data-scroll-behavior="smooth">
      <head>
      </head>
      <body>
        <AdsenseScript />
        <PageViewTracker />
        <div className="flex min-h-screen flex-col">
          <Header title={siteMetaData.title} />
          <main className="flex-1">{children}</main>
          <Footer title={siteMetaData.title} />
        </div>
      </body>
    </html>
  );
}
