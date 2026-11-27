import path from 'node:path';
import { markdownFileToHtml as markdownToHtml } from '@repo/blog-content';
import { Button } from '@repo/ui';
import Container from 'components/container';
import PageHeader from 'components/page-header';
import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '../page.module.css';

export const metadata: Metadata = { title: 'About' };

export default async function Page() {
  const content = await markdownToHtml({
    filepath: path.join(process.cwd(), 'content/pages/about.md'),
  });
  return (
    <article>
      <PageHeader
        title="About"
        size="narrow"
        aside={
          <Button variant="outline" size="sm" render={<Link href="/about/portfolio/" />}>
            Portfolio
          </Button>
        }
      />
      <Container
        size="narrow"
        className={`about-page markdown-body ${styles.prose}`}
        dangerouslySetInnerHTML={{ __html: content.html }}
      />
    </article>
  );
}
