import fs from 'fs';
import matter from 'gray-matter';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';
import remarkParse from 'remark-parse';
import rehypeSlug from 'rehype-slug';
import remarkRehype from 'remark-rehype';
import rehypeShiki from '@shikijs/rehype';
import { unified } from 'unified';

import * as cheerio from 'cheerio';

interface Props {
  filepath: string;
  baseImagePath: string;
}

const getToc = (html: string) => {
  const dom = cheerio.load(html);
  const h2 = new Array<string>();
  dom('h2').each((idx, ref) => {
    const id = ref.attribs['id'];
    h2.push(id);
  });
  const tocHead = '目次';
  let toc = `<h2 id="${tocHead}">${tocHead}</h2>\n`;
  toc += '<ol>';
  h2.forEach((e) => {
    toc += `<li><a href="#${e}">${e}</a></li>`;
  });
  toc += '</ol>';
  return {
    html: toc + html,
    toc: h2,
  };
};

/**
 * remarkによるmarkdownの構文変換を行う
 * @param markdown markdown記法で書かれたプレーンテキスト
 * @returns 変換結果をString化したもの
 */
const markdownToHtml = async (opt: Props) => {
  const fileContents = fs.readFileSync(opt.filepath, 'utf8');
  const { content } = matter(fileContents);
  const result = await unified() // unifiedライブラリの処理をまとめる
    .use(remarkParse) // Markdownをmdast(Markdownの抽象構文木)に変換
    .use(remarkHtml)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true }) // mdastをhast(HTMLの抽象構文木)に変換
    .use(rehypeSlug)
    .use(rehypeShiki, {
      themes: {
        dark: 'github-dark',
        light: 'github-dark',
      },
    }) // shikiハイライターでコードブロックをハイライト
    .use(rehypeStringify, { allowDangerousHtml: true }) // hastをHTMLに変換
    .process(content);
  return getToc(result.toString());
};

export default markdownToHtml;
