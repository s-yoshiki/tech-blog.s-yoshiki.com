import PostsIndexPage from 'components/features/posts/posts-index-page';
import { parseYear } from '@repo/blog-content';
import PostsManager from 'lib/posts/manager';
import { getDateParams } from 'lib/posts/queries';
import { notFound } from 'next/navigation';

export const dynamicParams = false;
export const generateStaticParams = () => getDateParams().map(({ name }) => ({ year: name }));

export default async function Page({ params }: { params: Promise<{ year: string }> }) {
  const { year } = await params;
  const key = parseYear(year);
  const posts = key ? PostsManager.findByYear(key) : [];
  if (!key || !posts.length) notFound();
  return <PostsIndexPage title={`${year}年の記事`} posts={posts} />;
}
