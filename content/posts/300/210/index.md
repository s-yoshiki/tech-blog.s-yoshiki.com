---
title: "PHP5からPHP7への移行ツールを作るための解析・自動修正ツールを調べる"
path: "/entry/210"
date: "2020-12-28"
coverImage: "../../../images/thumbnail/php-logo.jpg"
author: "s-yoshiki"
tags: ["php","phpstan","ast","php-parser"]
---

## 概要

PHP5で書かれたコードをPHP7環境で動作させるために、使えそうなツールを調べた際の記録です。

最終的にはこれらのツールを組み合わせたりカスタマイズするなりして、PHP5にしか対応しないコードをPHP7環境で動かすことができるコードに再生成するための "夢のような" システムを作ることを目標としますが、まずはそのための調査を行います。

システムの目標はあくまでもPHP5コードをPHP7で無理矢理にでも動かすコードを生成することであって、リファクタリングするとか最適化することは考えません。あくまで動作(やけくそ)させることが目的です。

## PHP5からPHP7への下位互換のない機能

[下位互換性のない変更点 (PHP 5.6.x から PHP 7.0.x への移行)](https://www.php.net/manual/ja/migration70.incompatible.php)
[https://www.php.net/manual/ja/migration70.incompatible.php](https://www.php.net/manual/ja/migration70.incompatible.php)

PHP7では大幅な機能追加やパフォーマンス向上といった対応が行われましたが、それと同時に下位互換性のない変更も行われました。当然ながらPHP5にしか対応していないコードはPHP7用にの対応を行って行く必要があります。

## 使えそうなツールの洗い出し

まずは使えそうなツールを洗い出してみました。

 - [PHPStan](https://github.com/phpstan/phpstan)
 - [phan](https://github.com/phan/phan)
 - [php7cc](https://github.com/sstalle/php7cc)
 - [php7mar](https://github.com/Alexia/php7mar)
 - [php-to-7-aid](https://github.com/gisostallenberg/php-to-7-aid)
 - [Rector](https://github.com/rectorphp/rector)
 - [php-ast](https://github.com/nikic/php-ast)
 - [PHP-Parser](https://github.com/nikic/PHP-Parser)


### PHPStan

`PHPStan` についてはこちらで分かりやすく説明しています。

> PHPStanは、PHP静的解析ツールの大御所です。composerなどのautoloadファイルを解釈し、一部のコードを実行することで解析の高速化を実現しています。静的解析ですが、PHPを一部実行します。実行環境は、PHP7.1以上です。
>
>
> Komiyama Taki.
> ["5千ファイル超のレガシープロジェクトにPHPStan継続的静的解析を導入"](https://note.com/komi_yama/n/ncfe9a73ce374).
> note. 
> 2020-06-30.
> [https://note.com/komi_yama/n/ncfe9a73ce374](https://note.com/komi_yama/n/ncfe9a73ce374),
> (2020-12-28)

<div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 74.9296%;"><iframe src="https://speakerdeck.com/player/feca64a567f240c2b97cd180367ad786" style="border: 0; top: 0; left: 0; width: 100%; height: 100%; position: absolute;" allowfullscreen scrolling="no" allow="encrypted-media"></iframe></div>

### phan

`phan` は `PHPStan` と同様に静的解析を行うツールです。メンテナンスも行われています。 `PHPStan` とどちらが良いかとう議論をしばしば目にしました。

### php7cc

`php7cc` は PHP7 との互換性をチェックするツールです。しかし残念ながら最後のコミットが数年前であり、メンテナンスが止まっているようです。

### php7mar

`php7mar` PHP7との互換性の観点では既存のPHP 5コードに関するレポートを生成するコマンドラインツールです。こちらもコミットが数年前で止まっているという状況です。リポジトリ自体もArchivedとなっております。

### php-to-7-aid

`php-to-7-aid` も下位互換のチェックを行うツールですが、メンテナンスは止まっています。


### Rector

`Rector` は既存のPHPコードのリファクタリングやアップグレードを自動実行するツールです。

`Rector` は上記の静的解析ツールとは異なり、PHP-CS-Fixer(=コード整形を行うツール)コード修正の自動実行を行うことが特徴です。

使用感についてはこちらに記載されていたものを引用します。

> まだまだ発展途上という感じですが、裏側の仕組みをみると PHP-CS-Fixerと比べて柔軟なことができそうな予感がしたのでまた時間を見つけて触ってみようと思います。
>
>
> fortkle.
> ["PHPアプリケーションのアップグレードとリファクタリングを楽にするrectorphp/rectorを試す"](https://fortkle.hatenablog.com/entry/2018/12/16/235830).
> fortkle blog.
> 2018-12-16.
> [https://fortkle.hatenablog.com/entry/2018/12/16/235830](https://fortkle.hatenablog.com/entry/2018/12/16/235830)

自前の独自変換ルールなどの追加も行えますが、autoloadを利用していることが前提です。

### php-ast

`php-ast` はPHPコードをAST(=抽象構文木)に分解するphpの拡張モジュールです。上で触れた`phan` も `php-ast` に依存しています。 

こちらのスライドで詳しく解説しています。

<iframe src="//www.slideshare.net/slideshow/embed_code/key/zs3j71w4sX46K4" width="595" height="485" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe> <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/do_aki/php-ast" title="PHP AST 徹底解説" target="_blank">PHP AST 徹底解説</a> </strong> from <strong><a href="https://www.slideshare.net/do_aki" target="_blank">do_aki</a></strong> </div>

ASTに分解した後のコードの再生性が難しそうなため使うことは見送りますが、なかなか面白いことができそうです。

### PHP-Parser

`PHP-Parser` は `php-ast`と同様にPHPで実装されたPHPコードからASTを構築するパーサです。
`PHP-Parser` は `Rector` や `PHPStan` でも利用されています。

## まとめ

静的解析(構文のチェック)では `PHPStan` なんかが利用できそうでした。
コードの自動修正となると、`Rector` ・ `PHP-Parser` が利用できそうでした。

ただし `Rector` は autoload を利用していることが前提になるなど制約があります。

## 追記 (2021/01/02)

PHP-Parserを利用して自動で置換する方法を考えてみました。

[PHP-Parser で PHP5からPHP7で動くコードに自動修正するツールを作る夢をみた](/entry/211)

## 参考にしたサイト

[PHP5.6からPHP7.2へアップデート時の互換性チェックツール、ハマった体験談へのリンク](https://qiita.com/suin/items/db7a9bc3b11039346977)
[https://qiita.com/suin/items/db7a9bc3b11039346977](https://qiita.com/suin/items/db7a9bc3b11039346977)


[下位互換性のない変更点 (PHP 5.6.x から PHP 7.0.x への移行)](https://www.php.net/manual/ja/migration70.incompatible.php)
[https://www.php.net/manual/ja/migration70.incompatible.php](https://www.php.net/manual/ja/migration70.incompatible.php)

