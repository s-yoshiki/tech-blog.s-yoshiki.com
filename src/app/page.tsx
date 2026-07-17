import HomePage from 'components/features/home/home-page';
import { getHomePageData } from 'lib/posts/queries';

export default function Page() {
  return <HomePage {...getHomePageData()} />;
}
