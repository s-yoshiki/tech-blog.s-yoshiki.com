---
title: "Headless CMS の Strapi をインストールからAPIエンドポイント作成"
path: "/entry/307"
date: "2023-03-12 18:30"
coverImage: "../../../images/thumbnail/node-logo.png"
author: "s-yoshiki"
tags: ["strapi", "javascript", "node.js", "typescript"]
---

## 概要

[Strapi - Open source Node.js Headless CMS 🚀](https://strapi.io/)

本記事では、OSS の Headless CMS である Strapi を使用して、API を構築した際の記録です。

1. Strapi のインストール
1. コレクションタイプの作成
1. フィールドの作成
1. コレクションタイプを API として公開する
1. API の動作確認

## starpi について

## 環境

- node: 18
  - 19 で動かしたらエラーとなりました

## インストール手順

1. Strapi をグローバルにインストールするために、以下のコマンドを実行します。

```
npm install -g strapi
```

もしくは

```
yarn global add strapi
```

2. Strapi アプリケーションを作成するために、以下のコマンドを実行します。

```
strapi new my-project
```

`my-project` の部分は任意のプロジェクト名に置き換えてください。

3. プロジェクトのルートディレクトリに移動し、以下のコマンドを実行します。

```
cd my-project
npm run develop
```

もしくは

```
cd my-project
yarn develop
```

これにより、Strapi が起動し、 `http://localhost:1337` でアクセスできるようになります。

## コレクションを作成する

次に、コレクションを作成します。
コレクションは、API エンドポイントに対応するデータベースのテーブルのようなものです。
API に公開したい情報に対応するコレクションを作成します。

1. Strapi 管理画面にログインし、左側のサイドバーから「COLLECTION TYPES」を選択します。

2. 「COLLECTION TYPES」のページで、「Create new collection type」ボタンをクリックして、新しいコレクションを作成します。

3. コレクションの名前を入力し、必要に応じて他のオプションを設定します。

4. 設定を保存すると、新しいコレクションが作成され、管理画面から使用できるようになります。

またオプションでは次のような設定が利用できます。

COLLECTION TYPES の設定であるコレーションタイプ(collation type)は、以下のオプションを持っています。

- BASIC SETTINGS:
  - Name: コレクションタイプの名前を入力します。この名前は、管理画面で表示されるための名前です。
  - Displayed name: コレクションタイプの表示名を設定します。この表示名は、フロントエンドの画面で表示される名前として使用されます。
  - API ID (Singular): API において、単数形で使用される識別子を設定します。
  - API ID (Plural): API において、複数形で使用される識別子を設定します。
- ADVANCED SETTINGS:
  - Draft & publish: コレクションタイプに対して、下書き機能や公開機能を有効にするかどうかを設定します。
  - Internationalization: コレクションタイプに対して、複数言語に対応するための設定を行います。この設定を有効にすると、複数の言語でコンテンツを作成することができます。

## Field の追加

1. コレクションを開き、左のサイドバーから「Builder」を選択します。
2. ページ上部の「Add another field」を選択します。
3. 追加するフィールドのタイプを選択します。例えば、テキストフィールド、画像フィールド、タグフィールド、日付フィールドなどがあります。
4. フィールドに名前を付けます。例えば、タイトル、本文、画像など。
5. 必要に応じてフィールドに説明を追加できます。
6. オプションで、フィールドのタイプに応じて、検証ルールを設定できます。例えば、必須フィールド、特定の形式のみを許可する、最大文字数など。
7. 「Save」ボタンをクリックして、フィールドを追加します。
8. もし必要なら、フィールドの表示順序を変更することもできます。「Builder」タブで、フィールドをドラッグアンドドロップして、並び順を変更します。
9. 全ての変更が完了したら、「Save」ボタンをクリックして、コレクションを保存します。

## API として公開する

1. 「Roles & Permissions」から、新規ロールを作成します。
2. 「Users」から、API を使用するユーザーを作成し、先に作成したロールを割り当てます。
3. 「Settings」→「Users & Permissions」→「Roles」で先程作成したロールを選択し、「Permissions」タブで、「Application」→「plugins」→「users-permissions」→「controllers」→「auth」→「auth.js」を選択して、「find」、「findone」、「count」の権限を許可します。
4. 「Settings」→「Users & Permissions」→「Roles」で先程作成したロールを選択し、「Permissions」タブで、先程作成したコレクションの API エンドポイントの権限を許可します。
5. 「Content-Type Builder」から、先程作成したコレクションの API を有効にします。

これで API エンドポイントを利用して、コレクションのデータを取得、作成、更新、削除などができます。

詳細は公式ドキュメントをご覧ください。

- [Welcome to the Strapi Developer Docs! | Strapi Documentation](https://docs.strapi.io/)

## 参考

- [strapi/strapi: 🚀 Strapi is the leading open-source headless CMS. It’s 100% JavaScript, fully customizable and developer-first.](https://github.com/strapi/strapi)
- [ヘッドレスCMSのメリットデメリット・比較おすすめ13選まとめ | 株式会社LIG(リグ)｜DX支援・システム開発・Web制作](https://liginc.co.jp/561849)
- [Headless CMS の Strapi を試してみた #strapi | DevelopersIO](https://dev.classmethod.jp/articles/headless-cms-strapi/)
- [Strapiでさくっとバックエンドをつくってみた | バスにっき](https://takabus.com/strapi/)