import fs from 'fs'
import matter from "gray-matter";
import {unified} from 'unified'
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeShiki from '@leafac/rehype-shiki';
import * as shiki from 'shiki';
import remarkGfm from 'remark-gfm'
import remarkHtml from 'remark-html'
import rehypeSlug from 'rehype-slug'
import rehypeToc from 'rehype-toc'

interface Props {
  filepath: string,
  baseImagePath: string,
}

/**
 * remarkによるmarkdownの構文変換を行う
 * @param markdown markdown記法で書かれたプレーンテキスト
 * @returns 変換結果をString化したもの
 */
const markdownToHtml = async (opt: Props) => {
  const fileContents = fs.readFileSync(opt.filepath, "utf8");
  const { data, content } = matter(fileContents);
  const result = await unified() // unifiedライブラリの処理をまとめる
    .use(remarkParse) // Markdownをmdast(Markdownの抽象構文木)に変換
    .use(remarkHtml)
    .use(rehypeSlug)
    .use(rehypeToc)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true }) // mdastをhast(HTMLの抽象構文木)に変換
    .use(rehypeShiki, {
      highlighter: await shiki.getHighlighter({
	      // theme: 'nord',
	      theme: 'github-dark',
      }),
    }) // shikiハイライターでコードブロックをハイライト
    .use(rehypeStringify, { allowDangerousHtml: true }) // hastをHTMLに変換
    .processSync(content);
  return result.toString();
};

export default markdownToHtml;