---
title: "[AWS CDK] Lambda で S3 オブジェクトを読み書きするStackの構築"
path: "/entry/270"
date: "2022-03-18 01:00"
coverImage: "../../../images/thumbnail/aws-logo.png"
author: "s-yoshiki"
tags: ["aws-cdk", "amazon-aws", "typescript", "node.js"]
---

## 概要

AWS CDK で Lambda を利用して S3 のオブジェクトを読み書きするスタックを構築しました。

読み込み専用 Lambda と書き込み専用 Lmabda を作成してバケットポリシーの定義方法などを説明しています。

※説明について全体的に細かい部分の説明は省いています。

## 構成の概要

構成の概要は次の通りとします。

- オブジェクトを管理する S3 バケットを 1 つ作成
- その S3 のオブジェクトに書き込む Lambda(Writer) と読み込む Lmabda(Reader)を作成
- 2 つの Lmabda は最低限必要な権限(例: Lambda(Writer)なら書き込み権限 ) をバケットポリシーで定義する

## 実装

`cdk init`でプロジェクト初期化し、以下の様にスタックと Lmabda にデプロイするソースを定義します。

### CDK Stack

```js
import { Duration, Stack, aws_iam as iam, aws_s3 as s3 } from "aws-cdk-lib";
import { Construct } from "constructs";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { CustomizedProps } from "./customized-props";

export class LambdaAppStack extends Stack {
  constructor(scope: Construct, id: string, props?: CustomizedProps) {
    super(scope, id, props);

    // オブジェクトを読み込むLambda
    const iamRoleForLambdaReader = new iam.Role(
      this,
      "iamRoleForLambdaReader",
      {
        assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com"),
      },
    );
    // オブジェクトを書き込むLambda
    const iamRoleForLambdaWriter = new iam.Role(
      this,
      "iamRoleForLambdaWriter",
      {
        assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com"),
      },
    );
    // コンテンツを配置するS3
    const bucket = new s3.Bucket(this, "TmpBucket");
    // Lambda(Reader)に対するバケットポリシー
    bucket.addToResourcePolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ["s3:GetObject"],
        principals: [iamRoleForLambdaReader],
        resources: [bucket.bucketArn + "/*"],
      }),
    );
    // Lambda(Writer)に対するバケットポリシー
    bucket.addToResourcePolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ["s3:PutObject"],
        principals: [iamRoleForLambdaWriter],
        resources: [bucket.bucketArn + "/*"],
      }),
    );
    // Lambda(Reader)
    const lambdaReader = new NodejsFunction(this, "LambdaReader", {
      entry: "src/lambda-reader/index.ts",
      runtime: Runtime.NODEJS_14_X,
      timeout: Duration.seconds(30),
      role: iamRoleForLambdaReader,
      environment: {
        S3_BUCKET_NAME: bucket.bucketName,
        AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      },
      memorySize: 128,
    });
    // Lambda(Writer)
    const lambdaWriter = new NodejsFunction(this, "LambdaWriter", {
      entry: "src/lambda-writer/index.ts",
      runtime: Runtime.NODEJS_14_X,
      timeout: Duration.seconds(30),
      role: iamRoleForLambdaWriter,
      environment: {
        S3_BUCKET_NAME: bucket.bucketName,
        AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      },
      memorySize: 128,
    });
  }
}
```

### Lambda(Reader)

```ts
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import * as AWS from "aws-sdk";

const getContent = async () => {
  const s3 = new AWS.S3();
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: "test.txt",
  };
  const res = await s3.getObject(params).promise();
  return res.Body?.toString();
};

export const handler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  const res = await getContent();
  return {
    statusCode: 200,
    body: JSON.stringify(res),
  };
};
```

### Lambda(Writer)

```ts
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import * as AWS from "aws-sdk";

const putContent = async (arg: string) => {
  const s3 = new AWS.S3();
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: "test.txt",
    Body: arg,
  };
  await s3.putObject(params).promise();
};

export const handler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  // 適当な文字列。検証しやすいように日付文字列を渡しておく
  await putContent(new Date().toString());
  return {
    statusCode: 200,
    body: "",
  };
};
```

## Deploy

`cdk deploy`でデプロイします。

デプロイ完了後、AWSのマネジメントコンソールから先にLambda(Writer)をテスト実行すると、
S3にオブジェクトである`test.txt`が作成されます。

次にLambda(Reader)をテスト実行すると`test.txt`の内容が読み取れていることが確認できると思います。


## バケットポリシーについて

S3に設定されたバケットポリシーは次のように設定されていました。

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::XXXXXXXXXXXX:role/LambdaAppStack-iamRoleForLambdaReaderXXXXXXXXXXXXXX"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::lambdaappstack-tmpbucketXXXXXXXXXXXXXX/*"
    },
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::XXXXXXXXXXXX:role/LambdaAppStack-iamRoleForLambdaWriterXXXXXXXXXXXXXX"
      },
      "Action": "s3:PutObject",
      "Resource": "arn:aws:s3:::lambdaappstack-tmpbucketXXXXXXXXXXXXXX/*"
    }
  ]
}
```
