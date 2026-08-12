---
title: "PHPにSmartyをセットアップ"
path: "/entry/106"
date: "2019-01-26 13:37:01"
coverImage: "../../../images/thumbnail/php-logo.jpg"
author: "s-yoshiki"
tags: ["php","smarty","テンプレートエンジン"]
---

## 概要

PHPにSmartyをセットアップをするメモ

## 試した環境

PHP 7.1.19
Smarty 3.1.33

## Smartyについて

<a href="https://www.smarty.net/">https://www.smarty.net/</a>

古くからあるPHPのテンプレートエンジンです。

<script type="text/javascript" src="https://ssl.gstatic.com/trends_nrtr/1709_RC01/embed_loader.js"></script> <script type="text/javascript"> trends.embed.renderExploreWidget("TIMESERIES", {"comparisonItem":[{"keyword":"smarty","geo":"JP","time":"today 5-y"},{"keyword":"twig","geo":"JP","time":"today 5-y"}],"category":0,"property":""}, {"exploreQuery":"date=today%205-y&geo=JP&q=smarty,twig","guestPath":"https://trends.google.co.jp:443/trends/embed/"}); </script>

**Smarty と twig のトレンド比較**

PHPのテンプレートエンジンとして有名なSmartyですが、最近はbaldeやtwigという名前もよく見かけるようになりました。

## ダウンロード

Smartyの最新版はGitHubからzipかtarで落としてきます。

<a href="https://github.com/smarty-php/smarty/releases">https://github.com/smarty-php/smarty/releases</a>

## smartyの配置

落として解凍したsmartyディレクトリを任意の場所に配置します。
実装するときに絶対パスで参照するのであれば、どの場所でも問題ないとは思いますが、
include_pathで設定されている場所に配置するのがベターだと思います。

## Smarty呼び出し

**index.php**

```php
include_once("smarty-3.1.33/libs/Smarty.class.php");

// smartyオブジェクト生成
$smarty = new Smarty();

// 設定
$smarty->template_dir = "/path/to/template/"; //相対パスでも可
$smarty->compile_dir = "/path/to/cache/"; //相対パスでも可

// 変数をセット
$smarty->assign("test", "Hello World!");

// テンプレートを読み込んでレンダリング
$smarty->display('index.tpl');
```

**index.tpl**

```php
<!DOCTYPE>
<html>
<head>
</head>
<body>
{$test}
</body>
</html>
```

Macであればターミナルから

```
php -S localhost:3333 index.php
```

を実行し、「Hello World!」と表示されていれば成功です。
