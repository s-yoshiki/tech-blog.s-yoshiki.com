---
title: "AWS Lambdaから EC2起動&停止を行う"
path: "/entry/163"
date: "2019-09-03 00:28:17"
coverImage: "../../../images/thumbnail/aws-logo.png"
author: "s-yoshiki"
tags: ["amazon-aws","iam","lambda"]
---

AWS Lambda から EC2 の起動と停止を行う方法の紹介。

## 大まかな流れの紹介

LambdaからEC2の起動・停止の関数作成までの大まかな流れは次のようになります。

IAMポリシー作成
↓
IAMロール作成
↓
Lambda関数作成
↓
IAMロールのアタッチ

こんな流れになります。

## IAMポリシー作成

AWSのIAMのページからポリシーを選択します。
ポリシーでは CloudWatch Logs 用のポリシーと、EC2インスタンス起動・停止用のポリシーを作成します。
**CustomEc2StartStopPolicy**

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ec2:Start*",
        "ec2:Stop*"
      ],
      "Resource": "*"
    }
  ]
}
```

**CustomCWLogsPutLogsPolicy**

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "arn:aws:logs:*:*:*"
    }
  ]
}
```

<img class="alignnone size-full wp-image-1499" src="https://tech-blog.s-yoshiki.com/wp-content/uploads/2019/09/20190903001100-e1567437591700.png" alt="" width="800" height="188">

ポリシーのアタッチが上手く行われていると次のように表示されます。

## IAMロール作成

次にIAMロールを作成します。各項目は次の情報を入力します。

```
エンティティ: Lambda
アタッチするポリシー: ["CustomEc2StartStopPolicy", "CustomCWLogsPutLogsPolicy"]
ロール名: CustomEc2StartStopRoll
```

## Lambda作成

次にLambdaを作成します。各項目は次のように設定しました。

```
関数名: StartStopEc2Func
ロール: CustomEc2StartStopRoll
ランタイム: Python3.7
```

ソースコードは次のように記述しました。

```py
import boto3
 
def lambda_handler(event, context):
    region = event['Region']
    instances = event['Instances']
    ec2 = boto3.client('ec2', region_name=region)
    if event['Action'] == 'start':
        ec2.start_instances(InstanceIds=instances)
    elif event['Action'] == 'stop':
        ec2.stop_instances(InstanceIds=instances)
    else:
        return 1
    return 0
```

作成が完了すると次のように表示されます。

※この画像はCloudWatch Eventsを設定した場合の画像です。

<img class="alignnone size-full wp-image-1500" src="https://tech-blog.s-yoshiki.com/wp-content/uploads/2019/09/20190903002100-e1567437714586.png" alt="" width="800" height="247">

## 動作確認

Lambdaのテストイベントからテストを行い、EC2の起動停止ができるか確認します。

### 起動テスト

起動のテストを行います。テスト名は任意の名前をつけてください。

Lambdaのテストから次のリクエストを行います。

(i-XXXXXXXXXXXXXXXXはEC2のインスタンスID)

```json
{
  "Action": "start",
  "Region": "ap-northeast-1",
  "Instances": [
    "i-XXXXXXXXXXXXXXXX"
  ]
}
```

EC2のダッシュボードからインスタンス状態を確認し起動していれば成功です。

### 停止テスト

(i-XXXXXXXXXXXXXXXXはEC2のインスタンスID)

```json
{
  "Action": "stop",
  "Region": "ap-northeast-1",
  "Instances": [
    "i-XXXXXXXXXXXXXXXX"
  ]
}
```

EC2のダッシュボードからインスタンス状態を確認し停止していれば成功です。

## 参考

<a href="https://dev.classmethod.jp/cloud/aws/simple-auto-start-stop-for-ec2/">https://dev.classmethod.jp/cloud/aws/simple-auto-start-stop-for-ec2/</a>

<a href="https://www.simpline.co.jp/tech_ty/awslambda%E3%81%A7ec2%E3%81%AE%E8%B5%B7%E5%8B%95%E3%83%BB%E5%81%9C%E6%AD%A2%E3%82%92%E5%88%B6%E5%BE%A1%E3%81%99%E3%82%8B/">[AWS]LambdaでEC2の起動・停止を制御する</a>
