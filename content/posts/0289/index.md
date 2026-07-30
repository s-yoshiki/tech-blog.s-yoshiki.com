---
title: "Prisma MySQL でUTC以外の任意のタイムゾーンを利用するのが難しい件"
path: "/entry/289"
date: "2022-08-08 16:30"
coverImage: "../../../images/thumbnail/prisma-logo.png"
author: "s-yoshiki"
tags: ["prisma", "typescript", "mysql", "mariadb", "node.js"]
---

## 概要

タイトルにもあるように、
Prisma+MySQL の構成で任意のタイムゾーンを DB で利用するのが難しいです。
素直に UTC を使うべきという感想になりました。

検証してみたので、結果を記載したいと思います。

## 検証方法

- アプリケーションの実行環境は JST・UTC
- DB の実行環境は JST・UTC

上記の 2 つの組み合わせパターンで検証を行います。

また後述しますが、アプリケーション側で生成したシステム時間と DB で生成したシステム時間をそれぞれ登録します。

登録した値を取り出し、JST に変更することで合っているかどうかを確認します。

### 検証した環境

- Prisma: 4.1.1

### 検証するコード

```ts
import { Prisma, PrismaClient } from '@prisma/client';

// process.env.TZ = "UTC";
process.env.TZ = 'Asia/Tokyo';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();
  await prisma.user.create({
    data: {
      userInputDate1: new Date(),
    },
  });
  const allUsers = await prisma.user.findMany();
  for (let i in allUsers) {
    const row = allUsers[i];
    let obj = {
      userInputDate1: row.userInputDate1?.toLocaleString(),
      createdAt1: row.createdAt1.toLocaleString(),
      createdAt2: row.createdAt2.toLocaleString(),
      createdAt3: row.createdAt3.toLocaleString(),
      createdAt4: row.createdAt4.toLocaleString(),
      createdAt5: row.createdAt5.toLocaleString(),
    };
    console.log(row);
    console.log(obj);
  }
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

スキーマは次のように設定しておきます。

```prisma
model User {
  id Int @id @default(autoincrement())
  userInputDate1 DateTime?
  createdAt1 DateTime @default(now()) @db.Timestamp(0)
  createdAt2 DateTime @default(dbgenerated("NOW()")) @db.Timestamp(0)
  createdAt3 DateTime @default(now())
  createdAt4 DateTime @default(now()) @db.DateTime(0)
  createdAt5 DateTime @default(dbgenerated("NOW()")) @db.DateTime(0)
}
```

`dbgenerated`は DB の組み込み関数を呼び出す機能です。
これを使って MySQL の`NOW()`を呼び出します。

生成された型は次のようになります。

```
+----------------+-------------+------+-----+----------------------+-------------------+
| Field          | Type        | Null | Key | Default              | Extra             |
+----------------+-------------+------+-----+----------------------+-------------------+
| id             | int         | NO   | PRI | NULL                 | auto_increment    |
| userInputDate1 | datetime(3) | YES  |     | NULL                 |                   |
| createdAt1     | timestamp   | NO   |     | CURRENT_TIMESTAMP    | DEFAULT_GENERATED |
| createdAt2     | timestamp   | NO   |     | CURRENT_TIMESTAMP    | DEFAULT_GENERATED |
| createdAt3     | datetime(3) | NO   |     | CURRENT_TIMESTAMP(3) | DEFAULT_GENERATED |
| createdAt4     | datetime    | NO   |     | CURRENT_TIMESTAMP    | DEFAULT_GENERATED |
| createdAt5     | datetime    | NO   |     | CURRENT_TIMESTAMP    | DEFAULT_GENERATED |
+----------------+-------------+------+-----+----------------------+-------------------+
```

## 検証結果のまとめ

それぞれの比較結果を記載していきます。

### アプリ=JST,DB=JST

アプリ・DB がそれぞれ JST の場合、次のようになりました。

```js
"2022-08-07T06:18:51.774Z" // JST 2022/8/7 15:18
// DBに登録されていた値
{
  "userInputDate1": "2022-08-07T06:18:51.761Z",
  "createdAt1": "2022-08-07T06:18:52.000Z",
  "createdAt2": "2022-08-07T15:18:51.000Z",
  "createdAt3": "2022-08-07T06:18:51.763Z",
  "createdAt4": "2022-08-07T06:18:52.000Z",
  "createdAt5": "2022-08-07T15:18:51.000Z"
}
// JSTに変換した値
{
  "userInputDate1": "2022/8/7 15:18:51",
  "createdAt1": "2022/8/7 15:18:52",
  "createdAt2": "2022/8/8 0:18:51",
  "createdAt3": "2022/8/7 15:18:51",
  "createdAt4": "2022/8/7 15:18:52",
  "createdAt5": "2022/8/8 0:18:51"
}
```

createdAt2 および createdAt5 で JST 基準で+9 時間ずれが発生しています。

一方で MySQL を直接参照しにいくと、、、

```
mysql> show variables like '%time_zone%';
+------------------+------------+
| Variable_name    | Value      |
+------------------+------------+
| system_time_zone | JST        |
| time_zone        | Asia/Tokyo |
+------------------+------------+
2 rows in set (0.00 sec)

