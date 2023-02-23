---
title: "途中return禁止、goto禁止の時のdo~while(0)"
path: "/entry/73"
date: "2018-11-18 20:13:31"
coverImage: "../../../images/thumbnail/code.webp"
author: "s-yoshiki"
tags: ["php","アルゴリズム","雑談"]
---

## はじめに

細かいロジックが多い手続き型のプログラムを書こうと思った時のメモ。

1つのプログラム内において、いくつかの処理を行いそれらが失敗したらエラーを出力して終了するといったフローのプログラムを考えてみます。

※言語=PHPで、かつ、クラスとかは利用しないことを前提として話を進めます。

```php
_log("START");

startProc();

if (!proc1()) {
    _log("ERROR1");
    endProc();
    _log("END");
    exit;
}
_log("SUCCESS1");

if (!proc2()) {
    _log("ERROR2");
    endProc();
    _log("END");
    exit;
}
_log("SUCCESS2");

if (!proc3()) {
    _log("ERROR3");
    endProc();
    _log("END");
    exit;
}
_log("SUCCESS3");

//...

endProc();
_log("END");
exit;
```

正しく実行されれば

```
START
SUCCESS1
SUCCESS2
SUCCESS3
END
```

func2でエラーが発生した場合は

```
START
SUCCESS1
ERROR2
END
```

このような出力を期待値とします。

## 構造化

このように書くと、エラー時の処理が見苦しくなります。

なので、
条件に引っかかったらreturnさせると言う感じで実装に変更してみます。

```php
function main() {

    _log("START");

    startProc();

    $result = _sub();
	
    endProc();
	
    _log("END");

    return $result;
}

function _sub() {
    if (!proc1()) {
        _log("ERROR1");
        return false;
    }
    _log("SUCCESS1");
    
    if (!proc2()) {
        _log("ERROR2");
        return false;
    }
    _log("SUCCESS2");
    
    if (!proc3()) {
        _log("ERROR3");
        return false;
    }
    _log("SUCCESS3");

    return true;
}
```

個人的には問題ないと思っておりましたが、「関数の途中でreturnを書くな」と指摘されたことがあります。

いろいろ理由はあるそうですが、このケースは置いといて別のパターンを考えてみます。

### 参考

https://anopara.net/2014/06/27/do-not-write-deep-nested-code/

https://detail.chiebukuro.yahoo.co.jp/qa/question_detail/q1226287612

## goto

こんな時こそgotoの出番ではないんでしょうか？

```php
function main() {
    $result = true;

    _log("START");

    startProc();

    $result = proc1();
    if (!$result) {
        _log("ERROR1");
        goto finalize;
    }
    _log("SUCCESS1");
    
    $result = proc2();
    if (!$result) {
        _log("ERROR2");
        goto finalize;
    }
    _log("SUCCESS2");
    
    $result = proc3();
    if (!$result) {
        _log("ERROR3");
        goto finalize;
    }
    _log("SUCCESS3");
    goto finalize;

    finalize:

    endProc();

    _log("END");
    return $result;
}
```

キレイに書けました。

## do~while(0)を使う

しかしながら、コーディング規約や組織のポリシー的に「とにかくgotoは使ってはいけない！」というケースがあると思います。

そんな時に見つけたテクニックがdo~while(0)を使うと言うもの。

初めて見たときは正直気持ち悪いなと思いましたが、ググると広く使われているテクニックのようでした。

それでも、なんか改めて見てみるとモヤモヤします。

ソースがこちら。

```php
function main() {
    $result = true;

    _log("START");

    startProc();

    do {
        $result = proc1();
        if (!$result) {
            _log("ERROR1");
            break;
        }
        _log("SUCCESS1");
        
        $result = proc2();
        if (!$result) {
            _log("ERROR2");
            break;
        }
        _log("SUCCESS2");
        
        $result = proc3();
        if (!$result) {
            _log("ERROR3");
            break;
        }
        _log("SUCCESS3");

    } while(0);

    endProc();

    _log("END");
    return $result;
}
```

https://stackoverflow.com/questions/243967/do-you-consider-this-technique-bad

https://ja.stackoverflow.com/questions/1510/do-whilefalse%E3%81%AE%E5%88%A9%E7%82%B9%E3%81%AF%E4%BD%95%E3%81%A7%E3%81%99%E3%81%8B

http://php.net/manual/ja/control-structures.do.while.php

PHPは関数名の文字列を関数として実行できるので以下のように構造的に書くこともできました。

```php
function main() {
    $result = true;

    $funcs = [
        "proc1" => [
            "error"   => "ERROR1",
            "success" => "SUCCESS1",
        ],
        "proc2" => [
            "error"   => "ERROR2",
            "success" => "SUCCESS2",
        ],
        "proc3" => [
            "error"   => "ERROR3",
            "success" => "SUCCESS3",
        ]
    ];

    _log("START");

    startProc();
    
    foreach ($funcs as $key => $value) {
        $result = $key();
        if (!$result) {
            _log($value["error"]);
            break;
        }
        _log($value["success"]);
    }

    endProc();

    _log("END");
}
```

## try ~ catchを使う

ググると、try~catchの実装例も出てきます。
ただ、ロジック的なエラーなのか、例外的なエラーなのかでぐちゃぐちゃになってしまいそうなので、個人的には好きではありません。

```php
function main() {
    $result = true;

    _log("START");

    startProc();

    try 
    {
        $result = proc1();
        if (!$result) {
            throw new Exception("ERROR1");
        }
        _log("SUCCESS1");
        
        $result = proc2();
        if (!$result) {
            throw new Exception("ERROR2");
        }
        _log("SUCCESS2");
        
        $result = proc3();
        if (!$result) {
            throw new Exception("ERROR3");
        }
        _log("SUCCESS3");
    } 
    catch(Exception $e) {
        _log($e->getMessage());
    } 
    finally {
        endProc();
        _log("END");
        return $result;
    }
}
```

## その他

### 環境

PHP 7.1.19
