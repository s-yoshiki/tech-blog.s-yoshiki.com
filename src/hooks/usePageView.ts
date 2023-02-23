import { pageview } from 'lib/gtag';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function usePageView() {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (path: string) => {
      pageview(path);
    };
    // router変更時
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
}
