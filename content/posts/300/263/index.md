---
title: "AWS CDK v2 で Lambda関数のデプロイ"
path: "/entry/263"
date: "2022-02-23 17:00"
coverImage: "../../../images/thumbnail/aws-logo.png"
author: "s-yoshiki"
tags: ["typescript","amazon-aws","aws-cdk"]
---

## 概要

AWS CDK v2 で TypeScriptでコードを実装し、Lambdaにデプロイする所までを行いました。

検索してもv2の情報が出てこなかったので

全てtypescriptで実装しています。

### 環境

- AWS CDK 2.13.0 (build b0b744d)
- macOS 12.1
- node v17.5.0
- typescript 4.3.5

## 初期化

まずは事前に次の作業を行なっておきます。

- awsのcredential情報を適切に設定する
- Dockerインストール

その上で、以下の操作で環境を初期化します。

bootstrapを行うことで、CDK ToolkitをAWSにデプロイします。

```shell
npm install -g aws-cdk
cdk bootstrap
```

次のように表示されれば成功です。

```
 ✅  Environment aws://790131586983/ap-northeast-1 bootstrapped.
```

## プロジェクト作成〜Lambdaデプロイ

### プロジェクト初期化

以下のコマンドでローカルにプロジェクトを構築します。

```shell
mkdir cdkapp
cd cdkapp
cdk init app --language typescript
```

### Lambda実装

`src/lambda/index.ts`に次の内容を記載します。
これがLambdaで動くコードとなります。

```typescript
import { Handler } from 'aws-lambda'

export const handler: Handler = async () => {
  console.log('Hello Lambda!')
}
```

### Stack作成

`lib/cdkapp-stack.ts`に次の内容を記載します。

```typescript
import { 
  Stack,
  StackProps
} from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambdaNodejs from 'aws-cdk-lib/aws-lambda-nodejs'

export class CdkappStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new lambdaNodejs.NodejsFunction(this, 'HelloFunction', {
      entry: 'src/lambda/index.ts',
    })
  }
}
```

### デプロイ

次のコマンドでデプロイします。

```
cdk deploy
```

マネジメントコンソール上で関数が反映されていることを確認できたらOKです。

## 削除

環境をきれいにしたくなったら次のコマンドで削除します。

```
cdk destroy
```

## 付録1: CDK v2 で利用できるコマンド

`cdk --help`で確認できます。

- `cdk list [STACKS..]`
  - 全てのスタックの表示
- `cdk synthesize [STACKS..]` or `cdk synth [STACKS..]`
  - CloudFormationファイルの生成
- `cdk bootstrap [ENVIRONMENTS..]`
  - CDK Toolkitを利用するAWS環境にデプロイ
- `cdk deploy [STACKS..]`
  - スタックのデプロイ
- `cdk watch [STACKS..]`
  - `deploy --watch`の省略形
- `cdk destroy [STACKS..]`
  - スタックの破棄
- `cdk diff [STACKS..]`
  - ローカルで定義しているスタックとAWS環境に展開されているものとの差分を表示
- `cdk metadata [STACK]`
  - スタックに関連付けられているすべてのメタデータの表示
- `cdk init [TEMPLATE]`
  - CDKプロジェクトの作成
- cdk context
  - キャッシュされたコンテキストの管理
- `cdk docs` or `cdk doc`
  - ブラウザでリファレンスの表示
- `cdk doctor` 
  - 潜在的な問題の確認



## 参考にしたサイト

- [実践！AWS CDK #26 Version 2 | DevelopersIO](https://dev.classmethod.jp/articles/cdk-practice-26-version-2/)
<!-- - [AWS CDKでサーバーレスアプリケーションを構築する - Scrapbox](https://scrapbox.io/kentarom/AWS_CDK%E3%81%A7%E3%82%B5%E3%83%BC%E3%83%90%E3%83%BC%E3%83%AC%E3%82%B9%E3%82%A2%E3%83%97%E3%83%AA%E3%82%B1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%82%92%E6%A7%8B%E7%AF%89%E3%81%99%E3%82%8B)
- [Deploying Serverless API with Nestjs and AWS CDK - medium](https://medium.com/nextfaze/deploying-serverless-api-with-nestjs-and-aws-cdk-3d41063543e0) -->

