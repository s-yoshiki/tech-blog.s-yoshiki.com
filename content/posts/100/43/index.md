---
title: "NGINX UnitをUbuntuに導入。PHPを動かす"
path: "/entry/43"
date: "2018-09-12 01:08:34"
coverImage: "../../../images/thumbnail/nginx-logo.png"
author: "s-yoshiki"
tags: ["nginx","unit","php"]
---

## 概要

Ubuntu 18.04にNGINX Unitを導入し、PHPを動かしてみる。

## 環境

- Ubuntu 18.04
- PHP7
- NGINX Unit 1.3

## NGINX Unitについて

### about

<blockquote>
NGINX Unit is a dynamic web and application server, designed to run applications in multiple languages. Unit is lightweight, polyglot, and dynamically configured via API. The design of the server allows reconfiguration of specific application parameters as needed by the engineering or operations.
Current latest version is 1.3, released on July 13, 2018.

See the changelog here: unit.nginx.org/CHANGES.txt.

The sources are distributed under the Apache 2.0 license.
引用 - https://unit.nginx.org

</blockquote>
と言ってます。つまり
NGINX Unitは複数の言語でアプリケーションを実行できるように設計されたWebおよびアプリケーションサーバであり、

軽量で、APIを介して動的に設定を変更できるのが大きな特徴ということでしょうか
https://unit.nginx.org/

### 言語

Python、PHP、Go、Perl、Ruby、が利用可能であり、将来的にはJavaScript/Node.js、Javaが利用できるそう。

## 結論

先に結論から言うと、楽しかったです。ただ、導入はもう少し後かなと思いました。

情報量がまだまだ少ないかなぁと感じます。
また、Pythonも試しましたが、特別な理由がない限りgunicornやuWSGIを利用した方が良いと言う話もあります。
https://tokibito.hatenablog.com/entry/2018/04/25/045009
ただ、あらゆる言語を同じ設定、同じコマンドを利用して、サーバ立ち上げから、デーモン、設定の反映と再構成を行えることはとても魅了的だと思いました。
近いうちにNodeJS対応とかがあるらしいので、それを待って見るかな...思いました。

## セットアップ

公式に基づいて導入していきます。
https://unit.nginx.org/installation/

### NGINXサインインキーの登録

これを落としてきます。

<a href="https://nginx.org/keys/nginx_signing.key?">https://nginx.org/keys/nginx_signing.key?</a>
※リンク切れしていたら<a href="https://unit.nginx.org/installation/">この中に</a>あると思うので探してください。
以下のコマンドで登録します。

```
apt-key add nginx_signing.key
```

### リポジトリ取得の設定

Ubuntuのバージョンに合わせて

```
/etc/apt/sources.list.d/unit.list
```

に、

以下の内容を記述します。

16.04の場合

```
deb https://packages.nginx.org/unit/ubuntu/ xenial unit
deb-src https://packages.nginx.org/unit/ubuntu/ xenial unit
```

17.10の場合

```
deb https://packages.nginx.org/unit/ubuntu/ artful unit
deb-src https://packages.nginx.org/unit/ubuntu/ artful unit
```

18.04の場合

```
deb https://packages.nginx.org/unit/ubuntu/ bionic unit
deb-src https://packages.nginx.org/unit/ubuntu/ bionic unit
```

記述が追記できたら更新した後、Unitをインストールします。

```
apt update
apt install unit
```

続いてモジュール類をインストールします。

php以外のpythonやperlなどを利用する場合はこのようパッケージ名で取得できます。

```shell
apt install unit-php \ 
            unit-python2.7 \
            unit-python3.6 \
            unit-go1.9 \
            unit-go1.10 \
            unit-perl \
            unit-ruby
```

カーネルが古い状態でインストールすると不具合が発生したので注意が必要かもしれません。

https://tech-blog.s-yoshiki.com/2018/09/517/

## Unitの開始

とりあえずスタートはこれ。

```
service unit start
```

その他にもこのようなコマンドが用意されてます。statusはよく使うと思います。

```
force-reload
loadconfig
reload
restart
saveconfig
status
stop
```

また、socketファイルは

```
/var/run/control.unit.sock
```

logは

```
/var/log/unit.log
```

にあります。
サーバーに構成が正しく反映されなかった場合はlogに何かしら吐かれると思います。

## アプリケーションの準備と設定

とりあえずPHPのHelloWorldを準備します。

```shell
mkdir -p /var/www/app/
cd /var/www/app/
touch index.php
```

index.phpを編集します。

```php
<?php
echo("Hello World");
```

そしたら適当なディレクトリにserver.jsonを作成します。

server.jsonは下記のように編集します。

```json
{
  "listeners": {
    "*:8300": {
      "application": "php-app"
    }
  },
  "applications": {
    "php-app": {
      "type": "php",
      "processes": {
        "max": 10,
        "spare": 5
      },
      "root": "/var/www/app",
      "index": "index.php"
    }
  }
}
```

最後に設定ファイルをcurlでPUTすることでサーバに反映されます。

```
curl -X PUT -d @./server.json --unix-socket /var/run/control.unit.sock http://localhost
```

curlで--unix-socketが利用できない場合はこちらを参照してください。
https://tech-blog.s-yoshiki.com/2018/09/514/
設定に関する部分は公式で丁寧に説明されてます。
https://unit.nginx.org/configuration/

## 他

良さそうなデモがあったので置いときます。

<iframe width="650px" height="450" src="https://www.youtube.com/embed/I4IWEz2lBWU" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen=""></iframe>

## 参考

https://dev.classmethod.jp/server-side/python/nginxunit-gunicorn-uwsgi/