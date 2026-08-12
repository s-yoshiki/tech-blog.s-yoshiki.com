---
title: "GitLab.com のコンテナレジストリで1つのプロジェクトに複数のDockerイメージをpushする"
path: "/entry/238"
date: "2021-05-18 23:59"
coverImage: "../../../images/thumbnail/gitlab-logo.png"
author: "s-yoshiki"
tags: ["git", "gitlab", "docker"]
---

## 概要

GitLab.com のコンテナレジストリで1つのプロジェクトに複数のDockerイメージをpushする方法についてのメモです。

## 手順

まず、gitlab.comにて適当なリポジトリを1つ作成します。

今回は `https://gitlab.com/foo/bar` というリポジトリを作成したとします。

そしたらローカル作業に移ります。`registry.gitlab.com` にログインします。

```shell
docker login registry.gitlab.com
```

ビルドするための適当なDockerfileを作成します。

```dockerfile
# test image
FROM alpine:latest
```

ここでビルドする際に次のようにパスを変更することで複数のイメージをpushできます。

```shell
# rootにイメージを作成する場合
docker build -t registry.gitlab.com/foo/bar .
# foo/bar/AAA イメージを作成する
docker build -t registry.gitlab.com/foo/bar/AAA .
# foo/bar/AAA/BBB イメージを作成する
docker build -t registry.gitlab.com/foo/bar/AAA/BBB .
```

次のようにローカルでイメージが作成されます。

```shell
REPOSITORY                           TAG         IMAGE ID       CREATED        SIZE
registry.gitlab.com/foo/bar          latest      ba13aa9b24ae   5 months ago   5.57MB
registry.gitlab.com/foo/bar/AAA      latest      ba13aa9b24ae   5 months ago   5.57MB
registry.gitlab.com/foo/bar/AAA/BBB  latest      ba13aa9b24ae   5 months ago   5.57MB
```

pushする際も同様にパスを変更することで対応できます。

```shell
# rootにイメージを作成する場合
docker push registry.gitlab.com/foo/bar
# foo/bar/AAA イメージをpushする
docker push registry.gitlab.com/foo/bar/AAA
# foo/bar/AAA/BBB イメージをpushする
docker push registry.gitlab.com/foo/bar/AAA/BBB
```

GitLab.comのコンテナレジストリに反映されていればOK。
