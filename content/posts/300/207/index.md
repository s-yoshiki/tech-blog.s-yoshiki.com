---
title: "centos-streamのDockerコンテナイメージを作成した"
path: "/entry/207"
date: "2020-12-13"
coverImage: "../../../images/thumbnail/centos-logo.png"
author: "s-yoshiki"
tags: ["centos","red-hat", "centos-stream"]
---

## 概要

centos-streamのDockerコンテナイメージを作成しました。

## 背景

CentOS8からCentOS Streamに移行する方法が公式に掲載されていたので、こちらを参考にしてDockerコンテナを作成してみました。内容的にはdnfコマンドを3行実行しているだけです。

[Q7: How do I migrate my CentOS Linux 8 installation to CentOS Stream?](https://centos.org/distro-faq/#q7-how-do-i-migrate-my-centos-linux-8-installation-to-centos-stream)

> Q7: How do I migrate my CentOS Linux 8 installation to CentOS Stream?
> A: Instructions to convert from the CentOS Linux 8 distribution to CentOS Stream 8 are published at > https://www.centos.org/centos-stream/ and are also below for your convenience.
>
> root@centos-linux# dnf install centos-release-stream
>
> root@centos-linux# dnf swap centos-{linux,stream}-repos
>
> root@centos-linux# dnf distro-sync
>
> root@centos-stream# cat /etc/centos-release
> CentOS Stream release 8
> This will result in some package updates and new packages being installed, which is expected.

## centos-stream コンテナのビルド & インストール

次のリポジトリを利用します。

https://github.com/s-yoshiki/docker-centos-stream

```shell
git clone https://github.com/s-yoshiki/docker-centos-stream.git
cd docker-centos-stream
```

次のコマンドでビルドします。

```shell
docker-compose up -d --build
```

イメージの確認。

```shell
docker images
# REPOSITORY                   TAG              IMAGE ID       CREATED          SIZE
# s-yoshiki/centos-stream      latest           228b6afad187   21 minutes ago   415MB
```

Bashの実行

```shell
docker run -i -t -h centos-stream s-yoshiki/centos-stream:latest /bin/bash
cat /etc/redhat-release 
# CentOS Stream release 8
```

## 参考にしたところ

[CentOS Stream](https://www.centos.org/centos-stream/)

[CentOS Streamへのシフトでうろたえないための手引き](https://zenn.dev/koduki/articles/26eb2df8109a39)

[CentOS Streamに関してまとめてみました（2020年12月現在）](https://www.clara.jp/media/?p=6989)

[FAQ - CentOS Project shifts focus to CentOS Stream](https://centos.org/distro-faq/)
