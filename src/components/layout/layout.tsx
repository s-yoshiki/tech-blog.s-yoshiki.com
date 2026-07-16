import HeaderMeta from 'components/meta/header-meta';
import Og from 'components/meta/og';
import TwitterCard from 'components/meta/og-twitter-card';
import { siteMetaData } from 'config/site-config';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import Footer from './footer';
import Header from './header';

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
      <HeaderMeta title={title}>
        <Og
          title={title}
          type={`article`}
          description={props.description || title}
          image={`${baseUrl}${props.image}`}
          url={`${baseUrl}${router.asPath}`}
        />
        <TwitterCard
          card="summary"
          title={title}
          site={`@s_yoshiki_dev`}
          description={props.description || title}
          image={`${baseUrl}${props.image}`}
        />
      </HeaderMeta>
      <div className="flex min-h-screen flex-col">
        <Header title={siteMetaData?.title} />
        <main className="flex-grow">{props.children}</main>
        <Footer title="404 motivation not found" />
      </div>
    </>
  );
};

export default Index;
