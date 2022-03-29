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
import remarkSlug from 'remark-slug'
import remarkToc from 'remark-toc'

import * as cheerio from 'cheerio'

interface Props {
  filepath: string,
  baseImagePath: string,
}

const getToc = (html: string) => {
  const dom = cheerio.load(html)
  const h2 = new Array<string>()
  dom('h2').each((idx, ref) => {
    const id = ref.attribs['id']
    h2.push(id)
  })
  const tocHead = '目次'
  let toc = `<h2 id="${tocHead}">${tocHead}</h2>\n`
  toc += "<ol>"
  h2.forEach(e => {
    toc += `<li><a href="#${e}">${e}</a></li>`
  })
  toc += "</ol>"
  return {
    html: toc + html,
    toc: h2,
  }
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
    .use(remarkSlug)
    .use(remarkGfm)
    // .use(remarkToc, {
    //   heading: '目次',  // Table of Contents を挿入するための見出しを指定する
    // })
    .use(remarkRehype, { allowDangerousHtml: true }) // mdastをhast(HTMLの抽象構文木)に変換
    .use(rehypeShiki, {
      highlighter: await shiki.getHighlighter({
	      // theme: 'nord',
	      theme: 'github-dark',
      }),
    }) // shikiハイライターでコードブロックをハイライト
    .use(rehypeStringify, { allowDangerousHtml: true }) // hastをHTMLに変換
    .processSync(content);
  return getToc(result.toString())
};



export default markdownToHtml;