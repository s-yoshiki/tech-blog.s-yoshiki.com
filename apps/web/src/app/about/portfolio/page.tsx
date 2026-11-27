import path from 'node:path';
import { markdownFileToHtml as markdownToHtml } from '@repo/blog-content';
import Container from 'components/container';
import PageHeader from 'components/page-header';
import type { Metadata } from 'next';
import styles from '../../page.module.css';

export const metadata: Metadata = { title: 'Portfolio' };

export default async function Page() {
  const content = await markdownToHtml({
    filepath: path.join(process.cwd(), 'content/pages/about/portfolio/index.md'),
  });
  return (
    <article>
      <PageHeader title="Portfolio" size="narrow" back={{ href: '/about/', label: 'About' }} />
      <Container
        size="narrow"
        className={`markdown-body ${styles.prose}`}
        dangerouslySetInnerHTML={{ __html: content.html }}
      />
    </article>
  );
}
