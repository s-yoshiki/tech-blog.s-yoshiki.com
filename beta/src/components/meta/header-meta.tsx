import Head from 'next/head'
import { ReactNode } from 'react';

interface HeaderMetaProps {
  title: string;
  image?: string;
  children: ReactNode
}

const Header = (props: HeaderMetaProps) => {
  return (
    <>
      <Head>
        <title>{props.title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        { props.children }
      </Head>
    </>
  )
}

export default Header