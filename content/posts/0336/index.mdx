---
title: "ブラウザで使える開発者向けツール集「DevToys Web」を公開しました"
path: "/entry/336"
date: "2026-07-24 12:00"
coverImage: "../../../images/thumbnail/typescipr-logo.png"
author: "s-yoshiki"
tags: ["devtoys", "webツール", "next.js", "typescript", "javascript", "amazon-aws"]
---

## 概要

開発中に必要になる変換、整形、生成、検証などの小さな作業を、ブラウザ上ですぐに実行できる
「DevToys Web」を公開しました。

- [DevToys Web（日本語版）](https://devtoys.ex-foundry.com/ja/)
- [GitHubリポジトリ](https://github.com/s-yoshiki/DevToysWeb)

インストールやアカウント登録は不要です。PCへ専用アプリを導入しにくい環境でも、Webブラウザ
さえあれば利用できます。

![DevToys Webの日本語トップページ](/images/thumbnail/devtoys-web.jpg)

## DevToys Webとは

DevToys Webは、開発者が日常的に使う小さなユーティリティを1つのサイトへまとめたWeb
アプリケーションです。

2022年に[Next.jsで作成したDevToys風Webアプリ](/entry/262)を刷新し、現在は12カテゴリ、
全74種類のツールを日本語・英語で提供しています。

トップページの検索欄やカテゴリから目的のツールを選べるほか、`⌘K`または`Ctrl+K`で
コマンドパレットを開いて、ツール名やキーワードから素早く移動できます。ライト・ダーク
テーマ、最近使ったツールの表示、作業領域の最大化にも対応しています。

## 主なツール

すべてを紹介すると長くなるため、ここでは代表的なものを挙げます。

| カテゴリ | ツールの例 |
| --- | --- |
| 変換 | cURL・コード変換、JSON ↔ CSV、YAML ↔ JSON、基数・単位・Unix時間変換 |
| エンコード | Base64、URL、HTMLエスケープ、JWT署名検証、HMAC生成 |
| 整形 | JSON、SQL、XML、YAML、CSS、HTML |
| 生成 | UUID・ULID、テストデータ、パスワード、ハッシュ、QRコード |
| テスト | JavaScript・TypeScript実行、正規表現、JSONPath・Schema、XPath、glob |
| テキスト | 文字化け復元、ケース変換、Diff、Markdownプレビュー、Mermaidエディタ |
| 画像 | リサイズ・圧縮、形式変換、PNG透過、HEIC変換、EXIF確認・削除 |
| ネットワーク | サブネット・CIDR計算、URL解析、DNS・TLS・HTTP診断、WHOIS、SEOチェック |

このほかにも電卓、タイマー、世界時計、Google・GitHub・Gmailの検索条件ビルダー、
カメラや位置情報など、用途の異なるツールをまとめています。

## 使い方

基本的な使い方は、目的のツールを開いて入力欄へ値を貼り付けるだけです。

たとえばJSON整形では、圧縮されたJSONを入力すると読みやすい形式へ整形できます。Base64や
URLのエンコード・デコード、YAMLとJSONの相互変換なども、同じように入力と結果を並べて確認し、
結果をコピーボタンで取得できます。

ツールごとに独立したURLがあるため、よく使うページをブックマークしたり、チーム内でリンクを
共有したりする使い方もできます。

## ブラウザ内で完結する処理

文字列の変換や整形、画像処理など、多くの機能はブラウザ内で実行します。入力したデータを
変換のたびにサーバーへ送らずに利用できるため、待ち時間が少なく、手元のデータを扱いやすい
構成です。

一方、DNS・TLS・HTTP診断、WHOIS、OGP・SEOチェック、JWT署名検証など、外部アクセスや
サーバー側の処理が必要な機能はAPIを利用します。秘密情報を含むデータを扱う場合は、各ツールの
性質を確認したうえで利用してください。

## 技術構成

DevToys Webは、次のような構成で開発しています。

- フロントエンド: Next.js App Router、React、TypeScript
- UI: Tailwind CSS、shadcn/ui
- API: Hono、AWS Lambda
- ホスティング: Amazon S3、CloudFront
- インフラ管理: AWS CDK
- モノレポ管理: pnpm、Turborepo

フロントエンドは静的サイトとして出力し、S3とCloudFrontから配信しています。サーバー処理が
必要な機能だけをLambda APIへ分離することで、多くのツールを軽量なクライアントサイド処理
として提供しています。

ソースコードはGitHubで公開しています。不具合報告や新しいツールの提案があれば、Issueや
Pull Requestからお知らせください。

## まとめ

DevToys Webは、形式変換のために毎回スクリプトを書いたり、用途ごとに別のサイトを探したり
する手間を減らすための道具箱です。

日々の開発で「少しだけ変換したい」「すぐに確認したい」という場面があれば、ぜひ
[DevToys Web](https://devtoys.ex-foundry.com/ja/)を試してみてください。
