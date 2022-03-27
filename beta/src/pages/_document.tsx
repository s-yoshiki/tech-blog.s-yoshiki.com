import Document, { Html, Head, Main, NextScript } from 'next/document'
import GaTag from 'components/meta/gatag'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="ja">
        <Head>
          <script data-ad-client="ca-pub-5931776908676811" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
          <GaTag gaId='G-PJBP94L671' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument