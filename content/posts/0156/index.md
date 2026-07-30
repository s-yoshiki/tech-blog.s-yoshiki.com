---
title: "AWS System Manager(SSM)でEC2にSSHを実行! ポート解放なし"
path: "/entry/156"
date: "2019-08-14 20:03:06"
coverImage: "../../../images/thumbnail/aws-logo.png"
author: "s-yoshiki"
tags: ["amazon-aws","linux","ubuntu","ssh","iam","amazon-ec2","aws-cli","aws ssm","amazon linux"]
---

AWSのEC2インスタンスに対してAWS System Manager、通称SSMでSSHポートを解放せずSSHする方法の紹介です。

## 環境

session-manager-pluginとamazon-ssm-agent関連の設定は後ほど紹介します。
aws cliは省略します。

### クライアント環境

#### macOS mojava

#### AWS CLI

1.16.215

```shell
$ aws --version
aws-cli/1.16.215 Python/3.7.3 Darwin/18.6.0 botocore/1.12.205
```

#### Session Manager Plugin

1.1.26.0

```shell
$ session-manager-plugin --version
1.1.26.0
```

### リモート環境

#### Ubuntu 18.04

```
Welcome to Ubuntu 18.04.3 LTS (GNU/Linux 4.15.0-1044-aws x86_64)
```

#### amazon-ssm-agent

2.3.687.0

```shell
$ sudo snap list amazon-ssm-agent
Name              Version    Rev   Tracking  Publisher  Notes
amazon-ssm-agent  2.3.687.0  1522  stable/…  aws✓       classic
```

## クライアント環境のセットアップ

AWS CLIは導入済みのものとして話を進めます。

### macOS に Session Manager Plugin をインストール

macOSの場合のインストール方法です。
まず、以下のコマンドを実行し、インストールします

```shell
# 作業スペースに移動
cd /tmp
# sessionmanager-bundleダウンロード
curl "https://s3.amazonaws.com/session-manager-downloads/plugin/latest/mac/sessionmanager-bundle.zip" -o "sessionmanager-bundle.zip"
# unzip
unzip sessionmanager-bundle.zip
# インストールシェルの実行
sudo ./sessionmanager-bundle/install -i /usr/local/sessionmanagerplugin -b /usr/local/bin/session-manager-plugin
```

これで完了です。
インストールが正しく行われたか確認します。

```shell
session-manager-plugin
```

「The Session Manager plugin was installed successfully. Use the AWS CLI to start a session.」と表示されれば成功です。

### Linux(RedHat系) に Session Manager Plugin をインストール

```shell
# 64bitの場合
curl "https://s3.amazonaws.com/session-manager-downloads/plugin/latest/linux_64bit/session-manager-plugin.rpm" -o "session-manager-plugin.rpm"
# 34bitの場合
curl "https://s3.amazonaws.com/session-manager-downloads/plugin/latest/linux_32bit/session-manager-plugin.rpm" -o "session-manager-plugin.rpm"
# install
sudo yum install -y session-manager-plugin.rpm
```

### Ubuntu に Session Manager Plugin をインストール

```shell
# 64bitの場合
curl "https://s3.amazonaws.com/session-manager-downloads/plugin/latest/ubuntu_64bit/session-manager-plugin.deb" -o "session-manager-plugin.deb"
# 34bitの場合
curl "https://s3.amazonaws.com/session-manager-downloads/plugin/latest/ubuntu_32bit/session-manager-plugin.deb" -o "session-manager-plugin.deb"
# install
sudo dpkg -i session-manager-plugin.deb
```

Linuxの場合もmacと同様にsession-manager-pluginコマンドでインストール状態を確認できます。

また、その他ログなどの設定やアンインストールについては<a href="https://docs.aws.amazon.com/ja_jp/systems-manager/latest/userguide/session-manager-working-with-install-plugin.html"> awsの公式ドキュメント </a>をご覧ください。

## リモート環境のセットアップ (EC2)

次にEC2のセットアップを行います。

### インストール

SSMエージェントのインストールは<a href="https://docs.aws.amazon.com/ja_jp/systems-manager/latest/userguide/sysman-manual-agent-install.html"> awsの公式ドキュメント </a>にも記載されており、また、試した時点(2019/08/01)ではインスタンスにすでにインストールされていたので今後、新規に作成したインスタンスに対して改めてインストールする作業は不要になると思います。
※ 古いAMIから作成したインスタンスにはインストールされていないようです。
ちなみに公式ドキュメントでは次のように触れています。

