---
title: "Prisma TypeScript SQLiteなプロジェクトの構築"
path: "/entry/287"
date: "2022-08-06 16:00"
coverImage: "../../../images/thumbnail/prisma-logo.png"
author: "s-yoshiki"
tags: ["prisma", "typescript", "sqlite", "node.js"]
---

## はじめに

Prisma TypeScript SQLite な構成でプロジェクトの作成をしてみました。

## プロジェクト作成

以下のコマンドでプロジェクトを作成します。

```shell
mkdir prisma-test
cd prisma-test
npm init -y
npm install prisma typescript ts-node @types/node --save-dev
npx prisma init
```

## prisma スキーマ定義

次の定義のとおり、スキーマファイルを編集します。

`prisma/schema.prisma`

```prisma
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

generator client {
  provider = "prisma-client-js"
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)
  author    User?    @relation(fields: [authorId], references: [id])
  createdAt DateTime @default(now())
  updateAt  DateTime @default(now()) @updatedAt
  authorId  Int?
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updateAt  DateTime @default(now()) @updatedAt
  posts     Post[]
}
```

編集が終わったらマイグレーションを行います。

`npx prisma migrate dev --name init`

```
./prisma
├── dev.db
├── dev.db-journal
├── migrations
│   ├── 20220806061556_init
│   │   └── migration.sql
│   └── migration_lock.toml
└── schema.prisma
```

## SELECT/INSERT の実装

次に、実行ファイルである`main.ts`を作成します。

```typescript
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      name: 'あああ',
      email: `alice-${new Date().getTime()}@example.com`,
      posts: {
        create: { title: 'Hello World' },
      },
    },
  });
  const allUsers = await prisma.user.findMany();
  console.log(allUsers);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

編集が終わったら実行します。

```
npx ts-node ./main.ts
```

結果が次のように出力されます。

```js
[
  {
    id: 1,
    email: 'alice-1659767646486@prisma.io',
    name: 'Alice',
    createdAt: 2022-08-06T06:34:06.587Z,
    updateAt: 2022-08-06T06:34:06.587Z
  },
  {
    id: 2,
    email: 'alice-1659767649969@prisma.io',
    name: 'Alice',
    createdAt: 2022-08-06T06:34:10.013Z,
    updateAt: 2022-08-06T06:34:10.013Z
  },
  {
    id: 3,
    email: 'alice-1659767659377@prisma.io',
    name: 'あああ',
    createdAt: 2022-08-06T06:34:19.418Z,
    updateAt: 2022-08-06T06:34:19.418Z
  }
]
```

DB のファイルの中身も確認していきます。

```
sqlite3 prisma/dev.db
sqlite> select * from user;
```

```
1|alice-1659767646486@example.com|あああ|1659767646587|1659767646587
2|alice-1659767649969@example.com|あああ|1659767650013|1659767650013
3|alice-1659767659377@example.com|あああ|1659767659418|1659767659418
```
