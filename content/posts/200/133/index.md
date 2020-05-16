---
title: "docker コンテナとホストでディレクトリをマウントしてファイル共有"
path: "/entry/133"
date: "2019-06-10 22:21:28"
coverImage: "../../../images/thumbnail/docker-logo.png"
author: "s-yoshiki"
tags: ["linux","開発環境","docker","docker-ce"]
---

## 概要

dockerのコンテナとホストマシンの間でディレクトリをマウントしてファイル共有する方法

## コマンド

```shell
docker run -v [ホストマシンの絶対パス]:[コンテナの絶対パス] [イメージ名] [コマンド]
```

例

```shell
docker run -v /path/to/workspace:/lib/modules my-image /bin/bash
```
