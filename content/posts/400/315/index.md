---
title: "Prisma頻出コマンドとマイグレーションの運用"
path: "/entry/315"
date: "2023-06-28 16:30"
coverImage: "../../../images/thumbnail/prisma-logo.png"
author: "s-yoshiki"
tags: ["prisma", "typescript", "node.js", "javascript"]
---

## 概要

TypeScript の ORM である[Prisma](https://www.prisma.io/)について、
しばしば利用するコマンドを一覧にしました。

### 注意事項

参考にされる際には以下の点についてご留意いただいた上で、本家のドキュメントをご覧ください。

- DB によってはサポートしていないコマンドがあります。
- 破壊的な変更が発生するものがあります。

## コマンド一覧

### プロジェクト初期化に利用するコマンド

新しい Prisma プロジェクトをセットアップする

```sh
prisma init
# 利用するDBを指定できる
prisma init --datasource-provider sqlite
# 接続先(url)を指定できる
prisma init --url mysql://username:password@localhost:3306/mydb
```

バージョンを確認する

```sh
prisma version
# or
prisma -v
# jsonでもできます
prisma version --json
```

### 開発中に利用するコマンド

アーティファクトを生成する（例：Prisma クライアント）

```sh
prisma generate
# ./prisma/schema.prisma 以外のパスを指定できる
prisma generate --schema=./alternative/schema.prisma
# ファイルの変更を監視できる
prisma generate --watch
# 特定のジェネレータを指定して生成できる。複数も可能。
prisma generate --generator client --generator zod_schemas
```

Prisma スキーマを検証する

```sh
prisma validate
# ./prisma/schema.prisma 以外のパスを指定できる
prisma validate --schema=./alternative/schema.prisma
```

Prisma スキーマをフォーマットする

```sh
prisma format
# ./prisma/schema.prisma 以外のパスを指定できる
prisma format --schema=./alternative/schema.prisma
```

既存のデータベースからスキーマを取得し、Prisma スキーマを更新する

```sh
prisma db pull
# ./prisma/schema.prisma 以外のパスを指定できる
prisma db pull --schema=./alternative/schema.prisma
# ファイルではなく標準出力に結果を表示する
prisma db pull --print
# 強制オプション
prisma db pull --force
```

Prisma スキーマの状態をデータベースにプッシュする

```sh
prisma db push
# ./prisma/schema.prisma 以外のパスを指定できる
prisma db push --schema=./alternative/schema.prisma
# アーティファクト生成をスキップ
prisma db push --skip-generate
# データベースをリセットしてからスキーマを更新。
prisma db push --force-reset
# データが消える警告を無視。
prisma db push --accept-data-loss
```

[Seed](https://www.prisma.io/docs/guides/migrate/seed-database)を利用する。

```sh
prisma db seed
# パスの指定や接続先の指定も可能
prisma db seed --schema=./hoge/schema.prisma --url=mysql://username:password@localhost:3306/mydb
```

[prisma studio](https://www.prisma.io/studio)の起動。

```sh
prisma studio
# 8080ポートで起動
prisma studio --port 8080
```

### マイグレーションや運用作業で利用する

Prisma スキーマからマイグレーションを作成し、データベースに適用し、アーティファクトを生成する（例：Prisma クライアント）

```sh
# マイグレーションを実行する
prisma migrate dev
# マイグレーションのSQLの生成のみを行う
prisma migrate dev --create-only
# マイグレーション名を指定する
prisma migrate dev --name
# seedの適用をスキップする
prisma migrate dev --skip-seed
# generatorの利用をスキップする
prisma migrate dev --skip-generate
```

マイグレーションの解決

```sh
# マイグレーション名を指定して移行を適用済みにする
prisma migrate resolve --applied ”20201231000000_add_users_table”
# マイグレーション名を指定してロールバックする
prisma migrate resolve --rolled-back "20201231000000_add_users_table"
```

マイグレーション状況の確認

```sh
prisma migrate status
```

diff の取得

```sh
# diffを表示する
prisma migrate diff \
  --from-url "$DATABASE_URL" \
  --to-url "postgresql://login:password@localhost:5432/db2"
# diffをsqlとして書き出す
prisma migrate diff \
 --from-url "$DATABASE_URL" \
 --to-migrations ./migrations \
 --script > script.sql
```

マイグレーションのリセット (本番環境では利用するものではないと思われる)

```sh
# リセットを行う。
prisma migrate reset
# 警告をスキップ
prisma migrate reset --force
# generatorやseedをスキップ
prisma migrate reset --skip-generate --skip-seed
# ./prisma/schema.prisma 以外のパスを指定できる
prisma migrate reset --schema=./alternative/schema.prisma
```

SQL を実行する

```sh
# ファイルを指定してSQLを実行する
prisma db execute --file ./script.sql --schema schema.prisma
# 標準出力を利用してSQLを実行する
echo 'TRUNCATE TABLE dev;' | prisma db execute --stdin --url="mysql://username:password@localhost:3306/mydb"
```

## 個人的な運用方法

ステージング環境とプロダクション環境でマイグレーション履歴を同期することを前提に
次のような手順で管理するのが良いのかなと思います。

**ステージング**

```sh
# マイグレーションファイルを生成
prisma migrate dev --name migration1 --create-only
```

**プロダクション**

```sh
# マイグレーションファイルをプロダクション環境に適用
prisma migrate deploy
```

## 参考

[Prisma CLI Command Reference](https://www.prisma.io/docs/reference/api-reference/command-reference)
