import * as cheerio from 'cheerio';
import GithubSlugger from 'github-slugger';
import type { RenderedMarkdown } from './types';

const TOC_HEADING = '目次';

const extractHeadingIds = (html: string): string[] => {
  const document = cheerio.load(html);
  return document('h2')
    .toArray()
    .map((heading) => heading.attribs.id)
    .filter((id): id is string => Boolean(id));
};

const renderTableOfContents = (headingIds: string[]): string => {
  const links = headingIds
    .map((id) => `<li><a href="#${id}">${id}</a></li>`)
    .join('');
  return `<h2 class="inline-toc" id="${TOC_HEADING}">${TOC_HEADING}</h2>\n<ol class="inline-toc">${links}</ol>`;
};

export const prependTableOfContents = (html: string): RenderedMarkdown => {
  const toc = extractHeadingIds(html);
  return {
    html: renderTableOfContents(toc) + html,
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

export const extractMdxTableOfContents = (source: string): string[] => {
  const slugger = new GithubSlugger();
  return Array.from(source.matchAll(/^##[ \t]+(.+?)[ \t]*#*[ \t]*$/gm))
    .map((match) => markdownHeadingToText(match[1]))
    .filter(Boolean)
    .map((heading) => slugger.slug(heading));
};
