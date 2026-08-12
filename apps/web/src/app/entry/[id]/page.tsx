import path from 'node:path';
import {
  extractMdxTableOfContents,
  markdownFileToHtml as markdownToHtml,
  readMarkdownFile,
} from '@repo/blog-content';
import ArticlePage from 'components/features/article/article-page';
import { getAllPostIds, getArticlePageData } from 'lib/posts/queries';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

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
  const source = readMarkdownFile(data.post.filepath);
  const isMdx = path.extname(data.post.filepath) === '.mdx';

  if (isMdx) {
    const postDirectory = path.basename(path.dirname(data.post.filepath));
    const { default: Content } = await import(
      `../../../../content/posts/${postDirectory}/index.mdx`
    );
    return (
      <ArticlePage
        {...data}
        post={{
          ...data.post,
          content: <Content />,
          readingText: source,
          toc: extractMdxTableOfContents(source),
        }}
      />
    );
  }

  const content = await markdownToHtml({ filepath: data.post.filepath });
  return (
    <ArticlePage
      {...data}
      post={{
        ...data.post,
        content: null,
        contentHtml: content.html,
        readingText: content.html,
        toc: content.toc,
      }}
    />
  );
}
