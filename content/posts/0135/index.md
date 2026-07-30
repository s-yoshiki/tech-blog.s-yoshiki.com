---
title: "AWS S3のアクセスキーIDとシークレットアクセスキーの取得 作業用ユーザを作成"
path: "/entry/135"
date: "2019-06-12 00:04:09"
coverImage: "../../../images/thumbnail/aws-logo.png"
author: "s-yoshiki"
tags: ["amazon-aws","linux","amazon-s3","iam"]
---

## 先に結論

現在のAWSでは、人とワークロードのどちらにも、IAMユーザーの長期アクセスキーよりIAM Identity CenterやIAMロールによる一時認証情報が推奨されています。EC2、ECS、LambdaなどAWS上で動く処理にはIAMロールを割り当て、アクセスキーを発行しない構成を優先してください。

この記事のコンソール画像と手順は2019年当時の記録です。現在の画面とは異なるため、長期アクセスキーがどうしても必要な場合の考え方と安全策を中心に読み替えてください。

## 認証方式の選び方

| 実行場所・利用者 | 推奨方式 |
| :--- | :--- |
| EC2 / ECS / Lambda | サービスに割り当てたIAMロール |
| 社員のCLI・開発環境 | IAM Identity Center / `aws login` などの短期認証 |
| GitHub Actions | OIDCでIAMロールを引き受ける |
| AWS外のサーバー | IAM Roles Anywhereなどの短期認証 |
| 上記が使えない古いツール | 最小権限のIAMユーザーと長期アクセスキー |

## 当時の手順

AWS S3 接続用のアカウントを作成する方法の紹介。
ここで作成するユーザはS3のオブジェクトの読み込みおよび書き込みができるものとします。

## ユーザの作成

### ユーザ作成ページまでの遷移

ユーザ作成権限のあるアカウントでログイン後、AWSマネジメントコンソールにアクセス。
右上のユーザ名のところから「Security Credentials」もしくは「マイセキュリティ資格情報」を選択。

<img src="/img/2019/06/20190611225939.png">

「User」のタブを選択します
<img src="/img/2019/06/20190611231029.png">

次にユーザ作成をクリックします。

<img src="/img/2019/06/20190611231301.png">

### アカウント詳細設定

名前は任意とします。
<img src="/img/2019/06/20190611231634.png">

AWS SDKを使う場合やFTPクライアントを用いてファイルをアップロードする場合は「プログラムによるアクセス」をチェックします。

この作成したアカウントでマネジメントコンソールにアクセスする場合は「AWSマネジメントコンソールへのアクセス」を有効にします。

ここでは「プログラムによるアクセス」のみを洗濯したとして次に進みます。

### アカウント権限の設定

S3オブジェクトに対してのreadおよびwriteの設定をします。

まず「既存のポリシーを直接アタッチ」を選択。

当時はここで `AmazonS3FullAccess` を付与していましたが、現在は推奨しません。対象バケットと必要な操作だけに絞ったカスタムポリシーを使います。

フィルターに「S3」と入力すると絞り込むことができます。

<img src="/img/2019/06/20190611232640.png">

この次にタグなどを設定できますが、必須ではないため飛ばします。

### アクセスキーIDとシークレットアクセスキー

作業が完了したら最後のページにアクセスキーIDとシークレットアクセスキーが表示されるのでメモしましょう。

<img src="/img/2019/06/20190611233424.png">

この2つのアクセスキーがS3への認証時に必要となります。

## 最小権限のS3ポリシー例

次は `example-bucket/uploads/` 配下だけを一覧・読み書きできる例です。バケット名とprefixは環境に合わせて変更してください。

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "ListUploadPrefix",
      "Effect": "Allow",
      "Action": "s3:ListBucket",
      "Resource": "arn:aws:s3:::example-bucket",
      "Condition": {
        "StringLike": {
          "s3:prefix": ["uploads/*"]
        }
      }
    },
    {
      "Sid": "ReadWriteObjects",
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject"
      ],
      "Resource": "arn:aws:s3:::example-bucket/uploads/*"
    }
  ]
}
```

削除が必要な場合だけ `s3:DeleteObject` を加えます。暗号化にKMSキーを使う場合は、S3権限とは別に必要最小限のKMS権限も設定します。

## 長期アクセスキーを発行する場合

IAMコンソールで対象ユーザーを開き、Security credentials（セキュリティ認証情報）のAccess keysから作成します。ユースケースを選択し、表示されたシークレットはその場で安全な保管先へ保存します。シークレットは後から再表示できません。

- ルートユーザーのアクセスキーは作成しない
- ソースコード、Git、コンテナイメージ、チャットへ貼らない
- ローカルではAWS CLIのcredentialsファイルや認証プロバイダーを使う
- 最終使用日時を監査し、不要なキーを無効化・削除する
- 漏えいが疑われたら、先に新しい認証経路を確認してから古いキーを無効化する

```shell
aws iam get-access-key-last-used --access-key-id AKIAxxxxxxxxxxxxxxxx
```

アクセスキーIDも公開前提の値ではありません。実在するキーをコマンド履歴や記事のスクリーンショットへ残さないでください。

## ユーザの削除

上記に記した手順でユーザ一覧が表示されるページに遷移します。

消す対象のユーザを選択し、「ユーザの削除」をクリックします。

<img src="/img/2019/06/20190611234003.png">

こんな感じで簡単に削除することができます。

## 参考

- [AWS IAM: Security best practices](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html)
- [AWS IAM: Secure access keys](https://docs.aws.amazon.com/IAM/latest/UserGuide/securing_access-keys.html)
- [AWS IAM: Programmatic access with AWS security credentials](https://docs.aws.amazon.com/IAM/latest/UserGuide/security-creds-programmatic-access.html)
