---
title: "【WordPress】ソースコードから編集してhttps対応URLに変更"
path: "/entry/5"
date: "2018-02-10 13:47:22"
coverImage: "../../../images/thumbnail/wordpress-logo.png"
author: "s-yoshiki"
tags: ["amazon-aws","amazon-lightsail","wordpress","php"]
---
## 概要

SSL対応化の際に設定ページからURLを設定を変更できなかったので、ソースコードから編集してhttps対応URLに変更した。

## ソース

以下のように編集した。

編集前

```php
define('WP_SITEURL', 'http://' . $_SERVER['HTTP_HOST'] . '/');
define('WP_HOME', 'http://' . $_SERVER['HTTP_HOST'] . '/');
```

編集後

```php
define('WP_SITEURL', 'https://' . $_SERVER['HTTP_HOST'] . '/');
define('WP_HOME', 'https://' . $_SERVER['HTTP_HOST'] . '/');
```

## 環境

- WordPress 4.9.4
- Amazon Lightsail
- Ubuntu 14.04.5 LTS, Trusty Tahr

