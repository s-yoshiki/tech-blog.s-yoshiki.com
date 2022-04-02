import React from "react";
import Ads from './ads'

const SidebarAds = () => {
  return (
    <div className="min-h-full">
      <Ads
        slot=""
        format="autorelaxed"
        fullWidthResponsive='true'
        style={{display: "block", textAlign: "center"}}
        />
    </div>
  );
};

export default SidebarAds