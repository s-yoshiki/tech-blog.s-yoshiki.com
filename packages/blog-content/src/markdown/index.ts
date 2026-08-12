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

export { readMarkdownFile } from './read-markdown-file';
export { renderMarkdown } from './render-markdown';
export {
  extractMdxTableOfContents,
  prependTableOfContents,
} from './table-of-contents';
export type {
  MarkdownFileOptions,
  RenderedMarkdown,
  TableOfContentsItem,
} from './types';
