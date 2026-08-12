---
title: "NextJSでDevToysのようなものを作成した"
path: "/entry/262"
date: "2022-02-22 00:01"
coverImage: "../../../images/thumbnail/next-logo.png"
author: "s-yoshiki"
tags: ["javascript","typescript","vercel","next.js","react"]
---

## 概要

最近、Windowsで動く開発系ツールアプリケーションとしてDevToysが注目されていました。

これに影響を受けて、NextJSを用いてブラウザ上で動くDevToysのようなものを作成しました。

https://dev-toys-web.vercel.app/

## 説明

- [DevToys](https://github.com/veler/DevToys)
- [DevToysMac](https://github.com/ObuchiYuki/DevToysMac)
- [DevBox](https://www.dev-box.app/)
- [DevUtils](https://devutils.app/)

にあるような開発で必要な便利系ツールにインスピレーションを受けて、Web版のクローンを作成しました。

本家の機能に追従しつつも、独自のツールも追加しています。(パスワード生成等)

## URL

https://dev-toys-web.vercel.app/

Vercelでホスティングしています。

## 機能

次のような機能を備えています。

- converters
  - angle
  - date
  - number_base
  - yaml2json
- encode_decode
  - base64
  - crypto
  - html
  - url
- formatters
  - json
  - sql
- generater
  - hash
  - password
  - uuid

また現在進行形で機能を追加しています。

各機能のポイントは別途説明したいと思います。

## リポジトリ

https://github.com/s-yoshiki/DevToysWeb
