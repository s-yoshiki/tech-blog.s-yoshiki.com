import * as cheerio from 'cheerio';
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
  return `<h2 id="${TOC_HEADING}">${TOC_HEADING}</h2>\n<ol>${links}</ol>`;
};

export const prependTableOfContents = (html: string): RenderedMarkdown => {
  const toc = extractHeadingIds(html);
  return {
    html: renderTableOfContents(toc) + html,
    toc,
  };
};
