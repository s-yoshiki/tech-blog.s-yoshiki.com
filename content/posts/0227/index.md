---
title: "Gitにプロキシを設定する"
path: "/entry/227"
date: "2021-02-16 01:00"
coverImage: "../../../images/thumbnail/git-logo.png"
author: "s-yoshiki"
tags: ["git","github","gitlab","proxy"]
---

## 概要

Gitでプロキシを通しておくメモです。

## プロキシを設定する

以下のコマンドでproxyを通します。

※ `http://proxy.example.com:8080` がプロキシのURLとなります。

```shell
git config --global http.proxy http://proxy.example.com:8080
git config --global https.proxy http://proxy.example.com:8080
```

## 確認

以下のコマンドでプロキシが設定されたか確認できます。

```shell
git config --global --list | grep proxy
```

もしくは、ホームディレクトリ直下のファイルを直接閲覧します。

```shell
cat ~/.gitconfig
# [http]
#         proxy = http://proxy.example.com:8080
# [https]
#         proxy = http://proxy.example.com:8080
```
