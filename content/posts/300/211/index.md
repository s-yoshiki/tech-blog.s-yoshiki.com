---
title: "PHP-Parser で PHP5からPHP7で動くコードに自動修正するツールを作る夢をみた"
path: "/entry/211"
date: "2020-12-29"
coverImage: "../../../images/thumbnail/php-logo.jpg"
author: "s-yoshiki"
tags: ["php","phpstan","ast","php-parser"]
---

## 概要

[PHP5からPHP7への移行ツールを作るための解析・自動修正ツールを調べる](/entry/210) の続きです。
PHP-Parser を利用して PHP5でしか動作しないコードをPHP7で動作するコードに再生成するための夢のような自動変換ツールが作れないか考えてみました。

### ツールが備える機能条件

ここで、「PHP5でしか動作しないコードをPHP7で動作するコードに再生成するためのツール」が備える機能の条件を以下としています。

 - 非推奨/廃止となった関数の置換
 - 関数/変数/クラス/例外クラスの置換
 - ファイルパスの修正
 - 引数の追加・変更
 - 型の判定・キャスト (例えばPHP5のcount()の場合、count(false)だと1、count(null)だと0になるがphp7ではwarning) 

## PHP-Parser について

> This is a PHP 5.2 to PHP 8.0 parser written in PHP. Its purpose is to simplify static code analysis and manipulation.
> 
> [nikic/PHP-Parser](https://github.com/nikic/PHP-Parser)
> [https://github.com/nikic/PHP-Parser](https://github.com/nikic/PHP-Parser)

PHP5.2からPHP8までに対応したパーサであり。静的解析や操作を行うためのツールです。

こんな特徴があると説明されています。

 - PHP 5、PHP 7、およびPHP 8コードを抽象構文木（AST）に解析
 - ASTを可読形式で吐き出し
 - ASTをPHPコードに再生成
 - ASTを走査および変更するための基礎的なツール
 - 名前空間名の解決
 - 定数式の評価
 - コード生成のためのAST構築を簡素化するビルダーを備える
 - ASTをJSONに変換して戻す

## PHP-Parser の簡単なサンプル

まずは簡単なサンプルを紹介します。

```php
<?php
$code = <<<EOT
<?php
if ($var === true) {
    echo "hello";
}
EOT;
$parser = (new PhpParser\ParserFactory)->create(PhpParser\ParserFactory::PREFER_PHP7);
$stmts = $parser->parse($code);
// var_dump($stmts);
$printer = new PhpParser\PrettyPrinter\Standard();
$result = $printer->prettyPrintFile($stmts);
// echo $result;
```

このサンプルコードはphpファイルを読み込んでASTに分解した後、再度コードを生成するソースです。

この時変数 `$stmts` はパースされたコードに関する情報を保持する次のようなオブジェクトです。

```php
array(1) {
  [0]=>
  object(PhpParser\Node\Stmt\If_)#1149 (5) {
    ["cond"]=>
    object(PhpParser\Node\Expr\BinaryOp\Identical)#1146 (3) {
      ["left"]=>
      object(PhpParser\Node\Expr\Variable)#1143 (2) {
        ["name"]=>
        string(3) "var"
        ["attributes":protected]=>
        array(2) {
          ["startLine"]=>
          int(2)
          ["endLine"]=>
          int(2)
        }
      }
      ["right"]=>
      object(PhpParser\Node\Expr\ConstFetch)#1145 (2) {
        ["name"]=>
        object(PhpParser\Node\Name)#1144 (2) {
          ["parts"]=>
          array(1) {
            [0]=>
            string(4) "true"
          }
          ["attributes":protected]=>
          array(2) {
            ["startLine"]=>
            int(2)
            ["endLine"]=>
            int(2)
          }
        }
        ["attributes":protected]=>
        array(2) {
          ["startLine"]=>
          int(2)
          ["endLine"]=>
          int(2)
        }
      }
      ["attributes":protected]=>
      array(2) {
        ["startLine"]=>
        int(2)
        ["endLine"]=>
        int(2)
      }
    }
    ["stmts"]=>
    array(1) {
      [0]=>
      object(PhpParser\Node\Stmt\Echo_)#1148 (2) {
        ["exprs"]=>
        array(1) {
          [0]=>
          object(PhpParser\Node\Scalar\String_)#1147 (2) {
            ["value"]=>
            string(5) "hello"
            ["attributes":protected]=>
            array(3) {
              ["startLine"]=>
              int(3)
              ["endLine"]=>
              int(3)
              ["kind"]=>
              int(2)
            }
          }
        }
        ["attributes":protected]=>
        array(2) {
          ["startLine"]=>
          int(3)
          ["endLine"]=>
          int(3)
        }
      }
    }
    ["elseifs"]=>
    array(0) {
    }
    ["else"]=>
    NULL
    ["attributes":protected]=>
    array(2) {
      ["startLine"]=>
      int(2)
      ["endLine"]=>
      int(4)
    }
  }
}
```


`PhpParser\PrettyPrinter\Standard::prettyPrintFile()`によってパースされたオブジェクトからコードを再生成することができます。

コードの自動修正ツールは、パースされたオブジェクトに変更を加えコードを再生成を行うことでコードの自動修正が行う仕組みを利用して実装します。

## ASTオブジェクトの置換・変更

先程のサンプルコードを拡張してソースコードを書き換える処理を作ります。
次のサンプルは `hello` という文字列が存在したら `hello world` に置換するコードです。

```php
<?php
$code = <<<EOT
<?php
if ($var === true) {
    echo 'hello';
}
EOT;

class HelloWorldNodeVisitor extends NodeVisitorAbstract
{
    public function leaveNode(Node $node)
    {
        if ($node instanceof Node\Scalar\String_ && $node->value === 'hello') {
            $node->value = 'hello world';
        }
    }
}

$parser = (new PhpParser\ParserFactory)->create(PhpParser\ParserFactory::PREFER_PHP7);
$stmts = $parser->parse($code);
$traverser = new NodeTraverser;
$traverser->addVisitor(new HelloWorldNodeVisitor);
$stmts = $traverser->traverse($stmts);
$printer = new PhpParser\PrettyPrinter\Standard();
$result = $printer->prettyPrintFile($stmts);
// <?php
// if ($var === true) {
//     echo 'hello world';
// }
```

`NodeTraverser`オブジェクトに`NodeVisitor`インタフェースを実装したオブジェクトをセットすることでASTオブジェクトを走査する際に書き換え処理を行います。
上記のサンプルコードでは`NodeVisitor`インタフェースを実装した`NodeVisitorAbstract`クラスを継承したオブジェクトを利用しています。

## PHP5からPHP7への変更内容を実装する

次のようなサンプルコードを用意しました。これはphpのバージョンを5から7へ変更した際に問題となる部分が要素が含まれているコードです。

```php
<?php
//ex1 includeするパスを path/to/foo から path/to/bar に変更する
include("path/to/foo");
include_once("path/to/foo");
require("path/to/foo");
require_once("path/to/foo");
// include("path/to/foo");
$include = "path/to/foo";

//ex2 catchする例外クラスを Exception から Throwable に変更
try {
    $callable = function (Exception $obj) {
        var_dump($obj);
        return true;
    };
} catch (Exception $err) {
    print_r($err);
}

//ex3 廃止関数の置換
{
    $str = "123";
    ereg("/[0-9]/", $str);
    call_user_method('strCount', $str);
    mysql_connect("host", "user", "password");
}

//ex4 クラス名(宣言・継承)の変更
class Int {}
class Num extends Int {}

//ex5 引数の調整
$var1 = null;
$num = count($var1);
$var2 = false;
$num = count($var2);
$var3 = array();
$num = count($var3, COUNT_RECURSIVE);

function toArrayForCount($arg): array
{
    if (is_countable($arg)) {
        return $arg;
    }
    if (is_null($arg)) {
        return [];
    }
    if ($arg === false) {
        return [1];
    }
    return [];
}
```

### ex1 includeパスを変更する

これはphp5→7とは関係ありませんが、ソースコード中のパスを一括変換したいと言う場面はあると思うので用意しました。
次のようなクラスを用意しました。

```php
class IncludePathVisitor extends NodeVisitorAbstract
{
    public function leaveNode(Node $node)
    {
        if ($node instanceof Node\Expr\Include_) {
            if ($node->expr->value === "path/to/foo") {
                $node->expr->value = "path/to/bar";
            }
        }
    }
}
```

### ex2 例外クラスを Exception から Throwable に

PHP5で存在した`E_*`エラーがPHP7からThrowableを継承するERRORクラスとなりました。
全ての例外を拾うため catch している `Exception` を `Throwable` に変更する次のようなクラスを用意しました。

```php
class StmtCatchVisitor extends NodeVisitorAbstract
{
    public function leaveNode(Node $node)
    {
        if ($node instanceof Node\Stmt\Catch_ && $node->types[0]->parts[0] === 'Exception') {
            $node->types[0]->parts[0] = 'Throwable';
        }
    }
}
```

### ex3 廃止関数の置換

PHP7からいくつか廃止された菅すが存在します。
例えば、`ereg_*` `call_user_method` `mysql_*` です。

```php
class FunctionReplaceVisitor extends NodeVisitorAbstract
{
    public function leaveNode(Node $node)
    {
        if ($node instanceof Node\Expr\FuncCall && $node->name->getLast() === 'ereg') {
            $node->name->parts = ['preg_match'];
        }
        if ($node instanceof Node\Expr\FuncCall && $node->name->getLast() === 'call_user_method') {
            $node->name->parts = ['call_user_func'];
        }
        if ($node instanceof Node\Expr\FuncCall && $node->name->getLast() === 'mysql_connect') {
            $node->name->parts = ['mysqli_connect'];
        }
    }
}
```

### ex4 クラス名(宣言・継承)の変更

クラス名などでは予約語が利用できませんが、PHP7では新たに予約語が追加されました。
例えば、int float bool などです。これに対応するのは次のクラスです。
処理としては別の固定されたクラス名に置き換えているだけなので場合によっては考慮が必要です。

```php
class ClassReplaceVisitor extends NodeVisitorAbstract
{
    public function leaveNode(Node $node)
    {
        if (!($node instanceof Node\Stmt\Class_)) {
            return;
        }
        if ($node->name->name === 'Int') {
            $node->name->name = 'IntObj';
        }
        if ($node->extends !== NULL && $node->extends->parts[0] === 'Int') {
            $node->extends->parts[0] = 'IntObj';
        }
    }
}
```

### ex5 引数の調整

count関数はcountableな値以外は警告を発するようになりました。なのでcountableかどうかチェックする必要が出てきました。

count関数の引数にtoArrayForCountFuncで値を加工(=countableな値に変更)してphp5のcountと同様の動きをするように変更します(←どうかと思うが)

```php
class CountFuncArgInjectionVisitor extends NodeVisitorAbstract
{
    public function leaveNode(Node $node)
    {
        if ($node instanceof Node\Expr\FuncCall && $node->name->getLast() === 'count') {
            $tmp = $node->args[0]->value;
            $func = new PhpParser\Node\Expr\FuncCall(
                new PhpParser\Node\Name('toArrayForCount')
            );
            $func->args = [
                new PhpParser\Node\Arg($tmp),
            ];
            $node->args[0] = $func;
        }
    }
}
```

## 結果

こうなりました。

```php
<?php
//ex1 includeするパスを path/to/foo から path/to/bar に変更する
include("path/to/bar");
include_once("path/to/bar");
require("path/to/bar");
require_once("path/to/bar");
// include("path/to/foo");
$include = "path/to/foo";

//ex2 catchする例外クラスを Exception から Throwable に変更
try {
    $callable = function (Exception $obj) {
        var_dump($obj);
        return true;
    };
} catch (Throwable $err) {
    print_r($err);
}

//ex3 廃止関数の置換
{
    $str = "123";
    preg_match("/[0-9]/", $str);
    call_user_func('strCount', $str);
    mysqli_connect("host", "user", "password");
}

//ex4 クラス名(宣言・継承)の変更
class IntObj {}
class Num extends IntObj {}

//ex5 引数の調整
$var1 = null;
$num = count(toArrayForCount($var1));
$var2 = false;
$num = count(toArrayForCount($var2));
$var3 = array();
$num = count(toArrayForCount($var3), COUNT_RECURSIVE);

function toArrayForCount($arg): array
{
    if (is_countable($arg)) {
        return $arg;
    }
    if (is_null($arg)) {
        return [];
    }
    if ($arg === false) {
        return [1];
    }
    return [];
}
```

## 所感

自動変換する機構自体はそこそこ作れそうな感じでした。
しかしながら1つのルールに対しての実装コストが大きく静的解析ツール(PHPStanなど)を利用しながら手動で修正して行くのが無難かなと思った次第です。
ソースコードの規模が大きいほど、このようなやり方は効果を発揮するでしょう。

## 参考にしたサイト

[nikic/PHP-Parser入門](https://qiita.com/gong023/items/4c8401e03d843fd15122)
[https://qiita.com/gong023/items/4c8401e03d843fd15122](https://qiita.com/gong023/items/4c8401e03d843fd15122)

[PHPでPHPを実装する](https://blog.freedom-man.com/phphp)
[https://blog.freedom-man.com/phphp](https://blog.freedom-man.com/phphp)

[nikic/PHP-Parser を使ってPHPコードをパースして出来る事とサンプル](https://qiita.com/yotsak/items/858cfb6ea7a7563d8059)
[https://qiita.com/yotsak/items/858cfb6ea7a7563d8059](https://qiita.com/yotsak/items/858cfb6ea7a7563d8059)