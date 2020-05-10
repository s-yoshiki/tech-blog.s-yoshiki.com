---
title: "PHP + Smartyで超簡単なページング処理とサンプルコード"
path: "/entry/105"
date: "2019-01-26 12:29:51"
coverImage: "../../../images/thumbnail/php-logo.jpg"
author: "s-yoshiki"
tags: ["未分類","php","smarty","ページネーション","ページング"]
---

## 概要

PHPで簡単なページング処理を書いてみました。

## 環境

- PHP 7.1.19
- Smarty 3.1.33

## Smartyのセットアップ

GitHubから適当なバージョンの物を落としてきます。
PHPのインクルードディレクトリに配置すれば完了。

https://github.com/smarty-php/smarty/releases

Smartyの使い方は公式を参照してください。

https://www.smarty.net/

## 作るもの

簡単なページング処理を作ります。
具体的には、ある取得したデータ(サンプルソースでは51件)に対し1ページに10件まで表示する機能を想定します。

ここで、ページの現在のステータスと、次もしくは前のページのリンクを表示する機能を実装します。

例えば 51件のアイテムを6ページにわけて10個づつ表示したい時、

最初の１ページ目は

```
1 / 6 ページ 次へ
```

2ページ目は

```
戻る 2 / 6 ページ 次へ
```

3ページ目は

```
戻る 3 / 6 ページ 次へ
```

最後のページは

```
戻る 6 / 6 ページ
```

という機能になります。

### ソース

以下がソースコードです。

**index.php**

```php

include_once("smarty/libs/Smarty.class.php");

main();

exit(0);

/**
 * main
 */
function main()
{
    $smarty = new Smarty();
    $smarty->template_dir = '/path/to/templates/';
    $smarty->compile_dir  = '/path/to/cache/';

    $p = (int) $_GET["p"]; //現在のページ番号
    $items_count = 51; // 表示したいアイテム数
    $items_limit = 10; // 1ページの上限

    // 最初のページ番号
    $min = 1;
    // 最後のページ番号
    $max = (int) ceil($items_count / $items_limit);

    $page = pagenation($p, $min, $max);

    smartyBindValue(
        $smarty,
        [
            "last" => $page["last"],
            "next" => $page["next"],
            "status" => sprintf("%s/%s ページ", $p, $max),
        ]
    );

    $smarty->display('index.tpl');
}

/**
 * アイテムセット
 * 
 * @param object &$smarty smartyオブジェクト
 * @param array $items アイテム配列
 * @return void
 */
function smartyBindValue(&$smarty, $items)
{
    foreach ($items as $key => $value) {
        $smarty->assign($key, $value);
    }
}

/**
 * ページ数計算
 * 
 * @param int $p 現在のページ番号
 * @param int $min 最初のページ番号 
 * @param int $max 最後のページ番号
 */
function pagenation($p, $min, $max)
{
    $last = null;
    $next = null;

    // 範囲外か
    if (!($min <= $p && $p <= $max)) {
        $p = 1; //強制的に1ページ目へ
    }

    // 最初のページか ?
    if ($p === $min) {
        return [
            "next" => $min + 1,
            "last" => null,
        ];
    }

    // 最後のページか ?
    if ($p === $max) {
        return [
            "next" => null,
            "last" => $max - 1,
        ];
    }

    return [
        "next" => $p + 1,
        "last" => $p - 1,
    ];
}
```

ポイントとなるのがページ数の計算です。
ページ数は以下の式で算出できます。

```php
// $items_count 全件アイテム数
// $items_limit　1ページの上限
$max = (int) ceil($items_count / $items_limit);　// 最後のページ番号

```

ceil関数は少数を切り上げするため、ceil(51 / 10)の時は $max = 6となります。
またこの時、$maxはfloat型であり、PHPではゆるい比較もできるため、念の為 int にキャストします。

### テンプレート

テンプレートはメインの内容が記述されている、index.tpl と ページネーションのみを描画する page.tpl に切り分けます。

**index.tpl**

```html
<!DOCTYPE>
<html>
<head>
</head>
<body>
{include file="page.tpl"}
</body>
</html>
```

**page.tpl**

```php
{if $last != null}
<a href="/?p={$last}">戻る</a>
{/if}
<span>{$status}</span>
{if $next != null}
<a href="/?p={$next}">次へ</a>
{/if}

```
