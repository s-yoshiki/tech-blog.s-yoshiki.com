---
title: "aptで取得したNginx Unitを利用すると「Memory allocation failed」が発生する on Ubuntu 14.04"
path: "/entry/41"
date: "2018-09-10 01:32:15"
coverImage: "../../../images/thumbnail/no-image.png"
author: "s-yoshiki"
tags: ["linux","ubuntu","nginx","unit"]
---

## 概要

今年の春に正式リリースされたNginx Unitを試してみたくWebに落ちてる情報を頼りにセットアップしたところMemory allocation failedが発生した。
https://unit.nginx.org/

## 事象

こんな感じに設定ファイルを記述し、

```json
{
  "applications": {
    "test": {
      "type": "python 3",
      "processes": 2,
      "path": "/var/www/app1/app/app/",
      "module": "wsgi"
    }
  },

  "listeners": {
    "*:8400": {
      "application": "test"
    }
  }
}
```

curlを叩きます。

```
sudo curl -X PUT -d @server_env.json --unix-socket /var/run/control.unit.sock http://localhost/
```

これを実行すると

```json
{
  "error": "Memory allocation failed."
}
```

正しく実行される予定が、エラーとなってしまいました。
最初はcurlが原因かと推測しましたが、

どうやら違かったようです。
https://tech-blog.s-yoshiki.com/2018/09/514/

## 原因

簡潔にまとめると、利用していた環境がダメだったようです。
Unitのパッケージは標準の配布形式で配布されているようです。Debian系の基本的なカーネルのバージョンは4.9であり

memfd_create()をサポートしています。
ちなみに、利用しているカーネルのバージョンを確認すると。

```shell
$ uname -a
Linux vagrant-ubuntu-trusty-64 3.13.0-149-generic #199-Ubuntu SMP Thu May 17 10:12:50 UTC 2018 x86_64 x86_64 x86_64 GNU/Linux
```

と出てきました。
とりあえず対策として、

<ul>
<li>カーネルのバージョンを上げる</li>
<li>ソースからインストール</li>
</ul>
という選択肢があります。

が、カーネルのバージョンが低いことは他のシステムの構築を構築するときもにも同様の問題が発生する可能性があるので、

ソースからインストールせず、カーネルのバージョンをあげた方が良いのかもしれません。
https://github.com/nginx/unit/issues/111
という夢をみていました。

後日、ちゃんとセットアップした記事を書きます。以上、よろしく。
