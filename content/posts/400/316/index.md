---
title: "NestJSでBasic認証"
path: "/entry/316"
date: "2023-07-08 16:30"
coverImage: "../../../images/thumbnail/nestjs-logo.png"
author: "s-yoshiki"
tags: ["nestjs", "typescript", "node.js"]
---

## 概要

NestJSでBasic認証機能付きAPIを構築した際のメモです。

## Strategey を利用する

以下、実装です。


**path/to/basic-auth.ts**


```ts
import { BasicStrategy as Strategy } from 'passport-http';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

@Injectable()
export class BasicAuthStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super();
  }

  validate(username: string, password: string): boolean {
    if (username === 'user1' && password === 'password') {
      return true;
    } else {
      throw new UnauthorizedException();
    }
  }
}

@Injectable()
export class BasicAuthGuard extends AuthGuard('basic') {}

@Module({
  imports: [PassportModule],
  providers: [BasicAuthStrategy],
})
export class BasicAuthModule {}
```

**app.module.ts**

```ts
@Module({
  controllers: [AppController],
  imports: [BasicAuthModule],
})
export class AppModule {}
```

**app.controller.ts**

```ts
import { Controller, Get, UseGuards } from '@nestjs/common';
import { BasicAuthGuard } from 'path/to/basic-auth';

@Controller()
@UseGuards(BasicAuthGuard)
export class AppController {
  @Get()
  index() {
    return { message: 'hello' };
  }
}
```

**実行結果**

以下のような形でリクエストを送ることができます。

```sh
# 認証情報が無いと拒否される
$ curl http://localhost:3000
{"statusCode":401,"message":"Unauthorized"}
```

```sh
$ curl http://user1:password@localhost:3000
{"message":"hello"}
```

```sh
$ curl \
 -H "Authorization: Basic `echo -n user1:password | base64`" \
 http://localhost:3000
```

```sh
$ curl \
 -H "Authorization: Basic dXNlcjE6cGFzc3dvcmQ=" \
 http://localhost:3000
```