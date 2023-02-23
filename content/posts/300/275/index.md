---
title: "[AWS CDK]ECS FargateでNestJSで作成したRESTfull APIデプロイ"
path: "/entry/275"
date: "2022-05-24 13:00"
coverImage: "../../../images/thumbnail/nest-logo.png"
author: "s-yoshiki"
tags: ["nestjs","amazon-aws","aws-cdk","typescript"]
---

## 概要

NestJSで作成したRESTfull APIアプリケーションをECS Fargateで起動するスタックを、AWS CDKを利用して構築・デプロイした際のメモです。

## プロジェクト作成

作業ディレクトリを作成しCDKプロジェクトとして初期化します。

```
mkdir ecs-fargate 
npx cdk init app --language=typescript
cd ecs-fargate
```

## Stack実装

Stackを次のコードのように実装します。

ポイントは以下となります。

- VPC構築を構築しALBをパブリックサブネットに配置
- ECS Fargate を構築しALBからのリクエストを受け付ける
- ACMを作成しALBで利用
- Route53の設定でALBに対してAレコードを設定

**lib/ecs-fargate.ts**

```ts
import {
  aws_certificatemanager as acm,
  aws_ec2 as ec2,
  aws_ecs as ecs,
  aws_elasticloadbalancingv2 as elbv2,
  aws_logs as log,
  aws_route53 as route53,
  aws_route53_targets as route53Targets,
  Stack,
  StackProps,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';

// todo:
// example.com は置き換えること
const domainName = `example.com`;

export class CdkEcsFargateStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, 'VPC', {
      cidr: '10.1.0.0/16',
      enableDnsHostnames: true,
      enableDnsSupport: true,
      subnetConfiguration: [
        {
          cidrMask: 24,
          name: 'PublicSubnet',
          subnetType: ec2.SubnetType.PUBLIC,
        },
        {
          cidrMask: 24,
          name: 'PrivateIsolatedSubnet',
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
        },
      ],
    });
    // SecurityGroup
    const securityGroupELB = new ec2.SecurityGroup(this, 'SecurityGroupELB', {
      vpc,
    });
    securityGroupELB.addIngressRule(
      ec2.Peer.ipv4('0.0.0.0/0'),
      ec2.Port.tcp(443),
    );

    const securityGroupApp = new ec2.SecurityGroup(this, 'SecurityGroupApp', {
      vpc,
    });

    const hostedZone = route53.HostedZone.fromLookup(this, 'HostedZone', {
      domainName: domainName,
    });

    const cert = new acm.DnsValidatedCertificate(this, 'Certificate', {
      domainName: domainName,
      hostedZone,
      // region: "us-east-1",
      region: 'ap-northeast-1', // ALBと同じリージョンに配置
    });

    // ALB
    const alb = new elbv2.ApplicationLoadBalancer(this, 'ALB', {
      vpc,
      securityGroup: securityGroupELB,
      internetFacing: true,
    });
    const listenerHTTP = alb.addListener('ListenerHTTP', {
      port: 443,
      certificates: [
        {
          certificateArn: cert.certificateArn,
        },
      ],
    });
    // Target Group
    const targetGroup = new elbv2.ApplicationTargetGroup(this, 'TargetGroup', {
      vpc: vpc,
      port: 3000,
      protocol: elbv2.ApplicationProtocol.HTTP,
      targetType: elbv2.TargetType.IP,
      healthCheck: {
        path: '/',
        healthyHttpCodes: '200',
      },
    });

    listenerHTTP.addTargetGroups('DefaultHTTPSResponse', {
      targetGroups: [targetGroup],
    });

    // ECS Cluster
    const cluster = new ecs.Cluster(this, 'Cluster', {
      vpc,
    });

    // Fargate
    const fargateTaskDefinition = new ecs.FargateTaskDefinition(
      this,
      'TaskDef',
      {
        memoryLimitMiB: 1024,
        cpu: 512,
      },
    );
    const container = fargateTaskDefinition.addContainer('AppContainer', {
      image: ecs.ContainerImage.fromAsset('src/ecs/app'),
      logging: ecs.LogDrivers.awsLogs({
        streamPrefix: 'nest-app',
        logRetention: log.RetentionDays.ONE_MONTH,
      }),
    });
    container.addPortMappings({
      containerPort: 3000,
      hostPort: 3000,
    });
    const service = new ecs.FargateService(this, 'Service', {
      cluster,
      taskDefinition: fargateTaskDefinition,
      desiredCount: 1,
      assignPublicIp: true,
      securityGroups: [securityGroupApp],
    });
    service.attachToApplicationTargetGroup(targetGroup);

    new route53.ARecord(this, `AliasRecord`, {
      zone: hostedZone,
      recordName: `ecs.${domainName}`,
      target: route53.RecordTarget.fromAlias(
        new route53Targets.LoadBalancerTarget(alb),
      ),
    });
  }
}
```

## NestJSアプリケーションの実装

NestJSでRESTfullAPIアプリケーションを実装していきます。

### プロジェクト作成

```
mkdir -p src/ecr
cd src/ecr
nest new app
cd app
```

### サンプルAPI作成

デフォルトで作成されるcontroller・serviceを次のように実装します。

**src/app.controller.ts**

```ts
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }
}
```

**src/app.service.ts**

```ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      message: 'Hello World!',
    };
  }
}
```

`npm run start`を実行して http://localhost:3000 で `{ "message": "Hello World!" }`のレスポンスが返ってくることを確認します。

またビルドするためのDockerfileも作成します。

**Dockerfile**

```Dockerfile
FROM node:16-alpine

WORKDIR /app
COPY . /app
RUN npm install && \
    npm run build
ENV HOST 0.0.0.0
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
```

## デプロイ

`cdk deploy`を実行しAWS環境へデプロイを行います。

https://ecs.example.com (自分が設定したFQDNに置き換える) に接続しレスポンスが正しいことを確認します。

## 参考にしたサイト

- [CDKを使用してECS Fargateにデプロイする](https://techblog.kiramex.com/entry/2021/06/14/143057)
- [ECS(Fargate)のServiceをCDKで構築・デプロイしてみた](https://dev.classmethod.jp/articles/ecs-deploy-using-cdk/)
