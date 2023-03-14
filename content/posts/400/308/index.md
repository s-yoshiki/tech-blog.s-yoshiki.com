---
title: "NestJS Prisma Zod OpenAPI で型を堅牢にしたアプリケーションの開発"
path: "/entry/308"
date: "2023-03-13 18:30"
coverImage: "../../../images/thumbnail/nestjs-logo.png"
author: "s-yoshiki"
tags: ["nestjs", "prisma", "node.js", "typescript", "zod", "openapi"]
---

## NestJS のセットアップ

まず、NestJS をセットアップするために、以下のコマンドを実行します。

```sh
npm install -g @nestjs/cli
nest new myapp
```

その後、パッケージマネージャを選択するように求められるので、適当なものを選択します。

## Prisma のセットアップ

次に、Prisma をセットアップするために、以下のコマンドを実行します

```
cd myapp
npm install prisma --save-dev
```

Prisma のスキーマを初期化します。

```
npx prisma init
```

### Schema の定義

以下のスキーマを定義します。

**schema/prisma.schema**

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  posts Post[]
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean? @default(false)
  author    User?    @relation(fields: [authorId], references: [id])
  authorId  Int?
}
```

.env に DB の接続情報を定義します。今回は sqlite を利用します。

**.env**

```shell
DATABASE_URL="file:./dev.db"
```

以下のコマンドを使用して、データベースをプッシュします。

```shell
npx prisma db push
```

ここまでできたら確認のために sqlite に入ります。

```shell
sqlite3 prisma/dev.db
```

以下のコマンドを使用して、テーブルの存在を確認します。

```sql
sqlite> .schema User
CREATE TABLE IF NOT EXISTS "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT
);
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
```

テストデータを投入します。

```sql
sqlite> insert into user (email, name) values ('test@example.com', 'test user');
sqlite> select * from User;
1|test@example.com|test user
sqlite>
```

### PrismaService の作成

**src/prisma.service.ts**

```ts
import { INestApplication, Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

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
}
```

## Zod 導入

まずは tsconfig を調整します。
これが正しい設定でないと zod が機能しませんでした。

**tsconfig.json**

```js
{
  "compilerOptions": {
    // 略
    "strict": true, // trueにする
    // "strictNullChecks": false, //これがfalseだと正しく動作しない
  }
}
```

そして zod と nestjs-zod をインストールします。

```shell
npm install zod nestjs-zod
```

## エンドポイントの作成

`http://localhost:3000/user`の CRUD が行えるエンドポイントを作成していきます。

### リソース作成

次のコマンドで基本的なリソースを作成します。

```shell
npx nest generate resource user
```

質問では RESTfull API を選択します。

これで controller service dto クラスが生成されます。

### コード編集

コードを次のように変更します。

**src/user/user.controller.ts**

```ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ZodValidationPipe } from "nestjs-zod";

@Controller("user")
@UsePipes(ZodValidationPipe) // Validationを有効にする
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.userService.remove(+id);
  }
}
```

**src/user/user.service.ts**

```ts
import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    return await this.prisma.user.create({
      data: dto,
    });
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.user.findFirst({
      where: {
        id,
      },
    });
  }

  async update(id: number, dto: UpdateUserDto) {
    return await this.prisma.user.update({
      data: dto,
      where: {
        id,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
```

**CreateUserDto**について zod を利用してスキーマを定義します。

**src/user/dto/create-user.dto.ts**

```ts
import { createZodDto } from "@anatine/zod-nestjs";
import type { Prisma } from "@prisma/client";
import { z } from "zod";

const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z
  .object({
    id: z.number().int(),
    email: z.string().email(),
    name: z.string().optional(),
  })
  .omit({ id: true });

export class CreateUserDto extends createZodDto(UserCreateInputSchema) {}
```

**UpdateUserDto**についても同様に定義します。

**src/user/dto/update-user.dto.ts**

```ts
import { createZodDto } from "@anatine/zod-nestjs";
import type { Prisma } from "@prisma/client";
import { z } from "zod";

export class UpdateUserDto extends createZodDto(
  z.object({
    email: z.string().email(),
    name: z.string().optional(),
  })
) {}
```

これでソースの変更は完了です。

### 動作検証

次のコマンドでサーバを起動します。

```
npm run start
```

GET で叩くとデータを返してくれます。

```shell
curl --location --request GET 'http://localhost:3000/user' \
--header 'Content-Type: application/json'
```

```json
[
  {
    "id": 1,
    "email": "test@example.com",
    "name": "test user"
  }
]
```

POST で不正な形式(email のフォーマットが不正)で叩くとエラーを返します。

```shell
curl --location 'http://localhost:3000/user' \
--header 'Content-Type: application/json' \
--data '{
    "email": "xxx",
    "name": "xxx"
}'
```

```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "errors": [
    {
      "validation": "email",
      "code": "invalid_string",
      "message": "Invalid email",
      "path": ["email"]
    }
  ]
}
```

正常系は次の通りです。

```shell
curl --location 'http://localhost:3000/user' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "xxx@example.com",
    "name": "xxx"
}'
```

```json
{
  "id": 2,
  "email": "xxx@example.com",
  "name": "xxx"
}
```

## OpenAPI の組み込み

Comming soon...

<!-- ## 関連モジュール

### zod-prisma-types

```
npm install zod-prisma-types
```

### @anatine/zod-nestjs



### zod-nestjs

[zod-plugins/packages/zod-nestjs at main · anatine/zod-plugins](https://github.com/anatine/zod-plugins/tree/main/packages/zod-nestjs)

```
npm install openapi3-ts zod @anatine/zod-nestjs
``` -->

## 参考にしたサイト

- [Prisma | NestJS - A progressive Node.js framework](https://docs.nestjs.com/recipes/prisma)
- [risenforces/nestjs-zod: All NestJS + Zod utilities you need](https://github.com/risenforces/nestjs-zod#readme)
- [Generators (Reference)](https://www.prisma.io/docs/concepts/components/prisma-schema/generators)
