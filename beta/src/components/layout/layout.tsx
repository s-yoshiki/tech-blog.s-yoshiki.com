import { NextPage } from 'next';
import { Router, useRouter } from "next/router";
import Header from './header';
import Footer from './footer';
import { ReactNode } from 'react';
import getConfig from "next/config";
import HeaderMeta from 'components/meta/header-meta'
import TwitterCard from 'components/meta/og-twitter-card'
import ImportAds from 'components/ads/import-ads'
import Og from 'components/meta/og'
import RelationAds from 'components/ads/relations-ads'
import FullWidthAds from 'components/ads/fullwidth-ads'

const { siteMetaData } = getConfig().publicRuntimeConfig;

interface Props {
  title?: string;
  children: ReactNode;
  image?: string;
  description?: string;
  // path: string;
}

const Index = (props: Props) => {
  const title = props?.title ? `${props.title} | ${siteMetaData.title}` : siteMetaData?.title
  const router = useRouter()
  return (
    <>
      <HeaderMeta
        title={title}
      >
        <TwitterCard
          card='summary'
          title={title}
          site={`@s-yoshiki`}
          description={props.description || ''}
          image={props?.image || ''}
        />
        <Og
          title={title}
          type={`article`}
          description={props.description || ''}
          image={props.image}
          url={router.asPath}
        />
        <ImportAds />
      </HeaderMeta>
      <article  >
        <header>
          <Header title={siteMetaData?.title} />
        </header>
        <div className="pt-6"></div>
        {JSON.stringify(siteMetaData)}
        <main className="">
          { props.children }
          <RelationAds />
        </main>
        <FullWidthAds />
        <footer>
          <Footer title="404 motivation not found" />
        </footer>
      </article>
    </>
  )
}

export default Index