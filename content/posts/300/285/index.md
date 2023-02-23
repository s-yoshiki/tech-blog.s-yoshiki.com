---
title: "macOSにzigをインストールしてHello World!する"
path: "/entry/285"
date: "2022-07-18 16:00"
coverImage: "../../../images/thumbnail/zig-logo.png"
author: "s-yoshiki"
tags: ["zig","mac"]
---

## 概要

### 環境

- zig: 0.9.1

## 準備

homebrewでインストールします。

```
brew install zig
```

## 実装

まずは、ワークスペースを作成します。
以下のコマンドで作成することができます。

```shell
mkdir hello-world
cd hello-world
zig init-exe
```

```shell
$ tree .
.
├── build.zig
└── src
    └── main.zig
```

`src/main.zig`に処理を書いていきます。

**src/main.zig**

```ts
const std = @import("std");

pub fn main() anyerror!void {
    std.log.info("Hello {s}", .{"World!"});
}
```

## ビルドと実行

以下のコマンドでビルドを行います。

```shell
zig build
```

`zig-out`の下に実行バイナリが生成されます。

```shell
$ ./zig-out/bin/zig-hello-world 
info: Hello World!
```

ちなみに、`zig run`で実行まで一気に行うことができます。

```shell
$ zig run src/main.zig 
info: Hello World!
```

## とりあえずFizzBuzzしてみる

```ts
const std = @import("std");

pub fn main() anyerror!void {
    var i: usize = 1;
    while (i <= 30): (i += 1) {
        if (i % 15 == 0) {
            std.log.info("{}: FizzBuzz", .{i});
        } else if (i % 3 == 0) {
            std.log.info("{}: Fizz", .{i});
        } else if (i % 5 == 0) {
            std.log.info("{}: Buzz", .{i});
        }
    }
}
```