<blockquote>

SSM エージェント は、デフォルトでは、2017 年 9 月以降の Amazon Linux 基本 AMI にインストールされます。SSM エージェント は、デフォルトで、Amazon Linux 2 AMI にもインストールされます。

Amazon ECS 対応の AMI のようにベースイメージではないその他のバージョンの Linux では、手動で SSM エージェント をインストールする必要があります。

プロキシを使用している Amazon Linux AMI から作成されたインスタンスは、Patch Manager オペレーションをサポートするために、現在のバージョンの Python requests モジュールを実行している必要があります。詳細については、「プロキシサーバーを使用する Amazon Linux インスタンス上の Python リクエストモジュールをアップグレードする」を参照してください。

https://docs.aws.amazon.com/ja_jp/systems-manager/latest/userguide/sysman-manual-agent-install.html</blockquote>
手動でインストールする場合は以下の方法で行います。

#### Amazon Linux2 (intel 64bit ※t2インスタンスなど)

インストール

```shell
sudo yum install -y https://s3.amazonaws.com/ec2-downloads-windows/SSMAgent/latest/linux_amd64/amazon-ssm-agent.rpm
```

状態の確認

```shell
sudo systemctl status amazon-ssm-agent
```

起動

```shell
sudo systemctl enable amazon-ssm-agent
sudo systemctl start amazon-ssm-agent
```

#### Ubuntu 18.04 へのインストール

UbuntuもAmazon Linuxと同様にamazon-ssm-agentの手動インストールは不要でした。

<blockquote>デフォルトでは、SSM エージェント は、20180627 以降の識別子のある Ubuntu Server 18.04 および 16.04 LTS 64 ビット AMI にインストールされます。バージョン 16.04 AMI の詳細については、64 ビット Ubuntu Server 16.04 インスタンスでの SSM エージェント のインストールについて を参照してください。

SSM エージェント オンプレミスサーバーにインストールする場合やエージェントを再インストールする場合は、次のスクリプトを使用できます。ダウンロードの URL を指定する必要はありません。snap コマンドでは、エージェントが Snap アプリストア https://snapcraft.io から自動的にダウンロードされます。</blockquote>
インストール

```shell
sudo snap install amazon-ssm-agent --classic
```

実行状態の確認

```shell
sudo snap list amazon-ssm-agent
```

開始

```shell
sudo snap start amazon-ssm-agent
```

```shell
sudo snap services amazon-ssm-agent
```

## EC2へのIAMロールの割り当て

### IAMロール作成

SSMからの接続を許可するIAMロールを作成しEC2に割り当てます。

