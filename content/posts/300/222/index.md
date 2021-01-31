---
title: "CentOS で スマートにプロキシを設定する"
path: "/entry/222"
date: "2021-01-29 21:00"
coverImage: "../../../images/thumbnail/linux-logo.png"
author: "s-yoshiki"
tags: ["curl","centos","linux","red-hat","gnu-bash"]
---

## 概要

CentOSでプロキシを通す設定のメモです。

プロキシ環境で yum/dnf でリポジトリを更新する場合や、curl/wget などで外部接続する際に必要となる設定です。

次の環境を対象としています。

 - CentOS8
 - Bash


## コマンドライン上で通す

`export`で環境変数にプロキシを通す場合、

```bash
export http_proxy="http://proxy.example.com:8080/"
export https_proxy="http://proxy.example.com:8080/"
export ftp_proxy="http://proxy.example.com:8080/"
export HTTP_PROXY="http://proxy.example.com:8080/"
export HTTPS_PROXY="http://proxy.example.com:8080/"
export FTP_PROXY="http://proxy.example.com:8080/"
export no_proxy=".example.co.jp,hoge-host"
```

と宣言します。

http_proxyはhttp用、https_proxyはhttps用、ftp_proxyはftp用といった具合です。

no_proxy にはプロキシを利用しないで接続するホスト名を定義します。

HTTP_PROXY のように大文字でも定義しているのは小文字の環境変数を読み取れないアプリケーションのための設定です。

認証付きのプロキシの場合は

```bash
export http_proxy="http://username:password@proxy.example.com:8080/"
# username: ユーザ名
# password: パスワード
```

のように設定します。

## よりスマートに設定する

全てのプロキシ用変数が同じ接続先であれば次のような記述もできます。

```bash
export http_proxy="http://proxy.example.com:8080/"
export https_proxy=${http_proxy}
export ftp_proxy=${http_proxy}
export HTTP_PROXY=${http_proxy}
export HTTPS_PROXY=${http_proxy}
export FTP_PROXY=${http_proxy}
```

## 設定ファイルに記述

`~/.bash_profile` に定義しておくことでログイン時に毎回設定されます。