import * as cheerio from 'cheerio';
import GithubSlugger from 'github-slugger';
import type { RenderedMarkdown, TableOfContentsItem } from './types';

const extractHeadings = (html: string): TableOfContentsItem[] => {
  const document = cheerio.load(html);
  return document('h2')
    .toArray()
    .map((heading) => ({
      id: heading.attribs.id,
      label: document(heading).text().trim(),
    }))
    .filter(
      (item): item is TableOfContentsItem =>
        Boolean(item.id) && Boolean(item.label),
    );
};

export const prependTableOfContents = (html: string): RenderedMarkdown => {
  const toc = extractHeadings(html);
  return {
    html,
    toc,
  };
};

const markdownHeadingToText = (heading: string): string =>
  cheerio
    .load(
      `<span>${heading
        .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
        .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
        .replace(/<[^>]+>/g, '')
        .replace(/[`*_~]/g, '')}</span>`,
    )('span')
    .text()
    .trim();

export const extractMdxTableOfContents = (
  source: string,
): TableOfContentsItem[] => {
  const slugger = new GithubSlugger();
  return Array.from(source.matchAll(/^##[ \t]+(.+?)[ \t]*#*[ \t]*$/gm))
    .map((match) => markdownHeadingToText(match[1]))
    .filter(Boolean)
    .map((label) => ({ id: slugger.slug(label), label }));
};
