# tech-blog.s-yoshiki.com

![](https://github.com/s-yoshiki/tech-blog.s-yoshiki.com/workflows/deploy%20s3/badge.svg)

ブログです。

- Next.js + Markdown / MDX 構成

## 投稿の構成

投稿IDは4桁のゼロ埋めディレクトリ名にします。本文は `index.md` または
`index.mdx` のどちらか一方を配置できます。

```text
content/posts/
└── 0336/
    ├── index.mdx
    └── photo.jpg
```

同じディレクトリの画像は、本文から相対パスで参照できます。

```md
![説明](./photo.jpg)
```

AIを活用して作成した記事には、front matterに `aiGenerated: true` を指定します。
指定がない既存記事は `false` として扱われ、指定した記事には一覧と記事本文の先頭にAI生成であることが表示されます。

```md
---
title: "記事タイトル"
aiGenerated: true
---
```

## 操作方法

```sh
pnpm dev
pnpm build
```

デモ: <https://tech-blog.s-yoshiki.com>