mysql> select * from User\G
*************************** 1. row ***************************
            id: 7
userInputDate1: 2022-08-07 06:18:51.761
    createdAt1: 2022-08-07 06:18:52
    createdAt2: 2022-08-07 15:18:51
    createdAt3: 2022-08-07 06:18:51.763
    createdAt4: 2022-08-07 06:18:52
    createdAt5: 2022-08-07 15:18:51
1 row in set (0.00 sec)
```

createdAt2 createdAt5 以外で JST 基準で-9 時間のズレが発生していました。

### アプリ=UTC,DB=JST

アプリ・DB がそれぞれ UTC・JST の場合、次のようになりました。

```js
"2022-08-07T06:34:40.209Z" // JST 2022/8/7 15:34
{
  "userInputDate1": "2022-08-07T06:34:40.193Z",
  "createdAt1": "2022-08-07T06:34:40.000Z",
  "createdAt2": "2022-08-07T15:34:40.000Z",
  "createdAt3": "2022-08-07T06:34:40.195Z",
  "createdAt4": "2022-08-07T06:34:40.000Z",
  "createdAt5": "2022-08-07T15:34:40.000Z"
}
{
  "userInputDate1": "2022/8/7 6:34:40",
  "createdAt1": "2022/8/7 6:34:40",
  "createdAt2": "2022/8/7 15:34:40",
  "createdAt3": "2022/8/7 6:34:40",
  "createdAt4": "2022/8/7 6:34:40",
  "createdAt5": "2022/8/7 15:34:40"
}
```

reatedAt2 createdAt5 について以外で UTC 基準で+9 時間のずれが発生していました。

※`Date#toLocaleString`はアプリケーションのタイムゾーンに合わせて計算するため、このケースの場合は UTC 時間が出力される。

```
mysql> show variables like '%time_zone%';
+------------------+------------+
| Variable_name    | Value      |
+------------------+------------+
| system_time_zone | JST        |
| time_zone        | Asia/Tokyo |
+------------------+------------+
2 rows in set (0.00 sec)

mysql> select * from User\G;
*************************** 1. row ***************************
            id: 8
userInputDate1: 2022-08-07 06:34:40.193
    createdAt1: 2022-08-07 06:34:40
    createdAt2: 2022-08-07 15:34:40
    createdAt3: 2022-08-07 06:34:40.195
    createdAt4: 2022-08-07 06:34:40
    createdAt5: 2022-08-07 15:34:40
1 row in set (0.00 sec)
```

DB も同様に、createdAt2 createdAt5 以外で JST 基準で-9 時間のずれが発生していました。

### アプリ=JST,DB=UTC

アプリ・DB がそれぞれ JST・UTC の場合、次のようになりました。

