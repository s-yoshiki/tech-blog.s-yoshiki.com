import RelationAds from 'components/ads/relations-ads';
import HeaderMeta from 'components/meta/header-meta';
import Og from 'components/meta/og';
import TwitterCard from 'components/meta/og-twitter-card';
import getConfig from 'next/config';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import Footer from './footer';
import Header from './header';

const { siteMetaData, basePath } = getConfig().publicRuntimeConfig;

interface Props {
  title?: string;
  children: ReactNode;
  image?: string;
  description?: string;
  disableAdsense?: boolean;
}

const Index = (props: Props) => {
  const title = props?.title
    ? `${props.title} | ${siteMetaData.title}`
    : siteMetaData?.title;
  const router = useRouter();
  const baseUrl = `${siteMetaData.siteUrl}`;
  return (
    <>
      <HeaderMeta
        title={title}
      >
        <Og
          title={title}
          type={`article`}
          description={props.description || title}
          image={`${baseUrl}${props.image}`}
          url={`${baseUrl}${router.asPath}`}
        />
        <TwitterCard
          card='summary'
          title={title}
          site={`@s_yoshiki_dev`}
          description={props.description || title}
          image={`${baseUrl}${props.image}`}
        />
      </HeaderMeta>
      <article>
        <header>
          <Header title={siteMetaData?.title} />
        </header>
        <div className='pt-6'></div>
        <main className=''>
          <div className='container mx-auto'>
            {props.children}
            {!props.disableAdsense && <RelationAds /> }
          </div>
        </main>
        <footer>
          <Footer title='404 motivation not found' />
        </footer>
      </article>
    </>
  );
};

export default Index;
