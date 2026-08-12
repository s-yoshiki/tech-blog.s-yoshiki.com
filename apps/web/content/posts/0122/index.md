---
title: "Ubuntuにnパッケージでnode.js環境をセットアップする"
path: "/entry/122"
date: "2019-05-06 20:50:31"
coverImage: "../../../images/thumbnail/nodejs-logo.webp"
author: "s-yoshiki"
tags: ["ubuntu","node.js","npm","n","nvm"]
---

## 概要

Ubuntuにnode.js環境をセットアップする方法です。
aptで入れようとするとバージョンが古かったり、コマンドがnodejsだったり色々と面倒なので、
nパッケージを使ってセットアップを行います。

他にもnvmを使ったりする方法もあります。

## 検証環境

Ubuntu14.04

## nodejs npm のインストール

aptでnode npmをインストールします。ただこれは一時的なもので最終的には削除します。

```shell
$ sudo apt install nodejs npm
```

続いてnパッケージをインストールします。
グローバルの方にインストールします。
ここでTLS関連のエラーが出た場合、オプションを変更したらインストールされました。
具体的な対処方については、次の章に記載しています。

```shell
$ sudo npm install n -g
```

インストールが完了したら、利用可能なバージョンを選択します。

```shell
$ sudo n stable
```

インストールに利用したらnodejs npmは不要になるので削除します。

```shell
$ sudo apt purge -y nodejs npm
$ exec $SHELL -l
```

これで完了です。

```shell
$ node -v
v10.15.3
$ npm -v
6.4.1
```

## TLSエラーの回避

nパッケージのインストールの際に次のようなエラーが出てきました。

**CERT_UNTRUSTED**

```shell
$ npm install n -g
npm http GET https://registry.npmjs.org/n
npm http GET https://registry.npmjs.org/n
npm http GET https://registry.npmjs.org/n
npm ERR! Error: CERT_UNTRUSTED
npm ERR!     at SecurePair.<anonymous> (tls.js:1370:32)
npm ERR!     at SecurePair.EventEmitter.emit (events.js:92:17)
npm ERR!     at SecurePair.maybeInitFinished (tls.js:982:10)
npm ERR!     at CleartextStream.read [as _read] (tls.js:469:13)
npm ERR!     at CleartextStream.Readable.read (_stream_readable.js:320:10)
npm ERR!     at EncryptedStream.write [as _write] (tls.js:366:25)
npm ERR!     at doWrite (_stream_writable.js:223:10)
npm ERR!     at writeOrBuffer (_stream_writable.js:213:5)
npm ERR!     at EncryptedStream.Writable.write (_stream_writable.js:180:11)
npm ERR!     at write (_stream_readable.js:583:24)
npm ERR! If you need help, you may report this log at:
npm ERR!     <http: github.com="" isaacs="" npm="" issues="">
npm ERR! or email it to:
npm ERR!     <npm-@googlegroups.com>

npm ERR! System Linux 3.13.0-125-generic
npm ERR! command "/usr/bin/nodejs" "/usr/bin/npm" "install" "n" "-g"
npm ERR! cwd /home/hoge
npm ERR! node -v v0.10.25
npm ERR! npm -v 1.3.10
npm ERR! Error: EACCES, open 'npm-debug.log'
npm ERR!  { [Error: EACCES, open 'npm-debug.log'] errno: 3, code: 'EACCES', path:'npm-debug.log' }
npm ERR!
npm ERR! Please try running this command again as root/Administrator.

npm ERR! System Linux 3.13.0-125-generic
npm ERR! command "/usr/bin/nodejs" "/usr/bin/npm" "install" "n" "-g"
npm ERR! cwd /home/hoge
npm ERR! node -v v0.10.25
npm ERR! npm -v 1.3.10
npm ERR! path npm-debug.log
npm ERR! code EACCES
npm ERR! errno 3
npm ERR! stack Error: EACCES, open 'npm-debug.log'
npm ERR!
npm ERR! Additional logging details can be found in:
npm ERR!     /home/hoge/npm-debug.log
npm ERR! not ok code 0
```

対処法としてはSSLの検証を行わせないようにします。

```shell
$ npm config set strict-ssl false
# npm install n -g # インストールしたいパッケージ
$ npm config set strict-ssl true
```

## 参考

<a href="https://blog.yug1224.com/archives/563d9b67bf652a600632d01e/">https://blog.yug1224.com/archives/563d9b67bf652a600632d01e/</a>

<a href="https://qiita.com/tsuyoshi_cho/items/adc23ec6aa3e74678597">https://qiita.com/tsuyoshi_cho/items/adc23ec6aa3e74678597</a>

<a href="https://askubuntu.com/questions/426750/how-can-i-update-my-nodejs-to-the-latest-version">https://askubuntu.com/questions/426750/how-can-i-update-my-nodejs-to-the-latest-version</a>

<a href="http://dekokun.github.io/posts/2014-01-01.html">http://dekokun.github.io/posts/2014-01-01.html</a>
