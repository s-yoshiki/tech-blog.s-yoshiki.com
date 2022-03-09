---
title: "[AWS CDK] S3 + CloudFrontの構築とOriginAccessIdentity周りについて"
path: "/entry/269"
date: "2022-03-09 23:00"
coverImage: "../../../images/thumbnail/aws-logo.png"
author: "s-yoshiki"
tags: ["amazon-aws","aws-cdk","typescript"]
---

## 概要

AWS CDK で S3 + cloudfront構成を構築しました。

その際のStackの実装メモです。

### OriginAccessIdentity

https://docs.aws.amazon.com/ja_jp/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html

OriginAccessIdentityを利用することで、S3に直接アクセスされることなくcloudfrontのみからの参照に絞ることができます。

## 構成のポイント

- AWS CDK v2を利用 (2.14.0)
- CloudFront S3 を利用
- S3へのアクセス制限はOriginAccessIdentityを利用

## CDK Stack

### 実装

以下、Stackのソースです。

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
  aws_s3_deployment as s3deploy,
} from "aws-cdk-lib";
import { Construct } from "constructs";

export class AppStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, "StaticContentsBucket", {
      bucketName: "cloudfront-s3-test-20220309",
      removalPolicy: RemovalPolicy.DESTROY,
    });

    const oai = new cloudfront.OriginAccessIdentity(
      this,
      "OriginAccessIdentity"
    );

    bucket.addToResourcePolicy(
      new iam.PolicyStatement({
        actions: ["s3:GetObject"],
        effect: iam.Effect.ALLOW,
        principals: [
          new iam.CanonicalUserPrincipal(
            oai.cloudFrontOriginAccessIdentityS3CanonicalUserId
          ),
        ],
        resources: [`${bucket.bucketArn}/*`],
      })
    );

    new cloudfront.Distribution(this, "Distribution", {
      comment: "distribution for website",
      defaultRootObject: "index.html",
      defaultBehavior: {
        allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD,
        cachedMethods: cloudfront.CachedMethods.CACHE_GET_HEAD,
        cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        origin: new cloudfrontOrigins.S3Origin(bucket),
      },
      errorResponses: [
        {
          ttl: Duration.seconds(300),
          httpStatus: 403,
          responseHttpStatus: 403,
          responsePagePath: "/error.html",
        },
        {
          ttl: Duration.seconds(300),
          httpStatus: 404,
          responseHttpStatus: 404,
          responsePagePath: "/error.html",
        },
      ],
      priceClass: cloudfront.PriceClass.PRICE_CLASS_ALL,
    });
  }
}
```

### deploy後のバケットポリシー

deploy後バケットポリシーを確認します。

Origin Access Identityが適用されており、直接バケットを参照できないような設定になっています。

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::cloudfront:user/CloudFront Origin Access Identity XXXXXXXXXXXXX"
            },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::cloudfront-s3-test-20220309/*"
        }
    ]
}
```

### deploy後のcloudfrontのorigin access identityの設定

aws cliが利用できる環境で次のコマンドでOAIを確認します。

```
echo "CNAME DomainName OAI[1] OAI[2] OAI[3]" > /tmp/awscli.tmp;\
aws cloudfront list-distributions --query "DistributionList.Items[].\
[Aliases.Items[0],\
DomainName, \
Origins.Items[0].S3OriginConfig.OriginAccessIdentity, \
Origins.Items[1].S3OriginConfig.OriginAccessIdentity, \
Origins.Items[2].S3OriginConfig.OriginAccessIdentity]" \
--output text >> /tmp/awscli.tmp;\
column -t /tmp/awscli.tmp;\
rm /tmp/awscli.tmp
```

実行後、以下の様にorigin access identityが適用されていたら成功です。

```
CNAME    DomainName                 OAI[1]                                            OAI[2]  OAI[3]
None     XXXXXXXXX.cloudfront.net   origin-access-identity/cloudfront/E31XXXXXXXXXXX  None    None
None     YYYYYYYYY.cloudfront.net   origin-access-identity/cloudfront/E31YYYYYYYYYYY  None    None
None     XXXXXXXXX.cloudfront.net   origin-access-identity/cloudfront/EHNXXXXXXXXXXX  None    None
```


### origin access identtity が反映されない件について

上記のコードの

```ts
origin: new cloudfrontOrigins.S3Origin(bucket),
```

について反映されないという問題を耳にしました。

試したところ、macだと成功しwindows(wsl)だと失敗しました。

はっきりとした理由までは分かりませんでした。

## 参考にしたサイト

- [class Distribution (construct) AWS CDK](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_cloudfront.Distribution.html)
- [CloudFront DistributionのCDK Constructの新しいクラスを使って静的サイトホスティング（Amazon S3）の配信を構築してみた](https://dev.classmethod.jp/articles/build-a-static-site-hosting-delivery-with-amaozn-s3-using-cloudfront-distributions-new-cdk-constrain/)
- [AWS CDKでデプロイ時の値を使ってフロントエンドとバックエンドを一発でデプロイできるようになったので試してみる](https://zenn.dev/winteryukky/articles/5e5353ae72ab5c)