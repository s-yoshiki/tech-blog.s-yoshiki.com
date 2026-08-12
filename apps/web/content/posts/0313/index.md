---
title: "PrismaでN対N(多対多)のテーブルを作成するときのTips"
path: "/entry/313"
date: "2023-04-30 16:30"
coverImage: "../../../images/thumbnail/prisma-logo.png"
author: "s-yoshiki"
tags: ["node.js", "javascript", "typescript", "prisma", "mysql"]
---

## 概要

Prisma で N 対 N(多対多)のテーブルを作成するときの Tips についてのメモです。

ここでは簡単なブログサービスの DB を例に説明していきます。

## 検証した環境

- MySQL 8.0
- Prisma 4.12

## 1 対 N の場合

まず Prisma の基本的な使い方として、Post(記事テーブル)と Author(著者テーブル)を例に
1 対 N のテーブルを定義してみます。

```prisma

model Post {
  id             String          @id @default(id()) @map("id")
  content        String          @map("content")
  authorId       Int             @map("author_id")
  author         Author          @relation(fields: [authorId], references: [id])

  @@index([authorId])
  @@map("posts")
}

model Author {
  id        Int        @id @default(autoincrement()) @map("id")
  name      String     @unique
  posts     Post[]

  @@map("authors")
}
```

## N 対 N のテーブルを定義する

N 対 N のテーブルを表現する方法がいくつかあったので紹介していきます。

### 連想エンティティ(連関エンティティ)を自分で定義する

ブログサービスにおける記事(Post)とカテゴリ(Category)の関係を N 対 N とします。
N 対 N のテーブルは 2 つのテーブルのみで表すことができないため、
以下のスキーマの定義にある PostCategory のような[連想エンティティ](https://ja.wikipedia.org/wiki/%E9%80%A3%E6%83%B3%E3%82%A8%E3%83%B3%E3%83%86%E3%82%A3%E3%83%86%E3%82%A3)を定義することで表現します。

```prisma

model Post {
  id             String          @id @default(id()) @map("id")
  content        String          @map("content")
  categories     PostCategory[]
  @@map("posts")
}

model Category {
  id        Int        @id @default(autoincrement()) @map("id")
  name      String     @unique @map("name")
  posts     PostCategory[]
  @@map("categories")
}

model PostCategory {
  postId    String   @map("post_id")
  categoryId Int     @map("category_id")
  post      Post     @relation(fields: [postId], references: [id])
  category  Category @relation(fields: [categoryId], references: [id])

  @@id([postId, categoryId])
  @@map("post_categories")
}
```

### 連想エンティティを隠蔽する

上記で紹介した連想エンティティについて、Prisma では隠蔽することができます。
例えば以下の定義のように N 対 N で結合したいキーに対して、`@relation("post_category")`のようなオプションを加えることで
連想エンティティが隠蔽された(=prisma.schema 上では定義されていない)が作成されます。

```prisma

model Post {
  id             String          @id @default(id()) @map("id")
  content        String          @map("content")
  authorId       Int             @map("author_id")
  categories     Category[]      @relation("post_category")
  @@map("posts")
}

model Category {
  id        Int        @id @default(autoincrement()) @map("id")
  name      String     @unique @map("name")
  posts     Post[]     @relation("post_category")
  @@map("categories")
}
```

DB を直接確認すると、`_post_category`という名前でテーブルが作成されていることが確認できると思います。

```
> show tables;
+-----------------------+
| Tables_in_dev         |
+-----------------------+
| _post_category        |
| categories            |
| posts                 |
+-----------------------+
```

## おまけ: 自己結合

以下の定義のようにカテゴリに親子関係を表現できるような自己結合の定義もできました。

```prisma
model Category {
  id        Int        @id @default(autoincrement()) @map("id")
  name      String     @unique @map("name")
  parentId  Int?       @map("parent_id")
  parent    Category?  @relation("category_to_category", fields: [parentId], references: [id])
  children  Category[] @relation("category_to_category")

  @@map("categories")
}
```

※ 自己結合は場合によってはパフォーマンスの悪化につながる可能性があると言われているので、
程々にしておくべきだとだと思います。
