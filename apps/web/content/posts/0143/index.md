---
title: "多段SSHの設定 踏み台経由"
path: "/entry/143"
date: "2019-06-24 23:37:38"
coverImage: "../../../images/thumbnail/console-image.png"
author: "s-yoshiki"
tags: ["linux","ssh","mac","proxy","プロキシ","wsl","shell","踏み台"]
---

## 概要

踏み台を経由して多段SSHを行う際の設定についてのメモ。

## 設定

SSHの設定はMac/Linux/WSLであればホームディレクトリ下の~/.ssh/configに記述します。

### 基本的なconfigの記述

**フォーマット**

```shell
Host my-server # 接続時のエイリアス
    HostName my-server.example.com # ホスト名 or IP
    User step-user # ユーザ名
    Port 22 # 踏み台サーバのポート(省略すれば22)
    IdentityFile  ~/.ssh/keys/hoge.key # 秘密鍵(ローカルファイルのパスを書く)
```

**SSHコマンド**

```shell
$ ssh server1
```

### 基本的な踏み台経由のSSH設定

```shell
# 踏み台サーバの接続情報
Host step1
    HostName step-server1.server
    User step-user
    Port 22
    IdentityFile ~/.ssh/keys/hoge.key # 秘密鍵(ローカルファイルのパスを書く)

# 接続したいサーバの情報
Host private1
    HostName private-server1.server
    User user1
    Port 22
    IdentityFile ~/.ssh/keys/fuga.key # 秘密鍵(ローカルファイルのパスを書く)
    ProxyCommand ssh -W %h:%p step1 # 踏み台サーバのホスト名
```

以下のコマンドで接続

```shell
$ ssh private1
```

### プロキシを経由して踏み台に接続するSSH設定

```shell
# 踏み台サーバの接続情報
Host step1
    HostName step-server1.server
    User step-user
    Port 22
    IdentityFile ~/.ssh/keys/hoge.key
    ProxyCommand nc -X connect -x proxy.hoge.com:8080 %h %p

# 接続したいサーバの情報
Host private1
    HostName private-server1.server
    User user1
    Port 22
    IdentityFile ~/.ssh/keys/fuga.key
    ProxyCommand ssh -W %h:%p step1 # 踏み台サーバのホスト名
```

もしくは

```shell
# 踏み台サーバの接続情報
Host step1
    HostName step-server1.server
    User step-user
    Port 22
    IdentityFile ~/.ssh/keys/hoge.key
    ProxyCommand connect -H proxy.hoge.com:8080 %h %p

# 接続したいサーバの情報
Host private1
    HostName private-server1.server
    User user1
    Port 22
    IdentityFile ~/.ssh/keys/fuga.key
    ProxyCommand ssh -W %h:%p step1 # 踏み台サーバのホスト名
```

以下のコマンドで接続

```shell
$ ssh private1
```
