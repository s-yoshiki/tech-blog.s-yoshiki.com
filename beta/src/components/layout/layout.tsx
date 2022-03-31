import { useRouter } from "next/router";
import Header from './header';
import Footer from './footer';
import { ReactNode } from 'react';
import getConfig from "next/config";
import HeaderMeta from 'components/meta/header-meta'
import TwitterCard from 'components/meta/og-twitter-card'
import Og from 'components/meta/og'
import RelationAds from 'components/ads/relations-ads'
import FullWidthAds from 'components/ads/fullwidth-ads'
import GaTag from 'components/meta/gatag'

const { siteMetaData, basePath } = getConfig().publicRuntimeConfig;

interface Props {
  title?: string;
  children: ReactNode;
  image?: string;
  description?: string;
}

const Index = (props: Props) => {
  const title = props?.title ? `${props.title} | ${siteMetaData.title}` : siteMetaData?.title
  const router = useRouter()
  const baseUrl = `${siteMetaData.siteUrl}`
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
        <div className="pt-6"></div>
        <main className="">
          {props.children}
          <RelationAds />
        </main>
        <footer>
          <Footer title="404 motivation not found" />
        </footer>
      </article>
    </>
  )
}

export default Index