---
title: "Perlでconstant(定数)をhashのキーに使う"
path: "/entry/235"
date: "2021-04-19 23:59"
coverImage: "../../../images/thumbnail/perl-logo.jpeg"
author: "s-yoshiki"
tags: ["perl"]
---

## 概要

Perlでconstant(定数)をhashのキーに使う方法でハマりました。その時の解決方法です。

## ハマった事象

例えば以下のようなコードがあったとします。

```perl
use constant VAR_1 => 'var_2';

my $hash_ref = {
    VAR_1 => 'hoge'
};

print $hash_ref;
```

ここで期待する出力は`var_2`をキーとするハッシュ(リファレンス)を想定していましたが、実際には`VAR_1`がキーとなっていました。

```perl
# 期待していた値
$VAR1 = {
          'var_2' => 'hoge'
        };
# 実際に定義された値
$VAR1 = {
          'VAR_1' => 'hoge'
        };
```

## 解決方法

### 1 括弧をつける

Perlのconstantはサブルーチンと同じ扱いとなるようなので、括弧をつけて呼び出します。

```perl
use constant VAR_1 => 'var_2';

my $hash_ref = {
    VAR_1() => 'hoge'
};

print $hash_ref;
# $VAR1 = {
#           'var_2' => 'hoge'
#         };
```

### 2 & をつける

```perl
use constant VAR_1 => 'var_2';

my $hash_ref = {
    &VAR_1 => 'hoge'
};

print $hash_ref;
# $VAR1 = {
#           'var_2' => 'hoge'
#         };
```


## 参考にしたサイト

[Is there any way to use a “constant” as hash key in Perl?](https://stackoverflow.com/questions/96848/is-there-any-way-to-use-a-constant-as-hash-key-in-perl)

[[Perl]定数をHashのKeyに使用するときの注意点](https://blog.goo.ne.jp/nbjogger/e/1d4707e452591f39df76af39f4afbe3d)

[constant - 定数を宣言するための Perl プラグマ - perldoc.jp](https://perldoc.jp/docs/modules/constant-1.17/constant.pod)