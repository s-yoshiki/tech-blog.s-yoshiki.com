---
title: "【Apache】単一のIPに複数のVirtualHostを設定するときの記述の順番は非常に重要だった"
path: "/entry/30"
date: "2018-08-25 18:43:59"
coverImage: "../../../images/thumbnail/code.webp"
author: "s-yoshiki"
tags: ["apache"]
---

## 概要

完全https化とドメイン移行する為に、ApacheのVirtualHostにリダイレクトの設定を追加した。
記述自体は間違っていなかったものの、設定の記述の順番を間違ってたためか、正しく遷移しなくなっていた。
順番を入れ替えたら正しく動いた...という話

## 環境

- Apache 2.4
- Bitnami WordPress

## VirtualHostの設定

※
移行前のドメインがs-yoshiki.com
移行後のドメインがtech-blog.s-yoshiki.com
とします。

```xml
<VirtualHost *:80>
ServerName s-yoshiki.com
ServerAlias www.s-yoshiki.com blog.s-yoshiki.com s-yoshiki.com
<!-- 省略 -->
</VirtualHost>

<VirtualHost *:443>
ServerName s-yoshiki.com
ServerAlias www.s-yoshiki.com blog.s-yoshiki.com s-yoshiki.com www.s-yoshiki.com
<!-- 省略 -->
</VirtualHost>
```

これが元々の設定。
これを以下のように変更した。

```xml
<VirtualHost *:80>
ServerName tech-blog.s-yoshiki.com
<!-- 省略 -->
</VirtualHost>

<VirtualHost *:443>
ServerName tech-blog.s-yoshiki.com
<!-- 省略 -->
</VirtualHost>
<VirtualHost *:80>
ServerName s-yoshiki.com
ServerAlias www.s-yoshiki.com blog.s-yoshiki.com s-yoshiki.com
Redirect / https://tech-blog.s-yoshiki.com
</VirtualHost>

<VirtualHost *:443>
ServerName s-yoshiki.com
ServerAlias www.s-yoshiki.com blog.s-yoshiki.com s-yoshiki.com www.s-yoshiki.com
Redirect / https://tech-blog.s-yoshiki.com
</VirtualHost>
```

Apache再起動後立ち上がらず...
調べたところVirtualHostの記述の順番に問題があったよう。
<a href="http://www.go-next.co.jp/blog/server_network/4084/">http://www.go-next.co.jp/blog/server_network/4084/</a>

```xml
<VirtualHost *:80>
ServerName s-yoshiki.com
ServerAlias www.tech-blog.s-yoshiki.com blog.s-yoshiki.com s-yoshiki.com
Redirect / https://tech-blog.s-yoshiki.com
</VirtualHost>
<VirtualHost *:443>
ServerName s-yoshiki.com
ServerAlias www.tech-blog.s-yoshiki.com blog.s-yoshiki.com s-yoshiki.com
Redirect / https://tech-blog.s-yoshiki.com
</VirtualHost>

<VirtualHost *:80>
ServerName tech-blog.s-yoshiki.com
<!-- 省略 -->
</VirtualHost>

<VirtualHost *:443>
ServerName tech-blog.s-yoshiki.com
<!-- 省略 -->
</VirtualHost>
```

これに変更したら、問題なく動いた。

## 完全https化

httpで来たものは問答無用でhttpsにリダイレクト

```xml
<Directory "/hoge/">
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://tech-blog.s-yoshiki.com%{REQUEST_URI} [R,L]
</Directory>
```
