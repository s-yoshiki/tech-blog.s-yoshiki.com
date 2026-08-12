import { siteMetaData } from 'config/site-config';
import { getDateParams, getTagParams } from 'lib/posts/queries';
import type { MetadataRoute } from 'next';
import PostsManager from 'utils/posts-manager';

export const dynamic = 'force-static';

const toUrl = (path: string) => new URL(path, siteMetaData.siteUrl).toString();

export default function sitemap(): MetadataRoute.Sitemap {
  const posts: MetadataRoute.Sitemap = PostsManager.getData().map((post) => ({
    url: toUrl(`${post.path}/`),
    lastModified: new Date(post.date),
  }));

  const tags: MetadataRoute.Sitemap = getTagParams().map(({ tag, page }) => ({
    url: toUrl(`/tags/${encodeURIComponent(tag)}/${page}/`),
  }));

  const dates: MetadataRoute.Sitemap = getDateParams().flatMap((year) => [
    { url: toUrl(`/date/${year.name}/`) },
    ...year.months.map((month) => ({
      url: toUrl(`/date/${year.name}/${month.name.split('-')[1]}/`),
    })),
  ]);

  return [
    { url: toUrl('/') },
    { url: toUrl('/about/') },
    { url: toUrl('/terms/external-transmission/') },
    ...posts,
    ...tags,
    ...dates,
  ];
}
