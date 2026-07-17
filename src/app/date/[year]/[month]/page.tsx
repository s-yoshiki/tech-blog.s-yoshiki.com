import { notFound } from 'next/navigation';
import PostsIndexPage from 'components/features/posts/posts-index-page';
import { getDateParams } from 'lib/posts/queries';
import PostsManager from 'utils/posts-manager';

export const dynamicParams = false;
export const generateStaticParams = () => getDateParams().flatMap((year) => year.months.map((month) => ({ year: year.name, month: month.name.split('-')[1] })));

export default async function Page({ params }: { params: Promise<{ year: string; month: string }> }) {
  const { year, month } = await params;
  const posts = PostsManager.findByYearMonth(year, month);
  if (!posts.length) notFound();
  return <PostsIndexPage title={`${year}年${Number(month)}月の記事`} posts={posts} />;
}
