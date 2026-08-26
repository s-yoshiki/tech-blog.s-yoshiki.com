---
title: "Prisma 7から8への変更点を整理する：データコントラクト・新しいクエリAPI・マイグレーション"
path: "/entry/339"
date: "2026-08-27 12:00"
coverImage: "../../../images/thumbnail/prisma-logo.png"
author: "s-yoshiki"
aiGenerated: true
tags: ["prisma", "typescript", "postgresql", "データベース", "マイグレーション"]
---

## 概要

Prisma 8は、Prisma 7の依存パッケージを更新するだけのメジャーアップデートではありません。
ORMの実行モデル、スキーマの成果物、クエリAPI、マイグレーションの仕組みがまとめて作り直されています。

この記事では、Prisma 7から8で何が変わるのかを整理します。最後に、既存のPrisma 7アプリケーションを
Prisma 8へ段階的に移行する流れも紹介します。

なお、この記事の情報は2026年8月27日時点のものです。現在のnpmでは、Prisma 7の安定版は
`7.9.1`、Prisma 8は `8.0.0-rc.10` が `next` タグで公開されています。Prisma 8は
Release Candidateのため、正式版まではAPIやパッケージ構成が変わる可能性があります。

## まず結論

Prisma 7と8の違いを一言で表すと、次のようになります。

| 観点 | Prisma 7 | Prisma 8 |
| --- | --- | --- |
| 中心となる成果物 | 生成されたPrisma Client | `contract.json` と `contract.d.ts` |
| スキーマ | `schema.prisma` | `contract.prisma` または `contract.ts` |
| クエリ | `findMany({ ... })` のような引数型API | `.where().select().include().all()` のチェーンAPI |
| 実行モデル | 生成クライアントとDriver Adapter | データコントラクトを読むTypeScriptランタイム |
| マイグレーション | 時系列のマイグレーションファイル | コントラクトハッシュをつなぐグラフ型マイグレーション |
| データベース | Prisma 7の既存サポート範囲 | PostgreSQL中心。MongoDBはEarly Access、SQLiteとMySQLは段階提供 |
| 移行方法 | パッケージ更新が中心 | Prisma 7と8を並行稼働して段階移行 |

Prisma 8へ移行すると、クエリの書き換えだけでなく、生成物とマイグレーションの運用も変わります。
そのため、既存アプリでは一括アップデートよりも、Prisma 7を残したまま一部の処理をPrisma 8へ移す方法が現実的です。

## Prisma 8はTypeScriptで作り直された

Prisma 7では、Driver Adapterを利用する生成クライアントが中心です。Prisma 7自体も、従来のRust製
ネイティブバイナリをアプリケーションへ持ち込まない方向へ進みました。

Prisma 8では、さらにORMの基盤全体をTypeScriptで再構築しています。PostgreSQLなどのデータベースや
SQLの機能を固定的に内包するのではなく、ターゲット、クエリビルダー、拡張機能を組み合わせる構成です。

この変更によって、Prisma 8では次のような拡張が同じ仕組みで提供されます。

- PostgreSQLやMongoDBなどのデータベースターゲット
- PostgreSQL向けの型安全なSQL Query Builder
- `pgvector`のようなデータベース拡張
- クエリログ、クエリ制限、テレメトリーなどのMiddleware
- モデルへ追加するドメイン固有のCollectionメソッド

Prisma 7で利用していた `@prisma/client` を、そのままPrisma 8のランタイムとして利用するわけではありません。
PostgreSQLの場合は、Prisma 8のファサードパッケージである `@prisma/orm-postgres` をアプリケーションへ追加します。

## スキーマからデータコントラクトへ変わる

### Prisma 7の生成クライアント

Prisma 7では、スキーマに `generator client` を定義し、`prisma generate` でアプリケーションから利用する
Prisma Clientを生成します。

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client"
  output   = "../generated/prisma"
}

datasource db {
  provider = "postgresql"
}

