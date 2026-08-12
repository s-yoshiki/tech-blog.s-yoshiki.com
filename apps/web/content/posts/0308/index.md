---
title: "NestJS Prisma Zod OpenAPI で型を堅牢にする"
path: "/entry/308"
date: "2023-03-13 18:30"
coverImage: "../../../images/thumbnail/nest-logo.png"
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

### CRUD リソース作成

次のコマンドで基本的なリソース(GET,POST,PATCH,DELETE のエンドポイント)を作成します。

```shell
npx nest generate resource user
```

質問では RESTfull API を選択します。

これで controller service dto クラスが生成されます。

### コード編集

コードを次のように変更します。

**src/user/entity/user.entity.ts**

ここでは Input/Update の際に利用する Dto や型を定義します。

```ts
import type { Prisma, User } from "@prisma/client";
import { createZodDto } from "nestjs-zod";
import { z } from "zod";

const user = z.object({
  id: z.number().int(),
  email: z.string().email("形式が不正です"),
  name: z.string().max(255, "255字未満で入力してください"),
});

// id は autoincrement で生成されるので除外する
export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> =
  user.omit({ id: true });

export const UserUpdateInputSchema: z.ZodType<Prisma.UserCreateInput> = user;

export const UserResponseSchema: z.ZodType<User> = user;

export type UserCreateInput = z.infer<typeof UserCreateInputSchema>;

export type UserUpdateInput = z.infer<typeof UserCreateInputSchema>;

export type UserResponse = z.infer<typeof UserResponseSchema>;

export class UserCreateInputDto extends createZodDto(UserCreateInputSchema) {}

export class UserUpdateInputDto extends createZodDto(UserUpdateInputSchema) {}
```

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
import { UserCreateInputDto, UserUpdateInputDto } from "./entities/user.entity";
import { ZodValidationPipe, zodToOpenAPI } from "nestjs-zod";

@Controller("user")
@ApiTags("user")
@UsePipes(ZodValidationPipe)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() dto: UserCreateInputDto) {
    return this.userService.create(dto);
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
  async update(@Param("id") id: string, @Body() dto: UserUpdateInputDto) {
    return this.userService.update(+id, dto);
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
import {
  UserCreateInput,
  UserResponse,
  UserUpdateInput,
} from "./entities/user.entity";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: UserCreateInput): Promise<UserResponse> {
    return await this.prisma.user.create({
      data: dto,
    });
  }

  async findAll(): Promise<UserResponse[]> {
    return await this.prisma.user.findMany();
  }

  async findOne(id: number): Promise<UserResponse | null> {
    return await this.prisma.user.findFirst({
      where: {
        id,
      },
    });
  }

  async update(id: number, dto: UserUpdateInput): Promise<UserResponse> {
    return await this.prisma.user.update({
      data: dto,
      where: {
        id,
      },
    });
  }

  async remove(id: number): Promise<UserResponse> {
    return await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
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
      "message": "形式が不正です",
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

さらに`@nestjs/swagger`モジュールを利用して OpenAPI のドキュメントを自動生成するように設定します。

まず `@nestjs/swagger` をインストールします。

```
npm install --save @nestjs/swagger
```

**src/main.ts**

http://localhost:3000/docs にて Swagger の Viewer が表示されるように調整します。

```ts
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { INestApplication } from "@nestjs/common";

const createDocument = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle("test")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  createDocument(app);
  await app.listen(3000);
}
bootstrap();
```

**src/user/user.controller.ts**

Swagger 用のデコレータを追加してオブジェクトが表示されるように修正します。

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
import {
  UserCreateInputSchema,
  UserCreateInputDto,
  UserUpdateInputDto,
  UserResponseSchema,
} from "./entities/user.entity";
import { ZodValidationPipe, zodToOpenAPI } from "nestjs-zod";
import { ApiBody, ApiOkResponse, ApiTags } from "@nestjs/swagger";

@Controller("user")
@ApiTags("user")
@UsePipes(ZodValidationPipe)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiBody({
    schema: zodToOpenAPI(UserCreateInputSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(UserResponseSchema),
  })
  async create(@Body() dto: UserCreateInputDto) {
    return this.userService.create(dto);
  }

  @Get()
  @ApiOkResponse({
    schema: zodToOpenAPI(UserResponseSchema),
  })
  async findAll() {
    return this.userService.findAll();
  }

  @Get(":id")
  @ApiOkResponse({
    schema: zodToOpenAPI(UserResponseSchema),
  })
  async findOne(@Param("id") id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(":id")
  @ApiBody({
    schema: zodToOpenAPI(UserCreateInputSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(UserResponseSchema),
  })
  async update(@Param("id") id: string, @Body() dto: UserUpdateInputDto) {
    return this.userService.update(+id, dto);
  }

  @Delete(":id")
  @ApiOkResponse({
    schema: zodToOpenAPI(UserResponseSchema),
  })
  async remove(@Param("id") id: string) {
    return this.userService.remove(+id);
  }
}
```

## 参考にしたサイト

- [Prisma | NestJS - A progressive Node.js framework](https://docs.nestjs.com/recipes/prisma)
- [risenforces/nestjs-zod: All NestJS + Zod utilities you need](https://github.com/risenforces/nestjs-zod#readme)
- [Generators (Reference)](https://www.prisma.io/docs/concepts/components/prisma-schema/generators)
