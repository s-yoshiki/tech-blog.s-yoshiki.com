---
title: "CentOS8 に Oracle12.2 clientをインストールする"
path: "/entry/232"
date: "2021-03-07 21:00"
coverImage: "../../../images/thumbnail/centos-logo.png"
author: "s-yoshiki"
tags: ["oracle","centos", "red-hat"]
---

## 概要

CentOS8 に Oracle12.2 clientをインストールした際の記録です。

### 実施した環境

- CentOS Linux release 8.3.2011 (docker)

## セットアップ

### clientツールの 準備

[https://www.oracle.com/jp/database/technologies/instant-client/linux-x86-64-downloads.html](Linux x86-64用Instant Client（64ビット） | Oracle 日本)

Linux x86-64（64ビット） 用Instant Clientダウンロードのページからclientツールをダウンロードできます。

```sh
$ ls
oracle-instantclient12.2-basic-12.2.0.1.0-1.x86_64.rpm
oracle-instantclient12.2-sqlplus-12.2.0.1.0-1.x86_64.rpm
```

### インストール

インストールするrpmを用意したら次のコマンドでインストールします。

```
rpm -ivh oracle-instantclient12.2-basic-12.2.0.1.0-1.x86_64.rpm
rpm -ivh oracle-instantclient12.2-sqlplus-12.2.0.1.0-1.x86_64.rpm
```

この作業を行う際に`libaio`が依存関係で必要になったためインストールを行いました。

```
dnf install -y libaio libnsl
```

### 環境変数にパスを通す

インストール完了後 `sqlplus64` を実行すると次のようなエラーがでます。

> sqlplus64: error while loading shared libraries: libsqlplus.so: cannot open shared object file: No such file or directory

対策としてはldconfigにパスを追加する もしくは LD_LIBRARY_PATH に追記を行うことで対応します。

**ldconfigの場合**

```
echo "/usr/lib/oracle/12.2/client64/lib" > /etc/ld.so.conf.d/oracle-instantclient12.2-sqlplus-12.2.0.1.0-1.x86_64.conf
ldconfig
```

**LD_LIBRARY_PATHの場合**

```
export LD_LIBRARY_PATH=/usr/lib/oracle/12.2/client64/lib:$LD_LIBRARY_PATH
```

## 実行

上記の作業が済んだらsqlplusを実行して起動すれば完了です。

```
sqlplus64

SQL*Plus: Release 12.2.0.1.0 Production on Sun Mar 7 09:25:38 2021

Copyright (c) 1982, 2016, Oracle.  All rights reserved.
```

## libnsl.so.1: cannot open shared object file と表示される場合

> sqlplus64: error while loading shared libraries: libnsl.so.1: cannot open shared object file: No such file or directory

のようなエラーメッセージが出た場合はlibnslをインストールします。

```
dnf install libnsl
```

[libnsl.so.1が無い場合 - Qiita](https://qiita.com/tukiyo3/items/b0343c14d7fa9c60156a)
