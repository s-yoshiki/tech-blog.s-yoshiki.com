---
title: "Prisma で Iterator を作成する"
path: "/entry/310"
date: "2023-03-19 01:30"
coverImage: "../../../images/thumbnail/prisma-logo.png"
author: "s-yoshiki"
tags: ["prisma", "node.js", "typescript", "sqlite"]
---

## はじめに

Prisma で大量のレコードのに対して Iterator のようなオブジェクトを使って参照する実装を作った際のメモです。

大量のレコードを扱う場合、Prismaでは一度に全てのレコードを取得すると多くのヒープメモリを消費することがあります。
そこで、IteratorパターンやStreamオブジェクトを使用した実装が必要になることがあります。

PrismaにはデフォルトでIteratorパターンの実装が無いように見えたので、自分で実装することにしました。
この実装は大量のレコードを参照する場合に役立ちます。

以上が、Iteratorパターンを用いた実装を作成するに至った背景です。

例えば Perl の DBI では `fetchrow_hashref` や `fetchrow_arrayref` といったような 1レコードずつ参照していくサブルーチンがあり、これと似たようなことをやりたいというわけです。

**fetchrow_hashref**の実装

```perl
#!/usr/bin/perl

use strict;
use DBI;

my $DB_NAME = "db1";
my $DB_USER = "root";
my $DB_PASS = "mysql";
my $DB_HOST = "localhost";
my $DB_PORT = "3306";

my $dbh = DBI->connect("dbi:mysql:dbname=$DB_NAME;host=$DB_HOST;port=$DB_PORT","$DB_USER","$DB_PASS") or die "$!\n Error: failed to connect to DB.\n";
my $sth = $dbh->prepare("SELECT * FROM t1;");
$sth->execute();
while (my $hash_ref = $sth->fetchrow_hashref) {
  my %row = %$hash_ref;
  print "$row{a}, $row{b}\n";
}
$sth->finish;
$dbh->disconnect;
```

## Iterator について

Iteratorについては説明を省きますが、
[JavaScriptのIterator / Generatorの整理](https://zenn.dev/qnighy/articles/112af47edfda96)
が分かりやすく説明されていますので、こちらを参考にしてください。

## Prismaの準備

ここでは以下のようなprismaのスキーマを定義しておきます。

```prisma
model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
}
```

## PrismaClient 拡張クラスの作成

`PrismaClient`を拡張してIteratorを返すメソッド`$createIterator`を作成します。

**PrismaService**

```ts
import { PrismaClient } from '@prisma/client';

export class PrismaService extends PrismaClient implements OnModuleInit {

  public $createIterator<Record>(fn: (prisma: PrismaService) => any): AsyncIterableIterator<Record> {
    const prismaClient = this;

    class PrismaReadableIterator implements AsyncIterableIterator<Record> {
      private buffer: Record[] = [];

      private async read(): Promise<boolean> {
        const res = await fn(prismaClient);
        if (!res || res === null || (Array.isArray(res) && res.length === 0)) {
          return false;
        }
        this.buffer = res;
        return true;
      }

      public async next(): Promise<IteratorResult<Record>> {
        if (this.buffer.length === 0) {
          if (!(await this.read())) {
            return { done: true, value: undefined };
          }
        }
        const value = this.buffer.shift();
        if (!value) {
          return { done: true, value: undefined };
        }
        return { done: false, value };
      }

      [Symbol.asyncIterator](): AsyncIterableIterator<Record> {
        return this;
      }
    }
    return new PrismaReadableIterator();
  }
}
```

`$createIterator()` メソッドは、引数として渡されたコールバック関数を使用して、Prismaクライアントからデータを取得し、それらのデータに対して `AsyncIterableIterator` オブジェクトを返します。

これにより、`$createIterator()` メソッドを使用することで、大量のレコードを一度に取得する必要がなくなり、必要に応じてイテレーターからデータを取得することができます。

`PrismaReadableIterator` クラスは、`AsyncIterableIterator` インターフェースを実装し、`next()` メソッドによってイテレーターから値を取得できます。
`read()` メソッドは、`Prisma`クライアントからデータを取得し、バッファに格納します。
`Symbol.asyncIterator` メソッドは、 `AsyncIterableIterator` オブジェクトを返します。

## 利用例

次に実際にどのように使うかを書いていきます。

### `skip` `take` を利用する

```ts
const prismaClient = new PrismaService();

const getUserIterator = () => {
  const chunksize = 10;
  let skip = 0
  return prismaClient.$createIterator<User>(async (prisma: PrismaService): Promise<User[]>  => {
    const res = await prisma.user.findMany({
      orderBy: {
        id: 'desc',
      },
      take: chunksize,
      skip
    });
    skip += res.length;
    return res;
  });
}

(async () => {
  const iterator = this.getUserIterator();
  for await (const item of iterator) {
    console.log(item);
  }
})();
```

この例では、`skip` `take` を利用してイテレータを作成しています。
この実装は簡単かもしれませんが、
`findMany`がすでに何回か呼ばれている状況において、参照したレコードが削除されてしまった場合、レコードがズレてしまう可能性があるため、厳密な処理を行う場合は適していないかもしれません。

### id のみを取得しておく

```ts
const getUserIterator2 = async () => {
  const ids: number[] = (await this.prisma.user.findMany({
    select: {
      id: true,
    },
    orderBy: {
      id: 'desc',
    }
  })).map(row => row.id);
  const chunksize = 5;
  const maxIdx = ids.length;
  let startIdx = 0;
  return this.prisma.$createIterator<User>(async (prisma: PrismaService): Promise<User[]>  => {
    const endIdx = Math.min(startIdx + chunksize, maxIdx);
    const res = await prisma.user.findMany({
      where: {
        id: {
          in: ids.slice(startIdx, endIdx)
        }
      },
      orderBy: {
        id: 'desc',
      },
    });
    startIdx += chunksize;
    return res;
  });
}
```

あらかじめ id のみを取得しておいて、後で in句で絞り込む方法です。
先ほどのレコードがズレるようなことは起こりずらくなったかもしれませんが、
パフォーマンスが気になるとことです。


## 参考にしたサイト

- [Streams · Issue #5055 · prisma/prisma](https://github.com/prisma/prisma/issues/5055)
- [Pagination (Reference)](https://www.prisma.io/docs/concepts/components/prisma-client/pagination)