import ArticlePage from 'components/features/article/article-page';
import { getAllPostIds, getArticlePageData } from 'lib/posts/queries';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import markdownToHtml from 'utils/md';

export const dynamicParams = false;
export const generateStaticParams = getAllPostIds;
type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const data = getArticlePageData(id);
  if (!data) return {};
  return {
    title: data.post.title,
    description: data.post.title,
    openGraph: { type: 'article', images: [data.post.coverImage] },
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const data = getArticlePageData(id);
  if (!data) notFound();
  const content = await markdownToHtml({
    filepath: data.post.filepath,
    baseImagePath: data.post.path,
  });
  return (
    <ArticlePage
      {...data}
      post={{ ...data.post, content: content.html, toc: content.toc }}
    />
  );
}
