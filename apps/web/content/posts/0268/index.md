---
title: "[AWS CDK] Bastion(踏み台)構築。SSMとEC2InstanceConnectでの接続"
path: "/entry/268"
date: "2022-03-06 16:00"
coverImage: "../../../images/thumbnail/aws-logo.png"
author: "s-yoshiki"
tags: ["amazon-aws", "aws-cdk", "node.js", "typescript","openssh"]
---

## 概要

AWS CDK で EC2のBastion(踏み台)を構築した際のメモです。

ここで記載した方法は以下の内容での接続方法を想定しています。

- AWS Systems Manager (Session Manager (SSM))
  - マネジメントコンソール上で接続
  - HTTPS: aws cli での接続
  - SSH over HTTPS: OpenSSH経由での接続
- EC2 Instance Connect
  - マネジメントコンソールから接続
  - ローカル環境から接続

### Bastion

Bastion = 要塞ホスト

## AWS CDK Stack

以下のソースが AWS CDK のBastion構築スタックです。

```js
import {
  Stack,
  aws_ec2 as ec2,
  StackProps
} from "aws-cdk-lib";
import { Construct } from "constructs";

export class BastionStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const PROJECT_NAME = "bastion-test";

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
        }
      ],
      maxAzs: 2,
    });
  
    this.addBastion(vpc)
    
  }

  private addBastion(vpc: ec2.Vpc) {
    const bastionGroup = new ec2.SecurityGroup(
      this,
      "Bastion to DB Connection",
      { vpc }
    );
    // EC2 Instance Connect (マネジメントコンソールから接続)対応
    bastionGroup.addIngressRule(
      ec2.Peer.ipv4("3.112.23.0/29"),
      ec2.Port.tcp(22),
      "EC2 Instance Connect for Management console"
    );

    // EC2 Instance Connect (ローカル環境から接続)対応
    bastionGroup.addIngressRule(
      ec2.Peer.ipv4("0.0.0.0/0"), //任意のIP
      ec2.Port.tcp(22),
      "EC2 Instance Connect for local"
    );

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
    host.instance.addUserData("yum -y update");
  }
}
```

ざっと説明すると、

- vpcとパブリックサブネットを構築
- その上にBastionを構築
- BastionはEC2 Instance Connectからのインバウンドの接続を許可する

ということを行ってます。

ポイントとしては `ec2.BastionHostLinux`クラスを利用してインスタンスの構築を定義しています。

## 色々な接続方法を試す

cdkのデプロイが完了すると踏み台に接続できる様になります。

ここで色々な接続方法を試してみます。

### SSM(マネジメントコンソール)上で接続

マネジメントコンソールにて

`AWS Systems Manager` > `Session Manager`

を開き、セッションの開始から接続したいインスタンスを選択し、接続することができます。

### SSM(AWS CLI)で接続

SSM接続環境をクライアント側で構築します。

https://docs.aws.amazon.com/ja_jp/systems-manager/latest/userguide/what-is-systems-manager.html

次のコマンドで接続します。

```shell
aws ssm start-session --target i-xxxxxxxxxxxxx
```

ssm-userで接続ができるとを確認できます。

```
Starting session with SessionId: botocore-session-xxxxxxxxxxxxx-xxxxxxxxxxxxxxx
sh-4.2$ whoami
ssm-user
```

SSMでの接続の場合ユーザがssm-userとなります。

ssm-userはデフォルトだとsudoが利用できrootに昇格できました。

## SSM(OpenSSH)で接続

ローカル環境にて公開鍵と秘密鍵を作成します。

※オプションは適当なものを設定してますが、必要であれば置き換えます。

```
ssh-keygen -t rsa -C "test@mail.example.com"
```

これによりローカル環境に公開鍵`id_rsa.pub`と秘密鍵`id_rsa`が生成されます。

上記のSSM(AWS CLI)で接続、もしくは後述の EC2 Instance Connect で生成した公開鍵をリモートの任意のユーザ(ssm-userやec2-user)の`~/.ssh/authorized_keys`に追記します。

次にローカル環境の`~/.ssh/config` に次の設定を記載します。

```
host i-* mi-*
  ProxyCommand sh -c "aws ssm start-session --target %h --document-name AWS-StartSSHSession --parameters 'portNumber=%p'"
```

これで準備が完了です。sshコマンドで任意のユーザでリモートに接続できます。

```
ssh ssm-user@i-xxxxxxxxxx
```

### EC2 Instance Connect で マネジメントコンソールから接続

マネジメントコンソールから

EC2 > インスタンス > インスタンスID と選択し、接続ボタンから接続できます。

これによりマネジメントコンソールから接続できました。

EC2 Instance Connectが利用できるIPの範囲は指定されており、
次のURLで確認できます。

https://ip-ranges.amazonaws.com/ip-ranges.json

※2022/03時点では、`3.112.23.0/29`となっています。

EC2 Instance Connectは60秒だけ有効です。

### EC2 Instance Connect でローカル接続

この手順はクライアント環境から接続を許可するセキュリティグループの設定を行う必要があります。

次のコマンドでmsshをインストールします。

```shell
pip install ec2instanceconnectcli
```

セットアップ完了後、msshコマンドでインスタンスIDを指定して接続できます。

```
mssh i-xxxxxxxxxxxxx
```

## まとめ

SSMは

- ポート解放不要
- ローカル経由ならAWS CLI/Session Managerプラグイン設定が必要
- OpenSSHを介す場合は鍵必要。他のケースは不要。

EC2 Instance Connect

- ポート解放必要
- ローカル経由ならAWS CLI設定が必要
- 鍵不要

## 参考にしたサイト

- [[5分で]AWSベストプラクティスにのっとって踏み台(Bastion)サーバを構築する – Linux編 –](https://dev.classmethod.jp/articles/20160929-bastion/)
- [EC2インスタンスへのシェルアクセスサービスを雑にまとめてみた | DevelopersIO](https://dev.classmethod.jp/articles/choosing-the-right-shell-access-solution-to-aws-ec2/)
- [class BastionHostLinux (construct)](https://docs.aws.amazon.com/cdk/api/v1/docs/@aws-cdk_aws-ec2.BastionHostLinux.html)
- [実践！AWS CDK #25 Session Manager で SSH 接続 | DevelopersIO](https://dev.classmethod.jp/articles/cdk-practice-25-session-manager-ssh/)
