import PostsIndexPage from 'components/features/posts/posts-index-page';
import { getTagPageData, getTagParams } from 'lib/posts/queries';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const dynamicParams = false;
export const generateStaticParams = getTagParams;

type Props = { params: Promise<{ tag: string; page: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  return { title: `${tag}の記事` };
}

export default async function Page({ params }: Props) {
  const { tag, page } = await params;
  const current = Number(page);
  const { posts, pageCount } = getTagPageData(decodeURIComponent(tag), current);
  if (!Number.isInteger(current) || current < 1 || current > pageCount)
    notFound();
  return (
    <PostsIndexPage
      title="タグの記事"
      badge={decodeURIComponent(tag)}
      posts={posts}
      pagination={{ current, total: pageCount, basePath: `/tags/${tag}` }}
    />
  );
}
