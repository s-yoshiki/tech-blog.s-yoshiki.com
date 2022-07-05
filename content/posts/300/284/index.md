---
title: "[AWS CDK] Cognito の OIDC プロバイダに Auth0 を設定"
path: "/entry/284"
date: "2022-07-03 18:00"
coverImage: "../../../images/thumbnail/auth0-logo.png"
author: "s-yoshiki"
tags: ["auth0","amazon-aws","aws-cdk","typescript"]
---

## 概要

Auth0 を Amazon Cognito ユーザプールのOIDCプロバイダとして設定しAWS CDKで構築した際のメモです。

## Auth0

### Auth0 アプリケーション作成

まずは、[Auth0 Get Started](https://auth0.com/docs/get-started) に従い、Auth0のアプリケーションを作成します。

作成後、

- Domain
- Client ID
- Client Secret

が払い出されるので、控えておきます。

### Auth0 ユーザ追加

Auth0の検証で利用するユーザを追加します。

User Management > Users からユーザを追加します。

### Auth0 Allowed Callback URLs の追加

Cognitoのユーザプール作成後(後述)、Allowed Callback URLs に対して Cognito のコールバックURLを追加します。

```
https://${cognito-domain}.auth.${region}.amazoncognito.com/oauth2/idpresponse
```

## Cognito手動セットアップ

CDKで実現したい部分をまずは手動でやってみます。

事前準備としてデフォルトの設定でcognitoを構築しておきます。

### IDPの設定

まず、Amazon Cognito コンソールを開き、"ユーザープールの管理" を選択します。
その次にユーザープールを選択し、ナビゲーションペインで "ID プロバイダー" を選択します。
そして、"OpenID Connect" を選択し次の項目を入力します。

1. プロバイダー名: 任意の名前
1. クライアント ID: Auth0で作成したアプリケーションのClientID
1. クライアントのシークレット: Auth0で作成したアプリケーションの Client Secret
1. 属性のリクエストメソッド: GET
1. セットアップ方法: 発行者 URL を通じた自動入力
1. 発行者 URL(Issuer): Auth0で作成したアプリケーションのドメインを入力 (例: `https://****.auth0.com`
1. 属性をマッピング: email = email

### アプリケーションクライアントの作成

Amazon Cognito コンソールのユーザプールのタブからアプリケーションの統合を選択し、
アプリケーションクライアントを作成します。

パラメータは次の項目を入力します。

**アプリケーションクライアント**

- アプリケーションタイプ: パブリッククライアント
- アプリケーションクライアント名: auth0-test
- 認証フロー: ALLOW_CUSTOM_AUTH, ALLOW_USER_SRP_AUTH

※その他はデフォルトの値

**ホストされた UI 設定**

- 許可されているコールバックURL: 適当な値 (この時点ではhttp://localhost:8080とかで良い)
- IDプロバイダー: 前述したAuth0用IDP
- OpenID 接続スコープ: email,openid,他任意
- OAuth 2.0 権限タイプ: 認証コード付与, 暗黙的な付与

※その他はデフォルトの値

### ホストされたUIで検証

ホストされたUIから動作の検証を行うことができます。

アプリケーションの統合から作成したアプリケーションクライアントを選択します。

ホストされたUIのリンクを押下して Hosted UIページに遷移し、アプリケーションクライアント(Auth0)を選択します。

![](/entry/284/cognito_auth0_1.png)

Auth0の検証のために追加したユーザ情報でログインして動作を確認します。

![](/entry/284/cognito_auth0_2.png)

## AWS CDK で構築する

ここで本題である AWS CDK を利用してAuth0 + Cognitoの構成を作成していきます。

### CDKプロジェクト初期化

まずはプロジェクトを初期化します。

```
mkdir cdk-cognito-sample
cd cdk-cognito-sample
cdk init app --language=typescript
```

### Auth0アプリケーション作成

手動で作成した時と同様に、アプリケーションを作成します。

### スタック更新

スタックを以下のように変更します。

```ts
import { Stack, StackProps, aws_cognito as cognito } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as cdk from "aws-cdk-lib";

const getAuth0Idp = (app: Stack, userPool: cognito.UserPool) => {
  return new cognito.CfnUserPoolIdentityProvider(
    app,
    "UserPoolIdentityProvider",
    {
      providerName: "auth0-test",
      providerType: "OIDC",
      userPoolId: userPool.userPoolId,
      providerDetails: {
        client_id: "*********", //auth0:client_id
        client_secret: "*********", //auth0client_secret
        attributes_request_method: "GET",
        oidc_issuer: "https://*********.auth0.com", // auth0:domain
        authorize_scopes: "email profile openid",
      },
      attributeMapping: {
        email: "email"
      }
    }
  );
}

export class CdkCognitoSampleStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // 👇 User Pool
    const userPool = new cognito.UserPool(this, "UserPool", {
      userPoolName: "auth0-test-user-pool",
      selfSignUpEnabled: true,
      signInAliases: {
        email: true,
      },
      autoVerify: {
        email: true,
      },
      passwordPolicy: {
        minLength: 6,
        requireLowercase: true,
        requireDigits: true,
        requireUppercase: false,
        requireSymbols: false,
      },
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    });

    const userPoolProvider = getAuth0Idp(this, userPool)

    userPool.addDomain("domain", {
      cognitoDomain: { 
        domainPrefix: 'auth0-test-202207'
      },
    })

    const userPoolClient = userPool.addClient("client", {
      userPoolClientName: "Auth0UserPoolClient",
      generateSecret: false,
      oAuth: {
        callbackUrls: ["http://localhost:8080/auth/callback"],
        logoutUrls: ["http://localhost:8080/auth/logout"],
        flows: {
          authorizationCodeGrant: true,
          implicitCodeGrant: true, //warn:
        },
        scopes: [
          cognito.OAuthScope.EMAIL,
          cognito.OAuthScope.OPENID,
          cognito.OAuthScope.PROFILE,
        ],
      },
      authFlows: {
        userSrp: true,
        custom: true,
      },
      supportedIdentityProviders: [
        cognito.UserPoolClientIdentityProvider.custom(
          userPoolProvider.providerName
        ),
      ],
    });

    // memo:
    // "The provider * does not exist for User Pool *" 対策
    // @see https://github.com/aws/aws-cdk/issues/15692
    userPoolClient.node.addDependency(userPoolProvider);
  }
}
```

### Auth0 Allowed Callback URLs

ドメインが払い出されるので、Auth0のAllowed Callback URLsに追加します。

これで手動作成のケースと同様な環境を作成することができます。

## 参考にしたサイト

- [Auth0 を Amazon Cognito の OIDC プロバイダーとしてセットアップする - Amazon Web Services](https://aws.amazon.com/jp/premiumsupport/knowledge-center/auth0-oidc-cognito/)
- [Create Applications - auth0](https://auth0.com/docs/get-started/auth0-overview/create-applications)
- [Amazon Cognito user poolの外部IdPとしてAzure ADを設定してみた（AWS CDK）](https://dev.classmethod.jp/articles/setting-up-azure-ad-as-an-external-idp-for-amazon-cognito-user-pool-with-aws-cdk/)
- [Auth0 + Cognito IDプールで認証基盤を構築！](https://www.ragate.co.jp/blog/articles/11782)
- [AWS::Cognito::UserPoolIdentityProvider](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-userpoolidentityprovider.html)
- [(cognito): Race condition when creating an user pool and its identity provider in the same stack #15692](https://github.com/aws/aws-cdk/issues/15692)