import path from 'node:path';
import { markdownFileToHtml as markdownToHtml } from '@repo/blog-content';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'About' };

export default async function Page() {
  const content = await markdownToHtml({
    filepath: path.join(process.cwd(), 'content/pages/about.md'),
  });
  return (
    <article>
      <header className="border-border border-b">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
          <h1 className="font-bold text-3xl tracking-tight">About</h1>
        </div>
      </header>
      <div
        className="about-page markdown-body mx-auto max-w-3xl px-4 py-10 sm:px-6"
        dangerouslySetInnerHTML={{ __html: content.html }}
      />
    </article>
  );
}
