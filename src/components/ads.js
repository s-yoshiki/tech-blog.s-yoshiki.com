import React from 'react'
import AdSense from 'react-adsense'

const Ads = () => (
  <div style={{
    width:'100%',
    maxWidth:'950px',
    'minWidth': '250px',
    }}>
    <AdSense.Google
      client='ca-pub-5931776908676811'
      slot=''
      format='auto'
    />
  </div>
)

export default Ads