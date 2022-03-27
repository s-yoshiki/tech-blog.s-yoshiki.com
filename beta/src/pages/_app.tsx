import '../styles/globals.css'
// import '../styles/markdown.css'
import '../styles/gtihub-markdown.css'
// import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app'
import usePageView from 'hooks/usePageView'

function MyApp({ Component, pageProps }: AppProps) {
  usePageView()
  return <Component {...pageProps} />
}

export default MyApp
