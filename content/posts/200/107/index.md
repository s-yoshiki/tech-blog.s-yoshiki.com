---
title: "PHPで簡単ページング処理を実装する  サンプルコード"
path: "/entry/107"
date: "2019-01-26 13:56:59"
coverImage: "../../../images/thumbnail/php-logo.jpg"
author: "s-yoshiki"
tags: ["php","ページネーション","ページング"]
---

## 概要

PHPで簡単なページング処理を書いてみました。

## 環境

PHP 7.1.19
Smarty 3.1.33

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

$p = (int) $_GET["p"]; //現在のページ番号
$items_count = 51; // 表示したいアイテム数
$items_limit = 10; // 1ページの上限

$min = 1; // 最初のページ番号
$max = (int) ceil($items_count / $items_limit); // 最後のページ番号

$page = pagenation($p, $min, $max);

```

```php

<!DOCTYPE html>
<html>
    <head></head>
    <body>
        <?php if ($page["last"] > 0) echo("<a href='/?p=" . $page["last"] . "' >戻る</a>") ?>
        <span><?php echo(sprintf("%s / %s ページ", $p, $max)) ?></span>
        <?php if ($page["next"] > 0) echo("<a href='/?p=" . $page["next"] . "' >次へ</a>") ?>
    </body>
</html>
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