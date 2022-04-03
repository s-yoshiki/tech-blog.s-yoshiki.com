import Head from 'next/head'
import { ReactNode } from 'react';

interface HeaderMetaProps {
  title: string;
  image?: string;
  children: ReactNode
}

const Header = (props: HeaderMetaProps) => {
  const favicon = `/favicon-32x32.png`
  return (
    <Head>
      <title>{props.title}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="apple-touch-icon" sizes="180x180" href={favicon} />
      <link rel="icon" type="image/png" sizes="32x32" href={favicon} />
      <link rel="shortcut icon" href={favicon} />
      { props.children }
    </Head>
  )
}

export default Header