model User {
  id    Int    @id @default(autoincrement())
  email String @unique
  name  String?
}
```

アプリケーションは生成されたクライアントを読み込みます。

```ts
import { PrismaClient } from "./generated/prisma/client";

const prisma = new PrismaClient({ adapter });
const users = await prisma.user.findMany();
```

### Prisma 8のデータコントラクト

Prisma 8では、スキーマはアプリケーション、ランタイム、マイグレーションツールで共有する
「データコントラクト」になります。Prisma Schema Languageで書く場合は、たとえば次のような
`prisma/contract.prisma`を用意します。

```prisma
// prisma/contract.prisma
model User {
  id    Int    @id @default(autoincrement())
  email String @unique
  name  String?
}
```

`contract emit`を実行すると、次の2つのファイルが生成されます。

```text
prisma/
├── contract.prisma  # 編集するソース
├── contract.json    # 機械可読なデータコントラクト
└── contract.d.ts    # TypeScriptの型定義
```

```sh
npx prisma@next contract emit
```

`contract.json`にはモデル、フィールド、リレーション、制約、対応機能、コントラクトのハッシュなどが含まれます。
`contract.d.ts`はクエリAPIとアプリケーションの型チェックに使われます。

この成果物は単なる一時ファイルではありません。同じソースからは同じ内容が生成されるため、Gitの差分として
レビューできます。また、コントラクトのハッシュをデータベース側のマーカーと比較することで、アプリケーションが想定する
コントラクトと実際のデータベースがずれていないかを確認できます。

### TypeScriptでコントラクトを書くこともできる

Prisma 8では、`contract.ts`にTypeScriptのContract Builderでモデルを定義する方法も追加されました。
PSLとTypeScriptのどちらを使っても、最終的に生成される `contract.json` と `contract.d.ts` は同じ形式です。

ただし、公式ドキュメントでは、通常は簡潔に書けるPSLを推奨しています。モデル定義を複数のパッケージから合成したい場合や、
TypeScriptの静的な定義を再利用したい場合に、TypeScriptによるコントラクト定義が適しています。

## クエリAPIは引数型からチェーン型へ変わる

Prisma 7では、1つのオブジェクトへ条件、取得フィールド、リレーション、ページングをまとめます。

```ts
// Prisma 7
const users = await prisma.user.findMany({
  where: {
    email: { contains: "@example.com" },
  },
  include: {
    posts: true,
  },
  take: 20,
});
```

Prisma 8では、モデルをCollectionとして扱い、処理をメソッドチェーンで組み立てます。
PostgreSQLのデフォルトスキーマは `public` なので、モデルは `db.orm.public.User` のように参照します。

```ts
// Prisma 8
const users = await db.orm.public.User
  .where((user) => user.email.ilike("%@example.com"))
  .include("posts")
  .take(20)
  .all();
```

Prisma 7の `findMany` は、Prisma 8では基本的に `.all()` へ対応します。`findFirst` や `findUnique` に相当する処理は
`.first()`を使います。

チェーン型になることで、クエリの共通処理をCollectionのメソッドとして切り出せます。

```ts
class PostCollection extends Collection<Contract, "Post"> {
  published() {
    return this.where({ published: true });
  }

  newestFirst() {
    return this.orderBy((post) => post.createdAt.desc());
  }
}

// PostCollectionをdbに登録済みとする
const posts = await db.Post
  .published()
  .newestFirst()
  .take(20)
  .all();
