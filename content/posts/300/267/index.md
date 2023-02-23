---
title: "[AWS CDK] Cognito を構築"
path: "/entry/267"
date: "2022-03-04 10:10"
coverImage: "../../../images/thumbnail/aws-logo.png"
author: "s-yoshiki"
tags: ["amazon-aws", "aws-cdk", "node.js", "typescript"]
---

## 概要

AWS CDK v2 で Cognito を構築した際のCDK Stackです。

## Stack

以下のソースが AWS CDK のスタックです。

```js
import {
  App,
  Stack,
  StackProps,
  RemovalPolicy,
  aws_cognito as cognito,
} from "aws-cdk-lib";

export class CognitoAuthStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);

    const project: string = "myproject";
    const stage: string = "dev";

    const userPool = new cognito.UserPool(this, `${project}-user-pool`, {
      userPoolName: `${project}-user-pool`,
      selfSignUpEnabled: true, // サインアップ有効
      standardAttributes: {
        email: { required: true, mutable: true },
      },
      signInAliases: { email: true },
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
      removalPolicy: RemovalPolicy.DESTROY,
    });
    const domainPrefix = `${project}`;

    new cognito.UserPoolDomain(this, "UserPoolDomain", {
      userPool: userPool,
      cognitoDomain: {
        domainPrefix: domainPrefix,
      },
    });

    userPool.addClient("client", {
      userPoolClientName: `${project}-${stage}-client`,
      oAuth: {
        scopes: [
          cognito.OAuthScope.EMAIL,
          cognito.OAuthScope.OPENID,
          cognito.OAuthScope.PROFILE,
        ],
        callbackUrls: ["http://example.com:8080/callback"],
        logoutUrls: ["http://example.com:8080/logout"],
        flows: {
          authorizationCodeGrant: true,
        },
      },
      authFlows: {
        adminUserPassword: true,
        userPassword: true,
      },
      generateSecret: true,
    });
  }
}
```

## 参考にしたサイト

- [OAuth 2.0 全フローの図解と動画 - Qiita](https://qiita.com/TakahikoKawasaki/items/200951e5b5929f840a1f)
- [AWS Cognitoのローカル開発](https://zenn.dev/nasubita/articles/be2d5383517bd9)
- [AWS CDKでCognitoを使用してREST API 認証を実装してみた。 | DevelopersIO](https://dev.classmethod.jp/articles/rest-api-authentication-using-cognito/)
