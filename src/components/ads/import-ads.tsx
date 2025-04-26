import Script from 'next/script';

const ImportAds = () => {
  return (
    <>
      <Script
        id="Adsense-id"
        data-ad-client="ca-pub-5931776908676811"
        async
        strategy="afterInteractive"
        onError={(e) => {
          console.error('Script failed to load', e);
        }}
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      />
    </>
  );
};

export default ImportAds;
