---
title: "Proxy環境下で快適に作業する設定メモ"
path: "/entry/108"
date: "2019-01-27 00:53:28"
coverImage: "../../../images/thumbnail/linux-logo.png"
author: "s-yoshiki"
tags: ["linux","curl","proxy","プロキシ","git","gnu-bash","zsh","wget"]
---

## 概要

社内Proxy(プロキシ)環境でネットワークに依存したアプリケーションを動かすためにはプロキシの設定を正しく適用する必要があります。
とりあえず、使用頻度が高いアプリケーションの設定メモを書き出します。

なお、この記事ではproxyのURLを

```
http://PROXY_URL
```

もしくは

```
https://PROXY_URL
```

と表現していますが、環境にあった適切なものを入力してください。

proxyのURLのフォーマットは基本的には

```
http://ユーザ名:パスワード@ホスト名:ポート番号
```

といった書式になると思います。

## 対象環境

Windows 10 + WSL (Ubuntu)
としていますが、下記の設定はMacおよびLinuxどの環境でも流用できる部分が多いかと思います。

## Linux / Unix 環境 + WSL環境

### bash / zsh

bashrcに以下のように記述します。
**~/.bashrc**

```shell
export http_proxy="http://PROXY_URL"
export https_proxy="http://PROXY_URL"
export ftp_proxy="http://PROXY_URL"
```

bashrcに記述した場合、アプリケーションによっては個別のproxy設定がいらなくなる場合があります。

### curl

設定ファイルに記述せず、コマンドで流す場合。

```shell
curl -x PROXY_URL -L url
```

コマンドに加え、ユーザ名が必要な場合

```shell
curl -U ユーザ名:パスワード -x PROXY_URL -L url
```

設定ファイルに記述する場合、以下の記述を追加します。

**~/.curlrc**

```
proxy = "http://PROXY_URL"'
proxy-user = "ユーザ名:パスワード"
```

<a href="http://namihira.hatenablog.com/entry/2013/12/29/170839">http://namihira.hatenablog.com/entry/2013/12/29/170839</a>

### wget

コマンドの場合は、

```shell
wget -e HTTP_PROXY=PROXY_URL http://example.com
```

設定ファイルに記述する場合は、以下のファイルに記述します。
**/etc/wgetrc**もしくは **~/.wgetrc**

```shell
proxy_user=ユーザ名
proxy_password=パスワード
http_proxy=http://PROXY_URL
https_proxy=http://PROXY_URL
```

/etc/wgetrcに記述した場合は全ユーザに適用されます。

<a href="https://blog.goo.ne.jp/dak-ikd/e/a5e50ee9a04a20ca3fce84ce11509f91">https://blog.goo.ne.jp/dak-ikd/e/a5e50ee9a04a20ca3fce84ce11509f91</a>

<a href="http://colorful-pico.hatenablog.jp/entry/20141128/1417183335">http://colorful-pico.hatenablog.jp/entry/20141128/1417183335</a>

### apt

設定ファイルに記述する場合は以下のようにします。

**/etc/apt/apt.conf**

```shell
Acquire::ftp::proxy "http://PROXY_URL";
Acquire::http::proxy "http://PROXY_URL";
Acquire::https::proxy "http://PROXY_URL";
```

### Git

コマンドから

```shell
git config --global http.proxy http://PROXY_URL
git config --global https.proxy http://PROXY_URL
```