```

アプリケーション全体に散らばりがちな「公開済みだけ」「新しい順」といった条件を、モデルのドメインメソッドとして共有できます。

### クエリ結果をストリームとして処理できる

Prisma 8の読み取り結果は、通常の配列として受け取れるだけでなく、非同期イテレーターとしても利用できます。

```ts
for await (const post of db.orm.public.Post.all()) {
  await exportToSearchIndex(post);
}
```

`await`すれば全件を配列へ読み込み、`for await`を使えば1件ずつ処理できます。大量のレコードを扱うバッチ処理で、
全件をメモリへ保持せずに済む点が変更の大きなメリットです。

ただし、ストリームとして消費した結果は再利用できません。後から何度も使うデータは、最初に配列として取得します。

### SQL Query Builderも追加される

ORMのCollection APIでは表現しにくいJOIN、集計、データベース固有のSQLを使う場合は、PostgreSQL向けの
型安全なSQL Query Builderを利用できます。普段のモデル操作はORM、SQLに近い処理はQuery Builderという使い分けができます。

## マイグレーションは時系列からグラフへ変わる

Prisma 7のマイグレーションは、時系列ディレクトリの中にあるSQLを順番に適用する考え方です。

```text
prisma/migrations/
├── 20240101000000_create_user/
│   └── migration.sql
└── 20240201000000_add_profile/
    └── migration.sql
```

Prisma 8では、マイグレーションが「コントラクトの状態から別のコントラクトの状態へ移るエッジ」になります。
各マイグレーションは、開始状態のハッシュと終了状態のハッシュを持つため、時刻ではなくコントラクトの状態によってグラフが構成されます。

```text
H1 ── add email ──> H2 ── add index ──> H3
 \                 
  └─ add name ───> H4
```

複数のブランチで同時にスキーマを変更した場合も、単純なファイル名の順番ではなく、データベースが現在どのコントラクトにいるかを基準に
適用経路を判断できます。既存データベースを導入する際も、これまでのSQLをすべて再実行するのではなく、現在のコントラクトを
ベースラインとして採用できます。

### Prisma 8のマイグレーションワークフロー

Prisma 8では、次の流れでマイグレーションを作成します。

```sh
# 1. コントラクトを編集したあとに成果物を生成
npx prisma@next contract emit

# 2. 変更内容からマイグレーションを計画
npx prisma@next migration plan --name add_user_phone

# 3. 生成されたmigration.tsとDDLのプレビューを確認
npx prisma@next migration show <migration-directory>

# 4. データベースへ適用
npx prisma@next db migrate

