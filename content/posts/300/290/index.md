---
title: "[NestJS]少し大きな規模のRESTfull APIを構築するディレクトリ構成を考えてみる"
path: "/entry/290"
date: "2022-09-04 18:00"
coverImage: "../../../images/thumbnail/nest-logo.png"
author: "s-yoshiki"
tags: ["nestjs", "typescript", "アーキテクチャ", "node.js", "javascript"]
---

## 概要

NestJSで少し大きな規模のRESTfull APIを構築するディレクトリ構成を考えてみました。
行おうと思った経緯と具体的な構成および構築方法について記載してます。

## 経緯

**モジュラモノリスっぽいことをやりたい**

※モジュラモノリス=モノリスと同様に単一リポジトリ・単一デプロイは維持するが、内部のソフトウェアの部品はモジュール単位で分割された状態と定義

アプリケーションの規模が大きくなり何らかの形で分割したいなと思ってましたが、
マイクロサービスを導入するほど大掛かりなこともやりたくないろ感じていた時に、
アプリケーションの中でモジュールという単位でビジネスロジックを線引きを行うことができる "モジュラモノリス" という単語が目に入り試してみようと思いました。

## やりたいこと

やりたいことを次のように仮定します。

1. RESTfull API を構築する
1. APIのパスにバージョン名を入れてバージョニングを行う
1. APIは一般公開向けと管理系の2つに大きく分かれる
1. APIはユーザ・アイテムといったリソース情報を返却する
  1. これらのリソースを一般公開系けと管理系それぞれで利用する
  1. 管理系のレスポンスは機微な情報が含まれることを想定し一般系の混同利用は避ける

具体的にAPIのエンドポイントは以下となります。

```
GET /v1/front/users
POST /v1/front/users
PATCH /v1/front/users
DELETE /v1/front/users
GET /v1/front/projects
...略
GET /v1/front/issues
...略
GET /v1/admin/users
...略
GET /v2/admin/users
```


## ディレクトリ構成

結果的にディレクトリは以下の構成になりました。

```shell
./src
├── app.controller.ts
├── app.module.ts
├── app.service.ts
├── main.ts
├── v1
│   ├── admin
│   │   ├── admin.module.ts
│   │   ├── issues
│   │   │   ├── issues.controller.ts
│   │   │   ├── issues.module.ts
│   │   │   └── issues.service.ts
│   │   ├── projects
│   │   │   ├── projects.controller.ts
│   │   │   ├── projects.module.ts
│   │   │   └── projects.service.ts
│   │   └── users
│   │       ├── users.controller.ts
│   │       ├── users.module.ts
│   │       └── users.service.ts
│   ├── front
│   │   ├── front.module.ts
│   │   ├── issues
│   │   │   ├── issues.controller.ts
│   │   │   ├── issues.module.ts
│   │   │   └── issues.service.ts
│   │   ├── projects
│   │   │   ├── projects.controller.ts
│   │   │   ├── projects.module.ts
│   │   │   └── projects.service.ts
│   │   └── users
│   │       ├── users.controller.ts
│   │       ├── users.module.ts
│   │       └── users.service.ts
│   └── v1.module.ts
└── v2　#おまけ
    ├── front
    │   ├── front.module.ts
    │   └── users
    │       ├── users.controller.ts
    │       ├── users.module.ts
    │       └── users.service.ts
    └── v2.module.ts
```


## プロジェクト作成

```shell
$ npx nest new nest-test
```

```shell
$ npx nest generate module v1
# CREATE src/v1/v1.module.ts (79 bytes)
# UPDATE src/app.module.ts (300 bytes)
```

```shell
$ npx nest generate module v1/front
# CREATE src/v1/front/front.module.ts (82 bytes)
# UPDATE src/v1/v1.module.ts (157 bytes)
$ npx nest generate module v1/admin
```


```shell
$ npx nest generate resource v1/front/users
# ? What transport layer do you use? REST API
# ? Would you like to generate CRUD entry points? Yes
# CREATE src/v1/front/users/users.controller.spec.ts (566 bytes)
# CREATE src/v1/front/users/users.controller.ts (894 bytes)
# CREATE src/v1/front/users/users.module.ts (247 bytes)
# CREATE src/v1/front/users/users.service.spec.ts (453 bytes)
# CREATE src/v1/front/users/users.service.ts (609 bytes)
# CREATE src/v1/front/users/dto/create-user.dto.ts (30 bytes)
# CREATE src/v1/front/users/dto/update-user.dto.ts (169 bytes)
# CREATE src/v1/front/users/entities/user.entity.ts (21 bytes)
# UPDATE src/v1/front/front.module.ts (160 bytes)
$ npx nest generate resource v1/front/projects
$ npx nest generate resource v1/front/issues
```

```shell
$ npx nest generate resource v1/admin/users
$ npx nest generate resource v1/admin/projects
$ npx nest generate resource v1/admin/issues
```

```shell
$ npx nest generate module v2
$ npx nest generate module v2/front
$ npx nest generate resource v2/front/users
```

これでファイル・ディレクトリの構成は完成です。
しかしこの状態で起動してもエンドポイントが期待通りマッピングされませんでした。

`RouterModule`を利用して解決することにしました。

具体的にはモジュールファイルに対して次のような変更を行います。

例: `src/v1/front/front.module.ts` の場合

**変更前**

```ts
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { IssuesModule } from './issues/issues.module';

@Module({
  imports: [UsersModule, ProjectsModule, IssuesModule]
})
export class FrontModule {}
```


**変更後**

```ts
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { IssuesModule } from './issues/issues.module';
import { RouterModule } from '@nestjs/core';

const path = 'v1/front'
const modules = [
  UsersModule,
  ProjectsModule,
  IssuesModule,
];
@Module({
  imports: [
    ...modules,
    ...modules.map(module => RouterModule.register([{
      path,
      module,
    }]))
  ]
})
export class FrontModule {}
```

これを

- src/v1/front/front.module.ts
- src/v1/admin/admin.module.ts

等に設定を行います。

これでベースのエンドポイントの調整が可能となります。

```shell
$ curl http://localhost:3000/v1/front/users/1
# This action returns a #1 user%  
```

## 参考にしたサイト

1. https://ohbarye.hatenablog.jp/entry/2021/01/22/admin-feature-architecture-patterns
1. https://docs.nestjs.com/recipes/router-module
1. https://github.com/nestjsx/nest-router
1. https://devblog.thebase.in/?page=1650335400