```js
"2022-08-07T06:49:20.806Z" // JST 2022/8/7 15:49
{
  "id": 2,
  "userInputDate1": "2022-08-07T06:49:20.795Z",
  "createdAt1": "2022-08-07T06:49:21.000Z",
  "createdAt2": "2022-08-07T06:49:20.000Z",
  "createdAt3": "2022-08-07T06:49:20.797Z",
  "createdAt4": "2022-08-07T06:49:21.000Z",
  "createdAt5": "2022-08-07T06:49:20.000Z"
}
{
  "userInputDate1": "2022/8/7 15:49:20",
  "createdAt1": "2022/8/7 15:49:21",
  "createdAt2": "2022/8/7 15:49:20",
  "createdAt3": "2022/8/7 15:49:20",
  "createdAt4": "2022/8/7 15:49:21",
  "createdAt5": "2022/8/7 15:49:20"
}
```

全ての値が JST 基準でズレが発生していませんでした。

ぱっと見問題なさそうに見えますが、DB では違った結果となりました。

```
mysql> show variables like '%time_zone%';
+------------------+--------+
| Variable_name    | Value  |
+------------------+--------+
| system_time_zone | UTC    |
| time_zone        | SYSTEM |
+------------------+--------+
2 rows in set (0.01 sec)

mysql> select * from User\G
*************************** 1. row ***************************
            id: 2
userInputDate1: 2022-08-07 06:49:20.795
    createdAt1: 2022-08-07 06:49:21
    createdAt2: 2022-08-07 06:49:20
    createdAt3: 2022-08-07 06:49:20.797
    createdAt4: 2022-08-07 06:49:21
    createdAt5: 2022-08-07 06:49:20
1 row in set (0.01 sec)

mysql> set time_zone='Asia/Tokyo';
Query OK, 0 rows affected (0.00 sec)

mysql> select * from User\G
*************************** 1. row ***************************
            id: 2
userInputDate1: 2022-08-07 06:49:20.795
    createdAt1: 2022-08-07 15:49:21
    createdAt2: 2022-08-07 15:49:20
    createdAt3: 2022-08-07 06:49:20.797
    createdAt4: 2022-08-07 06:49:21
    createdAt5: 2022-08-07 06:49:20
1 row in set (0.01 sec)

mysql>
```

DB は、createdAt1, createdAt2 (Timestamp 型)のもの以外は、JST で表示した場合、
-9 時間のズレが発生しました。

### アプリ=UTC,DB=UTC

アプリおよび DB が UTC のケースです。

```js
"2022-08-07T07:00:05.604Z" // JST 2022/8/7 16:00
{
  "id": 3,
  "userInputDate1": "2022-08-07T07:00:05.592Z",
  "createdAt1": "2022-08-07T07:00:06.000Z",
  "createdAt2": "2022-08-07T07:00:05.000Z",
  "createdAt3": "2022-08-07T07:00:05.594Z",
  "createdAt4": "2022-08-07T07:00:06.000Z",
  "createdAt5": "2022-08-07T07:00:05.000Z"
}
{
  "userInputDate1": "2022/8/7 7:00:05",
  "createdAt1": "2022/8/7 7:00:06",
  "createdAt2": "2022/8/7 7:00:05",
  "createdAt3": "2022/8/7 7:00:05",
  "createdAt4": "2022/8/7 7:00:06",
  "createdAt5": "2022/8/7 7:00:05"
}
```

出力自体は UTC 基準では問題ないように見えます。

```
mysql> show variables like '%time_zone%';
+------------------+--------+
| Variable_name    | Value  |
+------------------+--------+
| system_time_zone | UTC    |
| time_zone        | SYSTEM |
+------------------+--------+
2 rows in set (0.01 sec)

mysql> select * from User\G
*************************** 1. row ***************************
            id: 3
userInputDate1: 2022-08-07 07:00:05.592
    createdAt1: 2022-08-07 07:00:06
    createdAt2: 2022-08-07 07:00:05
    createdAt3: 2022-08-07 07:00:05.594
    createdAt4: 2022-08-07 07:00:06
    createdAt5: 2022-08-07 07:00:05
1 row in set (0.00 sec)

mysql> set time_zone='Asia/Tokyo';
Query OK, 0 rows affected (0.00 sec)

mysql> select * from User\G
*************************** 1. row ***************************
            id: 3
userInputDate1: 2022-08-07 07:00:05.592
    createdAt1: 2022-08-07 16:00:06
    createdAt2: 2022-08-07 16:00:05
    createdAt3: 2022-08-07 07:00:05.594
    createdAt4: 2022-08-07 07:00:06
    createdAt5: 2022-08-07 07:00:05
1 row in set (0.00 sec)
```

