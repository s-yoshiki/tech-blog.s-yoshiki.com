import PostsIndexPage from 'components/features/posts/posts-index-page';
import { parseYearMonth, splitYearMonth } from '@repo/blog-content';
import PostsManager from 'lib/posts/manager';
import { getDateParams } from 'lib/posts/queries';
import { notFound } from 'next/navigation';

export const dynamicParams = false;
export const generateStaticParams = () =>
  getDateParams().flatMap((year) =>
    year.months.map((month) => ({
      year: year.name,
      month: splitYearMonth(month.name).month,
    })),
  );

export default async function Page({
  params,
}: {
  params: Promise<{ year: string; month: string }>;
}) {
  const { year, month } = await params;
  const key = parseYearMonth(year, month);
  const posts = key ? PostsManager.findByYearMonth(key) : [];
  if (!key || !posts.length) notFound();
  return <PostsIndexPage title={`${year}年${Number(month)}月の記事`} posts={posts} />;
}
