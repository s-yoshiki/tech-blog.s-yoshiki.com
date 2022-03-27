import { useRouter } from "next/router";
import React, { useEffect } from "react";

interface AdsenseProps {
  layout?: string;
  format?: string;
  client?: string;
  slot?: string;
  style?: any;
  fullWidthResponsive?: 'true' | 'false';
}

const Ads = (props : AdsenseProps) => {
  const { asPath } = useRouter();

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.log(err);
    }
  }, [asPath]);

  const client = 'ca-pub-5931776908676811'
  return (
    <div key={asPath}>
      <ins
        className="adsbygoogle"
        style={props.style}
        data-ad-layout={props.layout}
        data-ad-format={props.format}
        data-ad-client={client}
        data-ad-slot={props.slot}
        data-full-width-responsive={props.fullWidthResponsive}
      />
    </div>
  );
};

export default Ads