import path from 'node:path';
import { markdownFileToHtml as markdownToHtml } from '@repo/blog-content';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Portfolio' };

export default async function Page() {
  const content = await markdownToHtml({
    filepath: path.join(
      process.cwd(),
      'content/pages/about/portfolio/index.md',
    ),
  });
  return (
    <article>
      <header className="border-border border-b">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
          <nav aria-label="パンくずリスト" className="mb-5">
            <Link
              href="/about/"
              className="rounded text-muted-foreground text-sm hover:text-foreground"
            >
              ← About
            </Link>
          </nav>
          <h1 className="font-bold text-3xl tracking-tight">Portfolio</h1>
        </div>
      </header>
      <div
        className="markdown-body mx-auto max-w-3xl px-4 py-10 sm:px-6"
        dangerouslySetInnerHTML={{ __html: content.html }}
      />
    </article>
  );
}
