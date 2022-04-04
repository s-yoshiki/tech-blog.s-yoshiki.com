import '../styles/globals.css'
// import '../styles/markdown.css'
import '../styles/gtihub-markdown.css'
// import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app'
import GaTag from 'components/meta/gatag'
import * as gtag from 'lib/gtag'
import usePageView from 'hooks/usePageView'

const App = ({ Component, pageProps }: AppProps) => {
  usePageView()
  return (
    <>
      <GaTag gaId={gtag.GA_ID} />
      <Component {...pageProps} />
    </>
  )
}

export default App
