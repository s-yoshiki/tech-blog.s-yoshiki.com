---
title: "NestJS + Prisma で Stream を用いた file download"
path: "/entry/311"
date: "2023-03-19 19:30"
coverImage: "../../../images/thumbnail/prisma-logo.png"
author: "s-yoshiki"
tags: ["nestjs", "prisma", "node.js", "typescript", "axios"]
---

## 概要

NestJS + Prisma 構成のアプリケーションについて
[Stream](https://nodejs.org/api/stream.html)を利用してファイルダウンロードを実装した際のメモです。
これらの機能を作った際のメモです。

## 目的

```ts
import { Controller, Get, StreamableFile } from "@nestjs/common";
import { createReadStream } from "fs";
import { join } from "path";

@Controller("file")
export class FileController {
  @Get()
  getFile(): StreamableFile {
    const file = createReadStream(join(process.cwd(), "package.json"));
    return new StreamableFile(file);
  }
}
```

[Streaming Files | NestJS - A progressive Node.js framework](https://docs.nestjs.com/techniques/streaming-files)

これは、NestJS のドキュメントで紹介されている StreamableFile を利用したファイルダウンロードのサンプルです。
すでに存在するファイルをダウンロードする場合は、この方法だけでも十分ですが、大量のレコードを DB から取得して CSV ファイルとしてダウンロードする場合は、取得したレコードを一旦ファイルに書き出してからダウンロードすると、メモリ消費量が多く、時間がかかってしまいます。

そこで、Stream を利用して、1 件ずつ CSV のレコードとしてレスポンスを返すことで、これらの問題を解決することが本記事の目的です。

## NestJS + Prisma

[Prisma | NestJS - A progressive Node.js framework](https://docs.nestjs.com/recipes/prisma)

に書かれてい手順で NestJS + Prisma アプリケーションを作成します。

具体的なコードは省きます。

また、Prisma について以下のスキーマを定義しておきます。

```prisma
model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
}
```

## Stream オブジェクト生成機能の作成

PrismaClient を継承する PrismaService について
レコードを(擬似的に)1 行取得するたびに Stream オブジェクトに push するメソッド `$createReadableStream` を実装します。

```ts
import { INestApplication, Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { Readable } from "stream";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on("beforeExit", async () => {
      await app.close();
    });
  }

  public $createReadableStream<Record>(
    getRecords: (prisma: PrismaService) => Record[] | Promise<Record[]>,
    fetchRow: (row: Record) => Buffer | Uint8Array
  ): Readable {
    let buffer: Record[] = [];
    const getItems = async (): Promise<boolean> => {
      const res = await getRecords(this);
      if (!res || res === null || (Array.isArray(res) && res.length === 0)) {
        return false;
      }
      buffer = res;
      return true;
    };
    return new Readable({
      objectMode: true,
      async read() {
        if (buffer.length === 0) {
          if (!(await getItems())) {
            this.push(null);
            return;
          }
        }
        const value = buffer.shift();
        if (!value) {
          this.push(null);
          return;
        }
        this.push(fetchRow(value));
      },
    });
  }
}
```

## ダウンロードの実装

`PrismaService` の `$createReadableStream` を利用して`Stream`を生成するメソッドを実装します。

**app.service.ts**

```ts
import { Injectable, StreamableFile } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { User } from "@prisma/client";

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  getUserStream() {
    const chunksize = 10;
    let skip = 0;
    return this.prisma.$createReadableStream<User>(
      async (prisma: PrismaService): Promise<User[]> => {
        const res = await prisma.user.findMany({
          orderBy: {
            id: "desc",
          },
          take: chunksize,
          skip,
        });
        skip += res.length;
        return res;
      },
      (user: User): Buffer => {
        return Buffer.from([user.id, user.email, user.name].join(",") + "\n");
      }
    );
  }

  getFileDownloadStream() {
    const reader = this.getUserStream();
    return new StreamableFile(reader, {
      disposition: `attachment; filename="test.csv"`,
    });
  }
}
```

**app.controller.ts**

```ts
import { Controller, Get, Header, StreamableFile } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly service: AppService) {}

  @Get("download")
  @Header("Content-Type", "text/csv")
  getFile(): StreamableFile {
    return this.service.getFileDownloadStream();
  }
}
```

## 動作確認

```
curl http://localhost:3000/download
```

curl を叩いてレスポンスが返ってきたら成功です。
レコード取得処理に sleep 処理を挟むと 1 件ごとに遅延が発生するので分かりやすいと思います。

## クライアント側の実装

クライアント側は fetch や axios を利用してデータを取得することができます。

### fetch の例

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Fetch APIを使ったストリームでのデータ取得のサンプル</title>
  </head>
  <body>
    <textarea id="data" style="width:500px; height:500px;"></textarea>
    <script>
      async function getData() {
        const response = await fetch("http://localhost:3000/download", {
          method: "GET",
        });

        if (!response.body) {
          throw new Error("ReadableStream not supported in this browser.");
        }

        const reader = response.body.getReader();

        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            console.log("Stream finished.");
            break;
          }
          const decoded = new TextDecoder().decode(value);
          document.getElementById("data").value += decoded;
        }
      }
      getData();
    </script>
  </body>
</html>
```

### axios の例

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Axiosを使ったストリームでのデータ取得のサンプル</title>
  </head>
  <body>
    <textarea id="data" style="width:500px; height:500px;"></textarea>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script>
      async function getData() {
        const response = await axios({
          method: "GET",
          url: "http://localhost:3000/download",
          responseType: "stream",
        });

        if (!response.data) {
          throw new Error("ReadableStream not supported in this browser.");
        }

        const reader = response.data.getReader();

        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            console.log("Stream finished.");
            break;
          }

          const decoded = new TextDecoder().decode(value);
          document.getElementById("data").value += decoded;
        }
      }

      getData();
    </script>
  </body>
</html>
```

## 参考にしたサイト

- [Streams · Issue #5055 · prisma/prisma](https://github.com/prisma/prisma/issues/5055)
- [ストリーム API - Web API | MDN](https://developer.mozilla.org/ja/docs/Web/API/Streams_API)
  - [ReadableStream - Web API | MDN](https://developer.mozilla.org/ja/docs/Web/API/ReadableStream)
- [Node.js Streamに入門してみた | DevelopersIO](https://dev.classmethod.jp/articles/node-js-stream-newbie/)
- [Stream | Node.js v19.8.1 Documentation](https://nodejs.org/api/stream.html)