# 5. コントラクトとデータベースの一致を確認
npx prisma@next db verify
```

`migration plan`はデータベースへ接続せず、リポジトリ上にマイグレーションを作成します。生成されたパッケージには、
主に次のファイルが含まれます。

```text
migrations/app/20260707T1006_add_user_phone/
├── migration.ts         # 人が編集するTypeScript
├── ops.json              # 実行されるコンパイル済み操作
├── migration.json       # 開始・終了コントラクトと履歴のメタデータ
├── start-contract.json  # 変更前のコントラクトスナップショット
└── end-contract.json    # 変更後のコントラクトスナップショット
```

Prisma 8では、手書きのSQLファイルを直接編集する代わりに `migration.ts` を編集します。TypeScriptとして型チェックできるため、
既存レコードのバックフィルや、スキーマ変更の前後に行う検査も同じマイグレーションへ組み込めます。

本番で実行されるのは、`migration.ts`からコンパイルされた `ops.json` です。マイグレーションの意図と実際に実行される操作を、
それぞれソースとJSONとしてレビューできます。

## Prisma 7から8へ段階的に移行する

公式のPostgreSQL向け移行ガイドでは、Prisma 7とPrisma 8を同じデータベースに接続し、ルート単位で段階的に移行します。
移行中もデータベースと接続文字列は変えません。

### 1. Prisma 7の名前を分離する

Prisma 8は `prisma` パッケージ、`prisma` バイナリ、`prisma.config.ts` を使います。
そのため、まずPrisma 7を専用の名前へ移します。

- パッケージを `@prisma/prisma7` としてインストールする
- CLIの呼び出しを `prisma7` へ変更する
- `prisma.config.ts` を `prisma7.config.ts` へ変更する
- Prisma 7のスキーマと生成クライアントは、Prisma 8とは別ディレクトリに置く

たとえば、Prisma 7のスクリプトは次のようになります。

```json
{
  "scripts": {
    "prisma7:generate": "prisma7 generate",
    "prisma7:migrate": "prisma7 migrate dev"
  }
}
```

この段階では、アプリケーションの動作やデータベースのマイグレーション方式を変えません。

### 2. Prisma 8を追加する

Release Candidateを試す場合は、Prisma 8のCLIとPostgreSQL向けランタイムを追加します。

```sh
npm install --save-dev prisma@next
npm install @prisma/orm-postgres
```

Prisma 8側では、Prisma 7とは別に `prisma.config.ts` と `prisma/contract.prisma` を用意します。
どちらのクライアントも同じ `DATABASE_URL` を使えますが、設定、コントラクト、生成物は分離します。

```text
Prisma 7                         Prisma 8
──────────────────────────       ──────────────────────────
prisma7.config.ts                prisma.config.ts
prisma/schema.prisma             prisma/contract.prisma
generated/prisma                 prisma/contract.json
@prisma/client                   @prisma/orm-postgres
```

### 3. 既存データベースからコントラクトを作る

Prisma 7が管理しているデータベースから、Prisma 8のコントラクトのたたき台を作成します。

```sh
npx prisma@next contract infer --output prisma/contract.prisma
npx prisma@next contract emit
npx prisma@next db sign
```

生成されたコントラクトは必ず確認します。公式の移行例では、次の点が注意事項として挙げられています。

- Prisma 7のマイグレーション台帳である `_prisma_migrations` をコントラクトから除外する
- 既存テーブル名とPrisma 8が参照する名前が異なる場合は `@@map` を追加する
- リレーション、制約、インデックスが実際のデータベースと一致しているか確認する

`db sign`は、既存データベースが生成したコントラクトと一致することを確認し、そのコントラクトハッシュをデータベースへ記録します。
既存のテーブルを作り直す処理ではありません。

### 4. ルートを1つずつ移す

ここから、たとえばユーザー取得APIだけをPrisma 8のクライアントへ切り替えます。投稿APIなど残りの処理はPrisma 7のまま動かせます。

```ts
import postgres from "@prisma/orm-postgres/runtime";
import type { Contract } from "./contract.d";
import contractJson from "./contract.json" with { type: "json" };

export const db = postgres<Contract>({
  contractJson,
  url: process.env.DATABASE_URL!,
});
```

Prisma 7とPrisma 8のクライアントを同じアプリケーションに置き、移行済みのルートだけを切り替える方法です。
各段階でアプリケーションを動かせるため、大きな一括書き換えを避けられます。

### 5. マイグレーションの所有権を移す

アプリケーションのルートを移し終えたら、Prisma 8へマイグレーションの管理を移します。

```sh
# 現在のデータベースの状態をベースラインとして記録
npx prisma@next migration plan --name baseline
npx prisma@next db sign
npx prisma@next migration ref set db <baseline-directory>
```

ベースラインのマイグレーションを既存データベースへ再適用してはいけません。既に存在するテーブルを作り直すのではなく、
`db sign`で現在の状態がベースラインと一致することを記録します。

この時点以降のスキーマ変更はPrisma 8の `contract emit`、`migration plan`、`db migrate` で管理します。
Prisma 7のクライアントを使うルートが残っていても、マイグレーションの所有者はPrisma 8に統一します。

### 6. Prisma 7を削除する

すべてのルートがPrisma 8を使うようになり、生成されたPrisma 7クライアントへの参照がなくなったら、Prisma 7を削除します。
Prisma 7が使っていた `_prisma_migrations` テーブルはPrisma 8からは無視されるため、必要に応じて後から整理できます。

## 移行前に確認したい互換性

### クエリの書き換えが必要

Prisma 8は、Prisma 7の `findMany` などをそのまま実行する互換レイヤーではありません。少なくとも次のような書き換えが必要です。

```text
prisma.user.findMany({ ... })
  ↓
db.orm.public.User.where(...).all()

prisma.user.findFirst({ ... })
  ↓
db.orm.public.User.where(...).first()

prisma.user.create({ data })
  ↓
