import fs from 'node:fs';
import matter from 'gray-matter';

export const readMarkdownFile = (filepath: string): string => {
  const fileContents = fs.readFileSync(filepath, 'utf8');
  return matter(fileContents).content;
};
