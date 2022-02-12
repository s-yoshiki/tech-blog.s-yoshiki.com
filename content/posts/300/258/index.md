---
title: "textlint と GitHub Actions でドキュメントの自動校正のCIを構築"
path: "/entry/258"
date: "2022-02-12 14:00"
coverImage: "../../../images/thumbnail/github-logo.png"
author: "s-yoshiki"
tags: ["linux","github","reviewdog","textlint"]
---

## 概要

GitHub で Markdownで管理しているブログに対して textlint で校正を行いレビューを自動化する CI を GitHub Actionsで構築しました。

## 利用する技術について 

### textlint

[textlint/textlint: The pluggable natural language linter for text and markdown.](https://github.com/textlint/textlint)

markdownで書いた文章について、表現の揺れや句読点、typoなどを機械的に抽出してくれるツールです。 

### GitHub Actionsについて

[Actions | GitHub](https://github.co.jp/features/actions)

GitHubで利用できるCI/CDサービスです。

GitHubリポジトリの`.github/workflows`ディレクトリ以下にワークフローを定義したファイルを配置しておくことでpushやプルリクをトリガーに定義したイベントを実行することができます。

### reviewdog

[reviewdog/reviewdog: 🐶 Automated code review tool integrated with any code analysis tools regardless of programming language](https://github.com/reviewdog/reviewdog)

プログラミング言語に依存しないコード分析と自動コードレビューが統合されたツールです。


## ワークフローの実装

`.github/workflows/textlint.yml` について次のように定義しました。

### ワークフロー

```yaml
name: textlint

on:
  push:
    branches:
      - develop
  pull_request:
    branches:
      - master

jobs:
  textlint:
    name: reviewdog
    runs-on: ubuntu-latest

    steps:
      - uses: reviewdog/action-setup@v1
        with:
          reviewdog_version: latest

      - uses: actions/setup-node@v2
      - uses: actions/checkout@v2

      - name: Install textlint
        run:  'npm install --save-dev textlint textlint-rule-max-ten textlint-rule-spellcheck-tech-word textlint-rule-no-mix-dearu-desumasu'

      # note: コンテンツが多すぎると exit code 1となる
      - name: Exec textlint
        run: |
          npx textlint --rule no-mix-dearu-desumasu --rule max-ten --rule spellcheck-tech-word ./ 2>&1 | tee ./.textlint.log

      # note: textlintで文章上のミスがあった場合のみ、reviewdogを実行
      - name: Run reviewdog
        if: failure()
        env:
          REVIEWDOG_GITHUB_API_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          cat .textlint.log | reviewdog -f=checkstyle -name="textlint" -reporter="github-pr-review"
```

### 説明

- ブランチ

develop への push、もしくは master へのプルリクのイベントの時にワークフローを実行する様にしています。

- textlintのセットアップ

```yaml
- name: Install textlint
  run:  'npm install --save-dev textlint textlint-rule-max-ten textlint-rule-spellcheck-tech-word textlint-rule-no-mix-dearu-desumasu'
```

でtextlintをセットアップしています。

ルールとして `textlint-rule-max-ten` `textlint-rule-spellcheck-tech-word` `textlint-rule-no-mix-dearu-desumasu` を利用しています。

- textlintの実行

```yaml
- name: Exec textlint
  run: |
    npx textlint --rule no-mix-dearu-desumasu --rule max-ten --rule spellcheck-tech-word ./ 2>&1 | tee ./.textlint.log
```

markdownファイルに対してtextlintで自動校正を行なっています。

- reviewdogの実行

```yaml
- name: Run reviewdog
  if: failure()
  env:
    REVIEWDOG_GITHUB_API_TOKEN: ${{ secrets.GITHUB_TOKEN }}
  run: |
    cat .textlint.log | reviewdog -f=checkstyle -name="textlint" -reporter="github-pr-review"
```

textlintでエラーがあった場合に、PRにレビューコメントを行います。


## リンク

- [GitHub ActionsでZennブログの校正を自動化してみた](https://zenn.dev/yuta28/articles/blog-lint-ci-reviewdog)
- [GitHub Actionsにreviewdogを飼ってみた！(eslint編)](https://dev.classmethod.jp/articles/shuntaka-github-actions-reviewdog/)
- [GitHub Actions + reviewdog で textlint を実行する](https://blog.chick-p.work/github-actions-reviewdog-textlint/)
