
import Script from 'next/script'

const GaTag = ({ gaId }: { gaId: string }) => {
  return (
    <>
      <Script defer src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="ga" defer strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());    
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  )
}

export default GaTag