db.orm.public.User.create(data)
```

ネストした `include` や `select` も、Prisma 8のチェーンAPIに合わせて組み直します。

### 対応データベースを確認する

Prisma 7で使えていたデータベースが、Prisma 8の初期リリースで同じように利用できるとは限りません。
現時点のPrisma 8はPostgreSQLを主要ターゲットとし、MongoDBはEarly Accessです。SQLiteは次の対応対象、MySQLは後続の対応とされています。
MySQL、SQL Server、CockroachDBなどを使っている場合は、Prisma 8へ移行する前に公式の対応状況を確認する必要があります。

### Release Candidateとして扱う

`prisma@next` は固定バージョンではありません。CIや本番環境で検証する場合は、ロックファイルをコミットし、実際に検証した
Prisma 8と各 `@prisma/*` パッケージのバージョンを揃えて固定します。

また、Prisma 8の移行ガイドではNode.js 22.18以上が前提になっています。TypeScriptの設定では、生成されたJSONを
`with { type: "json" }` で読み込むため、ESMとImport Attributesを扱える設定が必要です。

## どのプロジェクトがPrisma 8を試すべきか

現時点では、次のように判断するとよさそうです。

- 新しくPostgreSQLアプリケーションを作る場合：Prisma 8を検証する価値が高い
- `pgvector`、ストリーミング、型安全なSQL Query Builderを使いたい場合：Prisma 8の拡張性が活きる
- Prisma 7で安定稼働している本番アプリ：急いで一括移行せず、並行稼働で段階的に検証する
- MySQLなどPostgreSQL以外を使うアプリ：Prisma 8の対応状況を確認するまでPrisma 7を継続する

Prisma 8の最大の変更は、クエリの見た目ではなく、スキーマを中心にアプリケーションとデータベースを結びつける方法です。
`contract.json`を共有することで、クエリ、マイグレーション、データベース検証を同じコントラクトから実行できます。
既存システムではそのメリットと書き換えコストを比較し、まずは1つのルートから試すのが安全です。

## まとめ

Prisma 7から8への主な変更点は、次のとおりです。

- ORMの基盤がTypeScriptで再構築され、拡張を組み合わせる構成になる
- 生成クライアント中心の構成から、`contract.json` と `contract.d.ts` を中心とする構成になる
- `findMany`などの引数型APIから、Collectionのチェーン型クエリAPIへ変わる
- クエリ結果を配列だけでなくストリームとして処理できる
- マイグレーションが時系列のSQLファイルから、コントラクトハッシュをつなぐグラフへ変わる
- TypeScriptによるデータマイグレーションと、マイグレーション前後の検証ができる
- 既存アプリはPrisma 7と8を並行稼働させ、ルート単位で段階移行できる
- Prisma 8はRelease Candidateであり、対応データベースとAPIの安定性を確認して導入する必要がある

## 参考資料

- [What is Prisma 8? | Prisma Documentation](https://docs.prisma.io/docs/orm)
- [The Prisma 8 data contract | Prisma Documentation](https://docs.prisma.io/docs/orm/v8/contract-authoring/the-data-contract)
- [Reading data with Prisma 8 | Prisma Documentation](https://docs.prisma.io/docs/orm/fundamentals/reading-data)
- [How migrations work in Prisma 8 | Prisma Documentation](https://docs.prisma.io/docs/orm/migrations/how-migrations-work)
- [How to migrate a PostgreSQL project from Prisma 7 to Prisma 8 | Prisma Documentation](https://docs.prisma.io/docs/guides/upgrade-prisma-orm/postgresql)
- [The Next Evolution of Prisma ORM | Prisma Blog](https://blog.prisma.io/blog/the-next-evolution-of-prisma-orm)
- [Rethinking Database Migrations | Prisma Blog](https://blog.prisma.io/blog/rethinking-database-migrations)
- [prisma | npm](https://www.npmjs.com/package/prisma)
- [Prisma 7 and Prisma 8 Side by Side | GitHub](https://github.com/prisma/prisma8-and-7-example)