DB は、createdAt1, createdAt2 (Timestamp 型)のもの以外は、JST で表示した場合、
-9 時間のズレが発生しました。

## 結果

| アプリケーション x DB =     | JSTxJST | UTCxJST | JSTxUTC | UTCxUTC |
| --------------------------- | ------- | ------- | ------- | ------- |
| 1 Prisma 生成 Timestamp 型  |         |         | ○       | ○       |
| 2 DB 生成 Timestamp 型      |         | ○       | ○       | ○       |
| 3 Prisma 生成 DateTime(3)型 |         |         |         |         |
| 4 Prisma 生成 DateTime 型   |         |         |         |         |
| 5 DB 生成 DateTime 型       |         |         |         |         |

`○` = DB とアプリケーションの両環境で JST と UTC の両パターンの表示で問題ないことを確認

この結果から JST が必要な場合でも

- DB は UTC で構築する
- 型に Timestamp 型を利用する
  - ただし、Timestamp型自体は2038年問題を抱えており、対策を別途検討しなければならない

という苦しい条件での構築になると思いました。

## 余談

余談ですが、Prisma 側でコネクション作成時に `set time_zone='Asia/Tokyo';`を試しましたが上手くいかなかったです。

バージョンアップでオプションが付いてくれると嬉しいですね。

## 現在の実装方針

この記事はPrisma 4.1.1での検証結果です。DateTimeの変換挙動やdriverは更新されるため、現在のPrisma・database・Node.jsの組み合わせで再テストしてください。

原則として、保存時はUTCの絶対時刻に統一し、表示時に利用者のタイムゾーンへ変換します。

```ts
const createdAt = new Date();
await prisma.event.create({
  data: { createdAt },
});

const formatter = new Intl.DateTimeFormat('ja-JP', {
  dateStyle: 'medium',
  timeStyle: 'long',
  timeZone: 'Asia/Tokyo',
});

console.log(formatter.format(createdAt));
```

`DATETIME` と `TIMESTAMP` はMySQL側のタイムゾーン変換、値域、defaultの挙動が異なります。2038年以降を扱う、過去のローカル時刻をそのまま保持する、DB関数で生成する、といった要件があれば型選定を個別に行います。

## 再検証チェックリスト

- `SELECT VERSION()` とPrisma/driverのバージョンを記録する
- DBサーバー・セッション・アプリのタイムゾーンを明示する
- `@@global.time_zone` と `@@session.time_zone` を確認する
- 夏時間の切り替わり前後を含む地域でテストする
- Prisma生成時刻とDB default生成時刻を分けて確認する
- JSON/APIの契約ではISO 8601とoffsetの扱いを決める
- UTCへの正規化と表示変換の境界をテストする

「JSTの壁時計時刻」だけを保存したい値（営業時間など）と、「世界で一意な瞬間」を表す値（作成日時など）を同じ設計にしないことも重要です。

## 参考にしたサイト

- [Improve Timezone Support for Existing MySQL Databases configured with a Non-UTC Timezone #5051](https://github.com/prisma/prisma/issues/5051)
- [DateTime timezone #4153](https://github.com/prisma/prisma/discussions/4153)
- [Prisma で UTC 以外の Timezone を扱いたい](https://zenn.dev/yu46/articles/5cbb3f9e224944)
- [Prisma schema: DateTime](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#datetime)
- [MySQL: The DATE, DATETIME, and TIMESTAMP Types](https://dev.mysql.com/doc/refman/8.4/en/datetime.html)
