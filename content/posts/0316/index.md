---
title: "NestJSでBasic認証"
path: "/entry/316"
date: "2023-07-08 16:30"
coverImage: "../../../images/thumbnail/nest-logo.png"
author: "s-yoshiki"
tags: ["nestjs", "typescript", "node.js"]
---

## 概要

NestJSでBasic認証機能付きAPIを構築した際のメモです。

## Strategy を利用する

`passport-http` のBasic StrategyをNestJSのGuardとして組み込みます。

```shell
npm install @nestjs/passport passport passport-http
npm install --save-dev @types/passport-http
```

以下、最小構成の実装です。


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

  validate(username: string, password: string) {
    const expectedUser = process.env.BASIC_AUTH_USER;
    const expectedPassword = process.env.BASIC_AUTH_PASSWORD;

    if (username === expectedUser && password === expectedPassword) {
      return { username };
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
 -u "$BASIC_AUTH_USER:$BASIC_AUTH_PASSWORD" \
 http://localhost:3000
```

```sh
$ curl \
 -H "Authorization: Basic dXNlcjE6cGFzc3dvcmQ=" \
 http://localhost:3000
```

## Basic認証を使う際の注意点

Basic認証の資格情報は暗号化されず、Base64で表現されるだけです。本番環境では必ずHTTPSを使ってください。

- ユーザー名・パスワードをソースコードやGitへ保存しない
- ログ、例外、監視ツールに `Authorization` ヘッダーを出力しない
- 比較的単純な社内ツールや一時的な保護に用途を限定する
- 公開APIや細かな権限制御が必要な場合は、JWT、OAuth 2.0/OIDCなどを検討する
- 総当たり攻撃に備えて、リバースプロキシやAPI Gateway側でもレート制限を行う

URLへ `http://user:password@...` の形式で資格情報を書くと、シェル履歴やログへ残りやすいため、curlでは `-u` と環境変数を利用する方が安全です。

## テスト例

```ts
import { Test } from '@nestjs/testing';

describe('BasicAuthStrategy', () => {
  it('正しい資格情報ならユーザーを返す', async () => {
    process.env.BASIC_AUTH_USER = 'user1';
    process.env.BASIC_AUTH_PASSWORD = 'password';

    const strategy = new BasicAuthStrategy();
    expect(strategy.validate('user1', 'password')).toEqual({
      username: 'user1',
    });
  });
});
```

実運用では平文の環境変数を直接比較する代わりに、Secret Manager等から値を取得し、必要ならタイミング攻撃を避ける比較方法も検討してください。

## 参考

- [NestJS Authentication](https://docs.nestjs.com/security/authentication)
- [NestJS Passport recipe](https://docs.nestjs.com/recipes/passport)
- [passport-http](https://github.com/jaredhanson/passport-http)
