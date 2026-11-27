import { siteMetaData } from 'config/site-config';
import { routes } from 'lib/routes';
import PostsManager from 'lib/posts/manager';
import { getDateParams, getTagParams } from 'lib/posts/queries';
import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const toUrl = (path: string) => new URL(path, siteMetaData.siteUrl).toString();

export default function sitemap(): MetadataRoute.Sitemap {
  const posts: MetadataRoute.Sitemap = PostsManager.getData().map((post) => ({
    url: toUrl(routes.post(post.path)),
    lastModified: new Date(post.date),
  }));

  const tags: MetadataRoute.Sitemap = getTagParams().map(({ tag, page }) => ({
    url: toUrl(routes.tag(tag, Number(page))),
  }));

  const dates: MetadataRoute.Sitemap = getDateParams().flatMap((year) => [
    { url: toUrl(routes.year(year.name)) },
    ...year.months.map((month) => ({
      url: toUrl(routes.month(month.name)),
    })),
  ]);

  return [
    { url: toUrl('/') },
    { url: toUrl('/about/') },
    { url: toUrl('/about/portfolio/') },
    { url: toUrl('/terms/external-transmission/') },
    ...posts,
    ...tags,
    ...dates,
  ];
}