<ul>
 	<li>IAM(https://console.aws.amazon.com/iam/home#/home)に移動</li>
 	<li>EC2用のロール作成</li>
 	<li>作成したロールに ポリシー : AmazonEC2RoleforSSM を割り当て</li>
 	<li>作成したロールをEC2に割り当て</li>
</ul>

### シェルログインをテスト

ロールが正しく割り当てられるとaws ssm start-sessionで接続することが出来ます。
試しにubuntuで接続テストをしてみます。Amazon Linuxの場合も同様に接続することができます。

```shell
$ aws ssm start-session --target i-XXXXXXXXXXXXXXX

Starting session with SessionId: botocore-session-0123456789abcdefghijk
$ whoami  
ssm-user
$ sudo su  - ubuntu
ubuntu@ip-X-X-X-X:~$
```

## インスタンスにSSHする

### ワンライナーで接続

SSHでProxyCommandを用いて次のように条件を設定することで接続することができます。

```shell
ssh \
ユーザ名@i-XXXXXXXXXXXX \
-i ~/.ssh/path/to/key.pem \
-o ProxyCommand=" sh -c \"aws ssm start-session --target %h --document-name AWS-StartSSHSession --parameters 'portNumber=%p'\""
```

### ssh_configに設定を記述する

ssh configに設定を書いておくと簡単に接続することができます。

```shell
Host my-server
    HostName i-XXXXXXXXXX
    User ユーザ名
    ServerAliveInterval 300
    IdentityFile ~/.ssh/path/to/key.pem
    ProxyCommand sh -c "aws ssm start-session --target %h --document-name AWS-StartSSHSession --parameters 'portNumber=%p'"
```

```shell
ssh my-server
```

### SSHできない場合

数日後に、上記の手順でSSH接続を実行したところ正常に接続できなくなりました。
原因はわかりませんでしたが、リモート側のamazon-ssm-agentをアップデートしたところ繋がるようになりました。
amazon-ssm-agentのアップデートはマネジメントコンソールから、System Managerを選択し、ランコマンドからAWS-UpdateSSMAgentを実行することでアップデートできます。
ただSSMのアップデートは定期的に必要なためcron実行にしました。

ssmのcreate-associationでcron実行するには次のように実行します。
実行すると次のようなJSONが返ってきます。

```shell
$ aws ssm create-association --targets Key=tag:Name,Values=instanceX --name AWS-UpdateSSMAgent --schedule-expression "cron(0 8 * * ? *)"
{
    "AssociationDescription": {
        "Name": "AWS-UpdateSSMAgent",
        "AssociationVersion": "1",
        "Date": 1565771993.094,
        "LastUpdateAssociationDate": 1565771993.094,
        "Overview": {
            "Status": "Pending",
            "DetailedStatus": "Creating"
        },
        "DocumentVersion": "$DEFAULT",
        "AssociationId": "abcdefg-1234-1234-abcd-abcd1234",
        "Targets": [
            {
                "Key": "tag:Name",
                "Values": [
                    "instanceX"
                ]
            }
        ],
        "ScheduleExpression": "cron(0 8 * * ? *)"
    }
}
```

この例ではタグで実行対象を決定してますが、次のようにインスタンスidで指定することも可能です。

```shell
aws ssm create-association --targets Key=instanceids,Values=i-XXXXXXXXXXXXXXXXX,i-YYYYYYYYYYYYYYYYY --name your document name --schedule-expression "cron(0 2 ? * SUN *)"
```

## 参考

<a href="https://docs.aws.amazon.com/ja_jp/systems-manager/latest/userguide/session-manager-working-with-install-plugin.html#install-plugin-verify">https://docs.aws.amazon.com/ja_jp/systems-manager/latest/userguide/session-manager-working-with-install-plugin.html#install-plugin-verify</a>

<a href="https://docs.aws.amazon.com/ja_jp/systems-manager/latest/userguide/sysman-manual-agent-install.html">https://docs.aws.amazon.com/ja_jp/systems-manager/latest/userguide/sysman-manual-agent-install.html</a>

<a href="http://blog.serverworks.co.jp/tech/2019/07/30/sessionmanagerassumerole/">http://blog.serverworks.co.jp/tech/2019/07/30/sessionmanagerassumerole/</a>

<a href="https://qiita.com/hayao_k/items/78b5bfe030ad8a053e93">https://qiita.com/hayao_k/items/78b5bfe030ad8a053e93</a>

<a href="https://dev.classmethod.jp/cloud/ssm-session-manager-from-mac-to-linux-ec2/">https://dev.classmethod.jp/cloud/ssm-session-manager-from-mac-to-linux-ec2/</a>

<a href="https://dev.classmethod.jp/cloud/aws/session-manager-launches-tunneling-support-for-ssh-and-scp/">https://dev.classmethod.jp/cloud/aws/session-manager-launches-tunneling-support-for-ssh-and-scp/</a>

<a href="https://docs.aws.amazon.com/ja_jp/systems-manager/latest/userguide/reference-cron-and-rate-expressions.html">https://docs.aws.amazon.com/ja_jp/systems-manager/latest/userguide/reference-cron-and-rate-expressions.html</a>

<a href="https://docs.aws.amazon.com/ja_jp/systems-manager/latest/userguide/sysman-state-cli.html">https://docs.aws.amazon.com/ja_jp/systems-manager/latest/userguide/sysman-state-cli.html</a>

<a href="https://docs.aws.amazon.com/ja_jp/systems-manager/latest/userguide/session-manager-getting-started-enable-ssh-connections.html">https://docs.aws.amazon.com/ja_jp/systems-manager/latest/userguide/session-manager-getting-started-enable-ssh-connections.html</a>

<a href="https://dev.classmethod.jp/cloud/aws/session-manager-launches-tunneling-support-for-ssh-and-scp/">https://dev.classmethod.jp/cloud/aws/session-manager-launches-tunneling-support-for-ssh-and-scp/</a>
