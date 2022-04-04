import { useEffect } from "react";
import { useRouter } from "next/router";
import { pageview } from "lib/gtag";

export default function usePageView() {
  const router = useRouter();

  useEffect(() => {
    // 来訪時
    pageview(window.location.pathname)

    const handleRouteChange = (path: string) => {
      pageview(path)
    }
    // router変更時
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
}
