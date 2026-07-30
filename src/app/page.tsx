import HomePage from 'components/features/home/home-page';
import { siteMetaData } from 'config/site-config';
import { getHomePageData } from 'lib/posts/queries';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
};

const websiteStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteMetaData.title,
  url: `${siteMetaData.siteUrl}/`,
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteStructuredData).replace(
            /</g,
            '\\u003c',
          ),
        }}
      />
      <HomePage {...getHomePageData()} />
    </>
  );
}
