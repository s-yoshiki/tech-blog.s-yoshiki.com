---
title: "SSHポートフォワーディングでリモートサーバ上のMySQLに安全にアクセスする。"
path: "/entry/48"
date: "2018-09-17 01:23:07"
coverImage: "../../../images/thumbnail/code.webp"
author: "s-yoshiki"
tags: ["linux","データベース","mysql","ssh","ポートフォワード"]
---

## 概要

Amazon LightsailのlocalhostのMySQLに対して安全に作業を行う手段の一つとして

SSHのポートフォワード機能を紹介します。

## 背景

Lightsailにwordpressサーバを建てた時の記事。
https://tech-blog.s-yoshiki.com/2018/02/27/
Lightsailのイメージの一つであるbitnami wordpressを選択するとlocalhostのMySQLを利用することになります。

このイメージではデフォルトでphpmyadminが利用できるようになっていますが、これを利用するのは正直イケてません。

それなら3306ポートを解放する！？これもイケてはいません。

sshで接続してCLIからクエリを投げるというのもアリだとは思いますが、やっぱりGUIが使えるなら使いたいと思います。
なので、SSHのポートフォワードを利用して、localhostにポートをトンネリングさせた上で、"MySQL Workbench"や"Sequel Pro"といったGUIクライアントを接続する方法を紹介したいと思います。
ちなみにMySQL WorkbenchにはデフォルトでSSHトンネリング機能が付属しています。

## SSHポートフォワード

このコマンドで行います。

```shell
ssh -f -N -C -L 3307:localhost:3306 username@hostname -p 22 -i ~/path/to/sshkey.pem 
```

オプションの説明
 - -f : バックグラウンド実行
 - -N : トンネリングを目的として利用する
 - -C : データを圧縮して通信
 - -L : マッピングの設定
 - -p : SSHのポート番号の指定
 - -i : sshキーのパス
-Lに関しては、 「3307:localhost:3306」の場合localhostの3307ポートをリモートの3306ポートにマッピングするという意味になります。
ローカルからは以下のコマンドで接続を確認することができます。

```shell
mysql -u root -p -h 127.0.0.1 --port=3307
```

## 参考

この辺りを参考にしました。
http://d.hatena.ne.jp/addition/20130506/1367813143
http://st-hakky.hatenablog.com/entry/2017/08/18/215944