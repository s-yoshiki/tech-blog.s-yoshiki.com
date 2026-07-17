import { readMarkdownFile } from './read-markdown-file';
import { renderMarkdown } from './render-markdown';
import { prependTableOfContents } from './table-of-contents';
import type { MarkdownFileOptions, RenderedMarkdown } from './types';

export const markdownFileToHtml = async (
  options: MarkdownFileOptions,
): Promise<RenderedMarkdown> => {
  const markdown = readMarkdownFile(options.filepath);
  const html = await renderMarkdown(markdown);
  return prependTableOfContents(html);
};

export type { MarkdownFileOptions, RenderedMarkdown } from './types';
