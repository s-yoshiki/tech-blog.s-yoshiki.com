---
title: "AWS CDK v2 でVPC上にAPI Gateway + Lambda + RDS + RDS Proxyを構築"
path: "/entry/266"
date: "2022-02-28 00:10"
coverImage: "../../../images/thumbnail/aws-logo.png"
author: "s-yoshiki"
tags: ["amazon-aws","aws-cdk","node.js","typescript","mysql"]
---

## 概要

AWS CDK v2 でVPC上にAPI Gateway + Lambda + RDS + RDS Proxyを構築し、
Lmabdaでmysqlまでの接続を確認した際のメモです

CDKもアプリケーションも全てtypescriptで実装しています。



## Stack

以下のソースがAWS CDKのスタックです。

```js
import {
  Stack,
  RemovalPolicy,
  Duration,
  aws_iam as Iam,
  aws_ec2 as ec2,
  aws_rds as rds,
  aws_lambda as lambda,
  aws_secretsmanager as secrets,
  aws_apigateway as apigw,
} from "aws-cdk-lib";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";

export interface CustomizedProps extends StackProps {
  projectName: string;
}

export class LambdaWithVpcStack extends Stack {
  constructor(scope: Construct, id: string, props: CustomizedProps) {
    super(scope, id, props);

    const PROJECT_NAME = props.projectName;

    let vpc: ec2.Vpc;
    vpc = new ec2.Vpc(this, "VPC", {
      cidr: "10.0.0.0/16",
      vpcName: `${PROJECT_NAME}-vpc`,
      enableDnsHostnames: true,
      enableDnsSupport: true,
      subnetConfiguration: [
        {
          cidrMask: 24,
          name: "PublicSubnet",
          subnetType: ec2.SubnetType.PUBLIC,
        },
        {
          cidrMask: 24,
          name: "PrivateSubnet",
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
        },
      ],
      // natGateways: 2,
      maxAzs: 2,
    });

    const bastionGroup = new ec2.SecurityGroup(this, 'Bastion to DB', {vpc});
    const lambdaToRDSProxyGroup = new ec2.SecurityGroup(this, "Lambda to RDSProxy", {vpc});
    const dbConnectionGroup = new ec2.SecurityGroup(this, "RDSProxy to DB",{vpc});

    dbConnectionGroup.addIngressRule(
      dbConnectionGroup,
      ec2.Port.tcp(3306),
      "allow db connection"
    );

    dbConnectionGroup.addIngressRule(
      lambdaToRDSProxyGroup,
      ec2.Port.tcp(3306),
      "allow lambda connection"
    );

    dbConnectionGroup.addIngressRule(
      bastionGroup,
      ec2.Port.tcp(3306),
      'allow bastion connection'
    );

    // パブリックサブネットに踏み台サーバを配置する
    const host = new ec2.BastionHostLinux(this, "BastionHost", {
      vpc,
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.T4G,
        ec2.InstanceSize.NANO
      ),
      securityGroup: bastionGroup,
      subnetSelection: {
        subnetType: ec2.SubnetType.PUBLIC,
      },
    });
    host.instance.addUserData("yum -y update", "yum install -y mysql jq");

    // RDSの認証情報
    const databaseCredentialsSecret = new secrets.Secret(
      this,
      "DBCredentialsSecret",
      {
        secretName: id + "-rds-credentials",
        generateSecretString: {
          secretStringTemplate: JSON.stringify({
            username: "syscdk",
          }),
          excludePunctuation: true,
          includeSpace: false,
          generateStringKey: "password",
        },
      }
    );

    // Lambda関数からSecret ManagerにアクセスするためのVPCエンドポイント
    new ec2.InterfaceVpcEndpoint(this, "SecretManagerVpcEndpoint", {
      vpc: vpc,
      service: ec2.InterfaceVpcEndpointAwsService.SECRETS_MANAGER,
    });

    const rdsInstance = new rds.DatabaseInstance(this, "DBInstance", {
      engine: rds.DatabaseInstanceEngine.mysql({
        version: rds.MysqlEngineVersion.VER_8_0_26,
      }),
      credentials: rds.Credentials.fromSecret(databaseCredentialsSecret),
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.T3,
        ec2.InstanceSize.MICRO
      ),
      vpc,
      vpcSubnets: {
        // subnetType: ec2.SubnetType.ISOLATED,
        subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
      },
      securityGroups: [dbConnectionGroup],
      removalPolicy: RemovalPolicy.DESTROY,
      deletionProtection: false,
      parameterGroup: new rds.ParameterGroup(this, "ParameterGroup", {
        engine: rds.DatabaseInstanceEngine.mysql({
          version: rds.MysqlEngineVersion.VER_8_0_26,
        }),
        parameters: {
          character_set_client: "utf8mb4",
          character_set_server: "utf8mb4",
        },
      }),
    });

    const proxy = rdsInstance.addProxy(id + "-proxy", {
      secrets: [databaseCredentialsSecret],
      debugLogging: true,
      vpc,
      securityGroups: [dbConnectionGroup],
    });

    const iamRoleForLambda = new Iam.Role(this, "iamRoleForLambda", {
      roleName: `${PROJECT_NAME}-lambda-role`,
      assumedBy: new Iam.ServicePrincipal("lambda.amazonaws.com"),
      // VPCに設置するためのポリシー定義
      managedPolicies: [
        Iam.ManagedPolicy.fromAwsManagedPolicyName(
          "service-role/AWSLambdaVPCAccessExecutionRole"
        ),
      ],
    });

    // lambda
    const appLambda1 = new NodejsFunction(this, "getSample1", {
      entry: "src/lambda/index.ts", // どのコードを使用するか
      runtime: lambda.Runtime.NODEJS_14_X, // どのバージョンか
      timeout: Duration.seconds(30), // 何秒でタイムアウトするか
      role: iamRoleForLambda, // どのIAMロールを使用するか
      vpc: vpc, // VPCに設置する場合に必要
      securityGroups: [lambdaToRDSProxyGroup],
      environment: {
        PROXY_ENDPOINT: proxy.endpoint,
        RDS_SECRET_NAME: id + "-rds-credentials",
        AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1", // keepaliveを有効にする
      },
      memorySize: 128, // default=128
    });

    // 認証情報へのアクセス許可
    databaseCredentialsSecret.grantRead(appLambda1);

    const restApi = new apigw.RestApi(this, "RestApi", {
      restApiName: "rds-proxy-go",
      deployOptions: {
        stageName: "dev",
      },
      // CORS設定
      defaultCorsPreflightOptions: {
        allowOrigins: apigw.Cors.ALL_ORIGINS,
        allowMethods: apigw.Cors.ALL_METHODS,
        allowHeaders: apigw.Cors.DEFAULT_HEADERS,
        statusCode: 200,
      },
    });

    restApi.root.addProxy({
      defaultIntegration: new apigw.LambdaIntegration(appLambda1),
      anyMethod: true
    });
  }
}

```

