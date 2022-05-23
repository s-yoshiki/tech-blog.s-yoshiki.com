---
title: "[AWS CDK]S3 CloudFront OAI Route53 構成 で NextJSのSSG配信環境構築"
path: "/entry/274"
date: "2022-05-23 17:00"
coverImage: "../../../images/thumbnail/aws-logo.png"
author: "s-yoshiki"
tags: ["amazon-aws","aws-cdk","typescript"]
---

## 概要

AWS CDK で S3 CloudFront OAI Route53 を利用し SSGでビルドしたNextJSの配信環境を構築しました。


## 構成のポイント

CDKでは以下の構成を実装しています。


- NextJSで実装した静的コンテンツ・アプリケーションのホスティング環境としてS3を利用
- コンテンツを配信するCDNとしてCloudFrontを利用
- S3へのアクセス制限は [OriginAccessIdentity](https://docs.aws.amazon.com/ja_jp/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html) を利用
  - パブリック公開は行わずCloudFrontからのアクセスに制限
- CloudFront Functions でURL正規化
- ACM証明書を `us-east-1` に作成し、CloudFrontのディストリビューションに設定
- Route53のエリリアスレコードとしてドメインを設定する

## CDK Stack

### 実装

以下、Stackのソースです。

**bin/cdk.ts**


```ts
#!/usr/bin/env node
/**
 * ex:
 * $ cdk deploy --all -c stage=dev
 */
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { WebDistributionStack, WebDistributionStackProps } from '../lib/stacks/stack.ts';

const app = new cdk.App();

const env = {
  account: 'XXXXXXXXXXXX',
  region: 'ap-northeast-1',
}

new WebDistributionStack(app, `WebDistributionStack`, {
  env,
  bucketName: 's3.example.com',
  rootDomain: 'example.com',
  fqdn: [`www.example.com`, `example.com`, 'test.example.com']
});
```

**lib/stack.ts**

```ts
import {
  Stack,
  StackProps,
  RemovalPolicy,
  Duration,
  aws_cloudfront as cloudfront,
  aws_cloudfront_origins as cloudfrontOrigins,
  aws_iam as iam,
  aws_s3 as s3,
  aws_certificatemanager as acm,
  aws_route53 as route53,
  aws_route53_targets as route53targets,
} from "aws-cdk-lib";
import { Construct } from "constructs";

export interface WebDistributionStackProps extends StackProps {
  readonly bucketName: string;
  readonly fqdn: string[];
  readonly rootDomain: string;
}

export class WebDistributionStack extends Stack {
  constructor(scope: Construct, id: string, props: WebDistributionStackProps) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, "StaticContentsBucket", {
      bucketName: props.bucketName,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    bucket.addToResourcePolicy(
      new iam.PolicyStatement({
        actions: ["s3:GetObject"],
        effect: iam.Effect.ALLOW,
        resources: [`${bucket.bucketArn}/*`],
        principals: [
          new iam.CanonicalUserPrincipal(
            new cloudfront.OriginAccessIdentity(
              this,
              "OriginAccessIdentity"
            ).cloudFrontOriginAccessIdentityS3CanonicalUserId
          ),
        ],
      })
    );

    const addHeaderFunction = new cloudfront.Function(
      this,
      "CloudFrontFunctionsRedirectIndex",
      {
        functionName: `redirect`,
        code: cloudfront.FunctionCode.fromFile({
          filePath: "src/cloudfront-function/redirect/index.js",
        }),
      }
    );

    const defaultBehavior = {
      allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD,
      cachedMethods: cloudfront.CachedMethods.CACHE_GET_HEAD,
      cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
      viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      origin: new cloudfrontOrigins.S3Origin(bucket),
      functionAssociations: [
        {
          eventType: cloudfront.FunctionEventType.VIEWER_REQUEST,
          function: addHeaderFunction,
        },
      ],
    };

    const errorResponses = [
      {
        ttl: Duration.seconds(300),
        httpStatus: 403,
        responseHttpStatus: 200,
        responsePagePath: "/index.html",
      },
      {
        ttl: Duration.seconds(300),
        httpStatus: 404,
        responseHttpStatus: 404,
        responsePagePath: "/error.html",
      },
    ];

    const hostedZone = route53.HostedZone.fromLookup(this, "HostedZone", {
      domainName: props.rootDomain,
    });

    // TLS証明書を作る
    const domains = props.fqdn.slice()
    const cert = new acm.DnsValidatedCertificate(this, "Certificate", {
      domainName: domains[0],
      subjectAlternativeNames: domains,
      hostedZone,
      region: "us-east-1",
    });

    const distribution = new cloudfront.Distribution(this, "Distribution", {
      defaultRootObject: "index.html",
      priceClass: cloudfront.PriceClass.PRICE_CLASS_ALL,
      defaultBehavior,
      errorResponses,
      domainNames: props.fqdn,
      certificate: cert
    });

    for (let i = 0; i < props.fqdn.length; i++) {
      new route53.ARecord(this, `AliasRecord${i + 1}`, {
        zone: hostedZone,
        recordName: props.fqdn[i],
        target: route53.RecordTarget.fromAlias(
          new route53targets.CloudFrontTarget(distribution)
        ),
      });
    }
  }
}

```

**src/cloudfront-function/redirect/index.js**

```js
function handler(event) {
  var request = event.request;
  var uri = request.uri;
  if (uri.endsWith("/")) {
    request.uri += "index.html";
  } else {
    if (!uri.includes(".")) {
      request.uri += "/index.html";
    }
  }
  return request;
}
```

## 参考にしたサイト

- [class Distribution (construct) AWS CDK](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_cloudfront.Distribution.html)
- [CloudFront DistributionのCDK Constructの新しいクラスを使って静的サイトホスティング（Amazon S3）の配信を構築してみた](https://dev.classmethod.jp/articles/build-a-static-site-hosting-delivery-with-amaozn-s3-using-cloudfront-distributions-new-cdk-constrain/)
- [AWS CDKでデプロイ時の値を使ってフロントエンドとバックエンドを一発でデプロイできるようになったので試してみる](https://zenn.dev/winteryukky/articles/5e5353ae72ab5c)
- [CloudFront Functions を TypeScript で書いて、ビルド&デプロイを CI で自動化する](https://qiita.com/kurosame/items/675e713dac8f3c55f321)