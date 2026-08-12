---
title: "GitHub の CONTRIBUTING には何を書けばいいのか？"
path: "/entry/137"
date: "2019-06-21 00:10:53"
coverImage: "../../../images/thumbnail/git-logo.png"
author: "s-yoshiki"
tags: ["git"]
---

## はじめに

GitHubのOSSプロジェクトを見ているとリポジトリのルート直下に存在する CONTRIBUTING.md というファイルをよく目にします。
これは、OSSに対してコントリビュートする際に目を通すべきことが書かれているものです。

具体的にどんなことを書けば良いのかを調べてみました。

## CONTRIBUTING.mdを置く場所

GitHubは次の場所にあるCONTRIBUTINGファイルを認識します。

1. `.github/CONTRIBUTING.md`
2. リポジトリ直下の `CONTRIBUTING.md`
3. `docs/CONTRIBUTING.md`

複数ある場合は上の順で優先されます。認識されるとIssueやPull Requestの作成画面、リポジトリのContributeページなどからリンクされます。

## 最低限書いておきたい項目

- どの種類のIssueを受け付けるか、質問はどこでするか
- 作業前にIssueが必要か
- fork、branch、commit、Pull Requestの流れ
- 必要なランタイムやパッケージマネージャー
- 開発環境のセットアップと起動コマンド
- lint、format、test、buildの実行方法
- コーディング規約とコミットメッセージの規約
- Pull Requestに含める説明、スクリーンショット、テスト
- Code of Conduct、LICENSE、Security Policyへのリンク

## そのまま使える雛形

````markdown
# Contributing

ご協力ありがとうございます。作業を始める前に、既存のIssueとPull Requestを検索してください。

## 不具合報告

- 再現手順
- 期待する結果と実際の結果
- OS、ブラウザ、バージョン
- 必要に応じて最小の再現コード

セキュリティ上の問題は公開Issueにせず、SECURITY.mdの窓口へ連絡してください。

## 開発

```shell
npm ci
npm run dev
```

## Pull Request

1. 目的ごとに小さなbranchを作成する
2. `npm test` と `npm run lint` を実行する
3. 変更理由、確認方法、関連Issueを書く
4. UI変更にはBefore/Afterの画像を添付する

提出された変更は、このリポジトリのLICENSEの下で提供されるものとして扱います。
````

実際にはプロジェクト固有のコマンド、サポート対象、レビュー方針に置き換えてください。「全部守ってください」とだけ書くより、成功するPull Requestの具体例を示す方が参加者の迷いを減らせます。

## READMEとの役割分担

READMEは利用者向けに「何ができるか」「どう使うか」を説明し、CONTRIBUTINGは変更を提案する人向けに「どう開発・検証・提出するか」を説明します。報告フォームはIssue Template、脆弱性報告はSECURITY.md、行動規範はCODE_OF_CONDUCT.mdへ分け、CONTRIBUTINGから案内すると保守しやすくなります。

## サンプル

実際のプロジェクトも参考になります。

### js-primer

<a href="https://github.com/asciidwango/js-primer/blob/master/CONTRIBUTING.md">https://github.com/asciidwango/js-primer/blob/master/CONTRIBUTING.md</a>

(JS)ECMA2015以降の文法を体系的に学べるドキュメントのリポジトリの CONTRIBUTING です。

大項目を見ていくと...

- Issuesについて
- プルリクエストの方法
- 開発方法（開発サーバーの起動方法）
- テスト方法
- コミットメッセージの規約
- 書式・ディレクトリ構造・ルール
こんな内容が書かれています。

README にも被る内容が書かれていますが、
CONTRIBUTING は、コマンドやソースコードレベルのより具体的な内容に触れています。

## 参考

- [GitHub Docs: Setting guidelines for repository contributors](https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/setting-guidelines-for-repository-contributors)
- [GitHub Docs: Best practices for repositories](https://docs.github.com/en/repositories/creating-and-managing-repositories/best-practices-for-repositories)
