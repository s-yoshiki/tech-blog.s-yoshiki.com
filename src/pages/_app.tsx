import '../styles/globals.css';
// import '../styles/markdown.css'
import '../styles/gtihub-markdown.css';
// import 'tailwindcss/tailwind.css'
import GaTag from 'components/meta/gatag';
import usePageView from 'hooks/usePageView';
import * as gtag from 'lib/gtag';
import type { AppProps } from 'next/app';

const App = ({ Component, pageProps }: AppProps) => {
  usePageView();
  return (
    <>
      <GaTag gaId={gtag.GA_ID} />
      <Component {...pageProps} />
    </>
  );
};

export default App;
