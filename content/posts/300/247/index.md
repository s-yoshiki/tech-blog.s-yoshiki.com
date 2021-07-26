---
title: "AWS Amplify で コンテナベースのデプロイを行い REST API を構築"
path: "/entry/247"
date: "2021-07-26 00:00"
coverImage: "../../../images/thumbnail/aws-logo.png"
author: "s-yoshiki"
tags: ["amazon-aws","linux","docker","aws-amplify","python"]
---

## 概要

AWS Amplify で コンテナベースのデプロイを行い REST API を構築した際のメモです。

## 検証した環境

 - amplify 5.1.2

## やってみる

### 初期準備

初期準備を行います。

```shell
mkdir amplify-fargate
cd amplify-fargate
amplify init
```

`amplify init` すると質問が始まりますが、全部デフォルトのオプションで進めます。

```
Project information
| Name: amplifyfargate
| Environment: dev
| Default editor: Visual Studio Code
| App type: javascript
| Javascript framework: none
| Source Directory Path: src
| Distribution Directory Path: dist
| Build Command: npm run-script build
| Start Command: npm run-script start

AWS Profile setting
| Selected profile: default

Advanced: Container-based deployments
| Leverage container-based deployments: No
```

次のコマンドを実行してコンテナの設定を適用します。

```shell
amplify configure project
```

`Do you want to enable container-based deployments? (y/N)` と聞かれるので`y`と答えます。

次のコマンドでAPIを追加します。

```
amplify add api
```

質問は次のように答えました。

 - Please select from one of the below mentioned services: 
   - REST
 - Which service would you like to use 
   - API Gateway + AWS Fargate (Container-based)
 - Provide a friendly name for your resource to be used as a label for this category in the project: 
   - container
 - What image would you like to use 
   - Docker Compose - ExpressJS + Flask template
 - When do you want to build & deploy the Fargate task 
   - On every "amplify push" (Fully managed container source)
 - Do you want to restrict API access 
   - No
 - Select which container is the entrypoint 
   - python (expressでも良いがここではPythonで進めます)

設定が終わると設定ファイルが以下のように吐き出されます。

```
amplify/backend/
├── amplify-meta.json
├── api
│   └── container
│       ├── container-cloudformation-template.json
│       ├── dist
│       │   └── latest-build.zip
│       ├── parameters.json
│       └── src
│           ├── buildspec.yml
│           ├── docker-compose.yml
│           ├── express (省略)
│           └── python
│               ├── Dockerfile
│               ├── requirements.txt
│               └── src
│                   └── server.py
├── awscloudformation
│   ├── build
│   │   ├── api
│   │   │   └── container
│   │   │       └── container-cloudformation-template.json
│   │   └── awscloudformation
│   │       └── nested-cloudformation-stack.yml
│   └── nested-cloudformation-stack.yml
├── backend-config.json
├── function
│   └── container
│       └── amplify.state
└── tags.json
```

次に `amplify/backend/api/container/src/python/src/server.py` を次のように編集します。

```python
from flask import Flask, jsonify
server = Flask(__name__)

@server.route('/hello')
def hello():
    return jsonify({'msg': 'Hello World'})

if __name__ == "__main__":
   server.run(host='0.0.0.0')
```

次のコマンドでデプロイを行います。

```shell
amplify push
```

3〜5分ほど待つデプロイが終わります。

https://xxxxxxxx.execute-api.ap-northeast-1.amazonaws.com/hello

```
{
  "msg": "Hello World"
}
```

でレスポンスが返れば成功です。

## パイプラインを確認

パイプラインを確認してみると

 1. s3へのアップロード
 2. build
 3. predeploy
 4. deploy

といった具合で実行されていることが確認できました。

## 終了処理

遊んだらリソースを削除しておきます。

次のコマンドで削除します。

```
amplify delete
```

これだけだと上手くいかず、S3やECRは手動で削除しました。

## 参考

[Amplify CLIでFargateを利用したサーバーレスコンテナのデプロイが可能になりました #reinvent #amplify](https://dev.classmethod.jp/articles/amplify-cli-containerize/)

[Amplify CLI が、AWS Fargate を使用したサーバーレスコンテナのデプロイを実現](https://aws.amazon.com/jp/about-aws/whats-new/2020/12/amplify-cli-enables-serverless-container-deployments-using-aws-fargate/)

[AWS Amplify の Fargate 対応で “うまくいかない” docker-compose.yml の書き方](https://blog.tacck.net/archives/1111)

[AWS Amplify の API 機能が Fargate 対応したので PHP のフレームワーク (Laravel) を動かしてみた](https://blog.tacck.net/archives/1122)