## Lambdaの実装

```js
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import * as AWS from "aws-sdk";
import * as mysql from "mysql2/promise"
import * as fs from "fs"

const cert = `
-----BEGIN CERTIFICATE-----
ここにクライアント証明書の内容を記載する
https://www.amazontrust.com/repository/AmazonRootCA1.pem
-----END CERTIFICATE-----
`.trim()



export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {

  const params = event.queryStringParameters ? event.queryStringParameters : {};

  const RESPONSE_HEADERS = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type,Authorization,access-token",
  };

  const secretsManager = new AWS.SecretsManager({
    region: "ap-northeast-1",
  })
  const response = await secretsManager.getSecretValue({
    SecretId: "LambdaWithVpcStack-rds-credentials",
  }).promise()

  const {host, username, password} = JSON.parse(response.SecretString ?? '')

  const connection = await mysql.createConnection({
    host: process.env.PROXY_ENDPOINT,
    user: username,
    password,
    database: 'app',
    // ssl: {
    //   cert: fs.readFileSync(__dirname + '/cert/AmazonRootCA1.pem', 'utf-8')
    // },
    ssl: {
      cert: cert
    }
  });

  let result = await connection.query("select * from user")

  return {
    statusCode: 200,
    headers: RESPONSE_HEADERS,
    body: JSON.stringify(result[0])
  };
  // [{"id":1,"name":"思い出の本","price":100},{"id":2,"name":"AWS Database Book","price":200000},{"id":3,"name":"日記帳12345","price":3000000},{"id":4,"name":"あいうえお","price":12345}]
};
```

## mysqlの初期化

以下のコマンドで踏み台にログインします。

```
aws ssm start-session --target ${踏み台EC2のID}
```

mysqlに接続しデータベースの中身を作成。

```
CREATE DATABASE app;
USE app;
CREATE TABLE user(id int primary key auto_increment, name text, price int);
INSERT INTO user (name, price) VALUES ('田中', 100);
INSERT INTO user (name, price) VALUES ('山田', 200000);
INSERT INTO user (name, price) VALUES ('佐藤', 3000000);
INSERT INTO user (name, price) VALUES ('鈴木', 12345);
```

※ 証明書

https://www.amazontrust.com/repository/AmazonRootCA1.pem

## 結果

次の様なレスポンスがAPI Gatewayのエンドポイントから帰ってこればOK

```json
[
    {
        "id": 1,
        "name": "田中",
        "price": 100
    },
    {
        "id": 2,
        "name": "山田",
        "price": 200000
    },
    {
        "id": 3,
        "name": "鈴木",
        "price": 3000000
    },
    {
        "id": 4,
        "name": "佐藤",
        "price": 12345
    }
]
```


## 参考にしたサイト

- [Amplify with NestJS - medium](https://medium.com/@davinanaya/amplify-with-nestjs-8d35b6b9f02e)
- [](https://docs.aws.amazon.com/cdk/api/v1/docs/aws-apigateway-readme.html)
- [class ProxyResource (construct)](https://docs.aws.amazon.com/cdk/api/v1/docs/@aws-cdk_aws-apigateway.ProxyResource.html)
- [CDK Patternsを参考にしてRDS Proxyを利用したAPIをデプロイしてみた](https://dev.classmethod.jp/articles/cdk-rds-proxy-api-go/)
- [AWS CDKを使ってVPC LambdaからEC2のMySQLにアクセスする方法](https://zenn.dev/yuyake0084/articles/81835998d0eea39118f0)