import path from 'node:path';
import type { Metadata } from 'next';
import markdownToHtml from 'utils/md';

export const metadata: Metadata = { title: 'About' };

export default async function Page() {
  const content = await markdownToHtml({
    filepath: path.join(process.cwd(), 'content/pages/about.md'),
  });
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="mb-10 text-4xl font-bold">About</h1>
      <div
        className="markdown-body rounded-2xl border bg-card p-6 shadow-sm md:p-10"
        dangerouslySetInnerHTML={{ __html: content.html }}
      />
    </article>
  );
}
