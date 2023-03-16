---
title: "zod-prisma-types で Prisma から Zod を生成する"
path: "/entry/309"
date: "2023-03-13 18:30"
coverImage: "../../../images/thumbnail/prisma-logo.png"
author: "s-yoshiki"
tags: ["prisma", "node.js", "typescript", "zod"]
---

## 概要

[NestJS Prisma Zod OpenAPI で型を堅牢にしたアプリケーションの開発 | 404 motivation not found](https://tech-blog.s-yoshiki.com/entry/308)を書いている際にPrismaからZodのオブジェクトを生成するパッケージをいくつか利用して比較しました。

その中でも [zod-prisma-types](https://github.com/chrishoermann/zod-prisma-types) というパッケージが比較的に良かったので、これについて書いていきます。

## 環境

- Prisma: 4.11
- zod-prisma-types: 2.5

## インストール

パッケージマネージャに合わせて`Prisma`と`zod-prisma-types`のインストールを行います。

```sh
npm install zod-prisma-types
# or
yarn add zod-prisma-types
# or
pnpm add zod-prisma-types
```

## Prisma Schema の定義

今回はsqliteを利用します。
以下のようにテスト用のテーブルを定義します。

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  posts Post[]
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean? @default(false)
  author    User?    @relation(fields: [authorId], references: [id])
  authorId  Int?
}
```

このスキーマに対して、`zod-prisma-types`のオプションを追加します。


```prisma
generator zod {
  provider                         = "zod-prisma-types"
  // 自動生成されたファイルが配置されるパス
  output                           = "../src/schema/zod"
  // ファイル分割の定義
  // useMultipleFiles                 = true // default is false
  createInputTypes                 = false // default is true
  // createModelTypes                 = false // default is true
  // addInputTypeValidation           = false // default is true
  // addIncludeType                   = false // default is true
  // addSelectType                    = false // default is true
  // validateWhereUniqueInput         = true // default is false
  // createOptionalDefaultValuesTypes = true // default is false
  // createRelationValuesTypes        = true // default is false
  // createPartialTypes               = true // default is false
  // useDefaultValidators             = false // default is true
  // coerceDate                       = false // default is true
  // writeNullishInModelTypes         = true // default is false
  // prismaClientPath                 = "./path/to/prisma/client" // default is client output path
}
```

`createInputTypes　= false` としたのはPrismaのCreateやUpdateで利用される全てのSchemaを生成してしまうために、
最低限のファイルを生成するようにしたためです。

これにより次のファイルが生成されます。

```ts
import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const PostScalarFieldEnumSchema = z.enum(['id','title','content','published','authorId']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const TransactionIsolationLevelSchema = z.enum(['Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','email','name']);

export const UserSchema = z.object({
  id: z.number().int(),
  email: z.string(),
  name: z.string().nullable(),
})

export type User = z.infer<typeof UserSchema>

export const PostSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  content: z.string().nullable(),
  published: z.boolean().nullable(),
  authorId: z.number().int().nullable(),
})

export type Post = z.infer<typeof PostSchema>
```

## コメントを利用したバリデーションルールの定義

以下コードのようにコメントを利用してzodのルールを定義をすると生成したファイルのzodオブジェクトにもルールが追加されます。

```prisma
model User {
  id    Int     @id @default(autoincrement())
  /// @zod.string.email()
  email String  @unique
  /// @zod.string.max(255, { message: "max error" })
  name  String?
  posts Post[]
}
```

```ts
export const UserSchema = z.object({
  id: z.number().int(),
  email: z.string().email(),
  name: z.string().max(255, { message: "max error" }).nullable(),
})

export type User = z.infer<typeof UserSchema>
```

ちなみに、このバージョンでは `/// @zod.string.max(255, { message: "255字未満で入力してください" })` のように日本語を利用すると正しくzodのオブジェクトが生成されませんでした。

## 類似パッケージとの比較

`zod-prisma-types`を検証するにあたり、類似のパッケージも比較しましたが、最終的にこれに落ち着きました。

### [Prisma Zod Generator](https://www.npmjs.com/package/prisma-zod-generator)

基本的な機能には不満はなかったのですが、利用できるオプションが少なく自由度が低いと思いました。

### [Zod Prisma](https://www.npmjs.com/package/zod-prisma)

こちらも機能には不満はなかったのですが、2023年3月時点で最終更新が1年前であり、更新が止まっている点が気になりました。

[Is this library alive? · Issue #148 · CarterGrimmeisen/zod-prisma](https://github.com/CarterGrimmeisen/zod-prisma/issues/148)

