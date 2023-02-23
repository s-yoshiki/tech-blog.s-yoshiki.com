---
title: "GatsbyからNext.jsへのサイト移行"
path: "/entry/271"
date: "2022-04-04 00:10"
coverImage: "../../../images/thumbnail/next-logo.png"
author: "s-yoshiki"
tags: ["next.js","gatsby","amazon-aws","amazon-s3","javascript","typescript","tailwind-css","react"]
---

## 概要

このブログを Gatsby から Next.js に移行しました。

GatsbyからNextへの移行方法は [Migrating from Gatsby](https://nextjs.org/docs/migrating/from-gatsby) に基本的には記載されていますが、
細かい設定やプラグイン周りについては各々で調査して移行方法を検討する部分があると思われるので、その部分について記載しました。

## 移行の目的

特にGatsbyに不満があった訳ではありません。
Gatsbyを1~2年利用しましたが、とても優れたツールだと思っています。

それにも関わらずNextに移行した理由は、

- 単純にNextの勉強をしたかった
- プラグインとして隠蔽されてしまっている部分を自分で実装してみたくなった
- Vercel が開発している安定感
- 情報量も十分

といったところです。

## 移行作業の工程

作業工程について、次のようなタスクをリストアップし工程を組んで実施しました。

1. Next.jsでプロトタイプ版のサイト構築 (3d)
2. コンテンツの変換項目洗い出し・変換・移動 (1d)
3. Adsense・Analytics・Sitemap・OGP等の設定 (2d)
4. 試験環境・本番環境構築 (1d)
5. デプロイの検証 (0.5d)
6. 本番化 (0.5d)

※ 括弧内は実際に費やした時間です。1d = 8hとしています。

## Next.jsでプロトタイプ版のサイト構築

移行前は次の様な技術スタックで構築していました。

- Gatsby + React(js) でガワを実装
- コンテンツはmarkdownファイルでGit管理(ヘッドレスではない)
- GitHub Actions でCI/CDを構築
- Amazon S3 + CloudFront でコンテンツ配信

移行後は次のようにしました。

- Next.js + React + TypeScript + TailwindCSS
  - SSG方式を採用
- コンテンツはmarkdownファイルでGit管理(ヘッドレスではない)
- GitHub Actions でCI/CDを構築
- Amazon S3 + CloudFront でコンテンツ配信

つまりガワの部分だけが主な変更となります。

### ディレクトリ構成

### NextJSでmarkdownファイルを扱う

NextJSでMarkdownファイルを表示する大まかな仕組みについて、基本的な実装はこちらを参考にしました。

[Next.js で Markdown ブログを作る](https://blog.chick-p.work/next-js-blog/)

こちらの記事の実装では単純な記事の羅列・表示を行なっていますが、タグ・年月ごとのソート・集計を行いたかったので、
データの取得部分の実装をclassで定義してにしてタグごとの集計データを返却するメソッドを追加しました。(`utils/posts-manager.ts`)

### Markdownのパース

ファイルをmarkdownからHTMLへ変換する部分については
remark, rehype, unified, grey-matter 等のパッケージ及びそれらのプラグインを利用して変換を行なっています。

この部分については
[Remark・Rehype プラグインで文書の見出しに自動で ID を振り目次リストを自動生成する](https://neos21.net/blog/2020/11/13-01.html)
を参考にしました。

(`utils/md.ts`)

### シンタックスハイライト

シンタックスハイライトには[shiki](https://github.com/shikijs/shiki)を利用しました。

### 実装

実装は以下となります。

※いくつか端折っています。

`utils/posts-manager.ts`

```ts
import fs from 'fs';
import matter from 'gray-matter';
import getConfig from 'next/config';
import { join } from 'path';
import { IGroupByItems, Posts } from 'types/entry.interface';

export interface Posts {
  title: string;
  path: string;
  date: string;
  coverImage: string;
  tags: string[];
  filepath: string;
}

export interface IGroupByItems {
  name: string;
  counts: number;
}

const { publicRuntimeConfig } = getConfig(); // 後述

const listFiles = (dir: string): string[] =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap(dirent =>
    dirent.isFile()
      ? [`${dir}/${dirent.name}`]
      : listFiles(`${dir}/${dirent.name}`)
  );

class PostsManager {
  /**
   * 付属情報格納
   */
  private data: Array<Posts>;
  /**
   * タグごとにソートした記事
   */
  private dataGroupByTag: Map<string, Posts[]>;
  // 利用しているタグ名
  private tagNames: string[] = [];

  /**
   * @param basePath
   */
  constructor(basePath: string) {
    const files = listFiles(basePath);
    const result = [];
    for (let i = 0; i < files.length; i++) {
      if (!files[i].endsWith('/index.md')) {
        continue;
      }
      const fileContents = fs.readFileSync(files[i], 'utf8');
      const { data } = matter(fileContents);
      data.filepath = files[i];
      result.push(<Posts> data);
    }
    const dataGroupByTag = new Map<string, Posts[]>();
    this.data = result.map(post => {
      //
      // tag集計
      //
      post.tags = Array.from(new Set(post.tags));
      this.tagNames = Array.from(new Set(this.tagNames.concat(post.tags)));
      post.tags.forEach(tag => {
        let tmp = dataGroupByTag.get(tag);
        if (!tmp) {
          tmp = [];
        }
        tmp.unshift(post);
        dataGroupByTag.set(tag, tmp);
      });
      return post;
    });
    this.dataGroupByTag = dataGroupByTag;
    // path:/entry/${id} でソート
    this.data = this.data.sort((a: Posts, b: Posts): number => {
      let ai = Number(a.path.split('/').pop());
      let bi = Number(b.path.split('/').pop());
      return bi - ai;
    });
  }

  /**
   * @returns
   */
  public getData() {
    return this.data;
  }

  /**
   * @param path
   * @returns
   */
  public findByPath(path: string): Posts | undefined {
    const data = this.data;
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      if (path === row.path) {
        return row;
      }
    }
    return;
  }

  /**
   * タグで一覧検索
   * @param tag
   * @returns
   */
  public findByTag(tag: string): Posts[] {
    const data = this.getAllGroupByTags().get(tag);
    if (!data) {
      return [];
    }
    return data;
  }

  /**
   * tagでソートして取得
   * @returns
   */
  public getAllGroupByTags(): Map<string, Posts[]> {
    return this.dataGroupByTag;
  }

  /**
   * tagでソートして取得
   * @returns
   */
  public getCountsGroupByTags(sort: 'desc' | 'asc' = 'desc'): IGroupByItems[] {
    const tagNames = this.getAllTagNames();
    const tagsCounts = [];
    for (let i = 0; i < tagNames.length; i++) {
      const tag = tagNames[i];
      tagsCounts.push({
        name: tag,
        counts: this.findByTag(tag).length,
      });
    }
    return tagsCounts.sort((prev, next) => {
      if (sort === 'asc') {
        return prev.counts - next.counts;
      }
      return next.counts - prev.counts;
    });
  }
}

// postsが格納されているディレクトリを取得する
const postsDirectory = join(process.cwd(), 'content/posts');

export default new PostsManager(postsDirectory);
```

`utils/md.ts`

```ts
import rehypeShiki from '@leafac/rehype-shiki';
import fs from 'fs';
import matter from 'gray-matter';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import remarkSlug from 'remark-slug';
import * as shiki from 'shiki';
import { unified } from 'unified';

interface Props {
  filepath: string;
}

const markdownToHtml = async (opt: Props) => {
  const fileContents = fs.readFileSync(opt.filepath, 'utf8');
  const { data, content } = matter(fileContents);
  const result = await unified()
    .use(remarkParse)
    .use(remarkHtml)
    .use(remarkSlug)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeShiki, {
      highlighter: await shiki.getHighlighter({
        theme: 'github-dark',
      }),
    })
    .processSync(content);
  return result.toString();
};
```

呼び出し側の例

```ts
import markdownToHtml from 'utils/md';
import PostsManager from 'utils/posts-manager';

export const getStaticPaths = async () => {
  const posts = PostsManager.getData();
  const result = {
    paths: posts.map((post: any) => {
      return {
        params: {
          id: post.path.split('/').pop(),
        },
      };
    }),
    fallback: false,
  };
  return result;
};

export const getStaticProps = async ({ params }: any) => {
  const tags = PostsManager.getCountsGroupByTags().slice(0, 50);
  const post = PostsManager.findByPath(`/entry/${params.id}`);
  const contentObj = await markdownToHtml({
    filepath: post.filepath,
  });
  return {
    props: {
      post: {
        ...post,
        content: contentObj.html,
      },
      tags,
    },
  };
};
```

## コンテンツの変換項目洗い出し・変換・移動

### 記事のパスの調整

Gatsbyを利用していた際は、
各記事のmarkdownファイルのメタデータ領域にファイルパスを定義していました。

例

`content/entry/300/271/index.md`ファイルの場合

```yaml
---
title: "タイトル..."
path: "/entry/271"
date: "2022-04-03 01:00"
tags: ["javascript", "typescript"]
---
```

※上記のメタデータの場合、`https://ドメイン/entry/271` としてHTMLファイルを吐き出します

※`content/entry/300/271/index.md`の"300"の意図はファイルを1つのディレクトリに数百個コンテンツが存在すると視認性が悪くなるので、100記事単位で区切って管理していました。

このメタデータのパスを利用したかったことと、コンテンツの構成を弄ることは避けたかったので、`pages/entry/[id].tsx`にファイルを置き、記事のIDにマッチするファイルを取得するようにパスの部分の実装を調整しました。

### 画像パスの調整

記事内の画像ファイルはこれまでは画像ファイルと同じディレクトリに格納していました。

例

```
content/entry/300/271/index.md
content/entry/300/271/image1.png
content/entry/300/271/image2.jpg
```

また記事内では相対パスと絶対パスが混在している状態となってました。

```md
## Article Head

hello world

![](./image1.png)

![](/entry/image2.jpg)
```

これについては、画像ファイルをpublicディレクトリに移動することで解決しました。

```
content/entry/300/271/index.md
public/entry/271/image1.png
public/entry/271/image2.jpg
```

Nextのビルド時に画像をdataURLに変換して記事に埋め込む方法も検討しましたが、
難易度が高かったので辞めました。

## Adsense・Analytics・Sitemap・OGP等の設定

### Google Adsense

Adsense周りの実装はこちらを参考にしました。

[[Next.js] Google Adsenseを表示させる方法](https://b.0218.jp/202104021830.html)

### Google Analytics

Analytics周りの実装はこちらを参考にしました。

[Next.jsでGoogle Analyticsを使えるようにする](https://panda-program.com/posts/nextjs-google-analytics)

Chromeの拡張機能であるGoogle Analytics Debuggerを利用することでローカル環境でもタグ周りの動作を確認できるので便利でした。

### Sitemap

Sitemapはこちらを参考にしました。

[Next.js に next-sitemap を導入して超手軽にサイトマップ sitemap.xml を生成しよう](https://fwywd.com/tech/next-sitemap)

### OGP

メタタグを設定することで問題なく設定できました。

metaタグは`next/head`を用いることで利用できます。

実装例

```tsx
import Head from 'next/head';

const Ogp = (props) => {
  return (
    <Head>
      <title>{props.title}</title>
      <meta name='viewport' content='width=device-width,initial-scale=1.0' />
      <meta name='description' content={props.description} />
      <meta property='og:url' content={props.url} />
      <meta property='og:title' content={props.title} />
      <meta property='og:site_name' content={props.title} />
      <meta property='og:description' content={props.description} />
      <meta property='og:type' content='website' />
      <meta property='og:image' content={props.imgUrl} />
      <link rel='canonical' href={props.url} />
    </Head>
  );
};
```

twitter用のogpも同様に設定できました。

## 試験環境・本番環境構築

### CI/CD

コンテンツのホスティングにはAmazon S3 と cloudfrontを利用しています。

これはGatsby環境から引き続き同じ環境にデプロイします。

CI/CDにはGitHub Actionsを利用しています。

↓はGatsby時の設定ですが、ほとんど同じ構成でNextもビルド〜デプロイしています。

[GitHub Actions で Gatsby をビルドし Amazon S3 にデプロイする](https://tech-blog.s-yoshiki.com/entry/197/)

### サブディレクトリの利用

通常の検証では検証用の環境を利用しますが、
本番のドメインで検証したいことがあり、本番環境のサブディレクトリにコンテンツを配置して検証しました。

Nextでサブディレクトリを利用したい場合は次の様に設定を行うことでサブディレクトリで利用できます。

```js
const basePath = '/subdir';

const nextConfig = {
  basePath, // アプリケーションのパスprefix
  publicRuntimeConfig: {
    basePath,
  },
};
module.exports = nextConfig;
```

`publicRuntimeConfig`はSSR,SSGでも利用できるランタイムの設定を定義できる領域です。
サブディレクトリのパスを定義しておき、各種ファイルのパスを調整するのに利用しました。

例

```tsx
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const { basePath } = publicRuntimeConfig;
```

## 検討したけどやらなかったこと

以下のものは検討したけど利用しなかったものです。

- SSR

更新頻度が低いのでSSGで十分だと判断しました。

- MDX

ただのドキュメント作成・管理にJSXを利用するメリットは大きくないと思いました。
また、別のツールに乗り換えることを考えた時に大きな負債になる可能性があると思ったからです。

- 画像最適化

`next/image`の利用及びその代替実装は行いませんでした。
そもそも`next/image`はSSGでは利用できませんでした。
next-optimized-imagesの導入も手こずったため、画像はimgタグを利用しました。

- Chakra, MUI, 他UIフレームワーク (vs Tailwind)

何となく...
