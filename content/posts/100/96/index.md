---
title: "フラットファイルCMS「Grav」をドキュメントールート外にインストールする"
path: "/entry/96"
date: "2019-01-07 00:12:21"
coverImage: "../../../images/thumbnail/grav-logo.jpg"
author: "s-yoshiki"
tags: ["cms","grav"]
---

## 概要

<a href="https://tech-blog.s-yoshiki.com/2019/01/984/">https://tech-blog.s-yoshiki.com/2019/01/984/</a>

フラットファイルCMS「Grav」の公式インストール手順では公開領域(ここではドキュメントルート以下のこと)にGrav本体のファイルを置いてインストールする方法が紹介されていますが、パーミッションが正しく設定されているとしても関係ないファイルを公開領域におくのが気持ち悪いと思う人もいると思うので、非公開領域にインストールし起動する方法を紹介したいと思います。

## Gravのインストール

Gitを用いた手順で紹介します。
下記の説明では前提として、ドキュメントルートを/var/www/html/とします。かつ/var/www/html/は空の状態です。

### Gravのクローン

```
cd /var/www
git clone -b master https://github.com/getgrav/grav.git
```

これを実行すると/var/www/gravが作成されると思います。

<a href="https://tech-blog.s-yoshiki.com/2019/01/984/">ここら辺</a>を参考にインストールコマンドも実行します。

### 公開領域の設定

次にindex.phpをコピーします。

```
cp /var/www/grav/index.php /var/www/html/index.php
```

コピーしたら/var/www/html/index.phpのL15を編集します。

```
$autoload = __DIR__ . '/vendor/autoload.php';
```

↓変更後

```
$autoload = '/var/www/grav/vendor/autoload.php';
```

としてApache再起動...あれ動かない調査中