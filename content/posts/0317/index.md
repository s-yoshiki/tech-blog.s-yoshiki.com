---
title: "CloudFront OAC経由のLambda Function URLでPOSTだけ失敗する原因と対処"
path: "/entry/317"
date: "2026-07-16 21:00"
coverImage: "../../../images/thumbnail/aws-logo.png"
author: "s-yoshiki"
tags: ["aws", "cloudfront", "lambda", "javascript", "typescript"]
---

## 概要

CloudFront のオリジンに Lambda Function URL を指定し、Origin Access Control（OAC）で
保護した構成において、`GET` は成功するのに `POST` だけが失敗する現象に遭遇しました。

結論から言うと、Lambda Function URL を CloudFront OAC 経由で `POST` または `PUT`
する場合、リクエスト本文の SHA-256 を計算し、`x-amz-content-sha256` ヘッダーに設定する
必要があります。

本記事では、実際に遭遇した 404 エラーの切り分けから、ブラウザの Web Crypto API を
使った対処までをまとめます。

## 構成

今回の構成は次のようなものでした。

```text
Browser
  |
  | HTTPS
  v
CloudFront
  |-- /*      --> S3（静的なNext.jsサイト）
  `-- /api/* --> Lambda Function URL（AWS_IAM + OAC）
```

Lambda Function URL は `AWS_IAM` 認証とし、インターネットからFunction URLを直接呼べない
ようにしています。CloudFrontはOACを利用して、Lambda Function URLへのオリジンリクエストを
SigV4で署名します。

## 発生した現象

ブラウザから次のようなリクエストを送信すると、404が返りました。

```text
Request URL: https://example.cloudfront.net/api/diagnose
Request Method: POST
Status Code: 404 Not Found
```

最初はCloudFrontのBehaviorやLambda側のルーティングを疑いました。しかし、同じDistributionに
対するhealth checkは成功します。

```sh
curl https://example.cloudfront.net/api/health
```

```json
{"status":"ok"}
```

つまり、次の点は正常でした。

- `/api/*` のCloudFront Behavior
- Lambda Function URLのオリジン設定
- CloudFront OACからLambdaを呼び出す権限
- LambdaのGETルート

一方、本文を伴うPOSTだけが失敗していました。

## 404に見えた理由

今回のDistributionでは、403をS3上の`/404.html`へ置き換えるカスタムエラーレスポンスを
設定していました。

そのため、実際にはLambda Function URLの認証段階で403になっていたものが、CloudFrontから
ブラウザへ返る時点ではS3の404ページに変わっていました。

レスポンスヘッダーに次のような値がある場合、表示上のステータスだけで判断せず、エラー
レスポンスの置換も確認した方がよいです。

```text
server: AmazonS3
x-cache: Error from cloudfront
```

APIのエラーがS3のHTMLへ置換されると、原因がフロントのルーティングにあるように見えるため
注意が必要です。

## AWS公式ドキュメントの仕様

AWS公式ドキュメントには、Lambda Function URLをCloudFront OACで保護する場合のPOSTとPUTに
ついて、本文のSHA-256を計算し、`x-amz-content-sha256`へ設定する必要があると記載されています。

- [Restrict access to an AWS Lambda function URL origin - Amazon CloudFront](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-lambda.html)

CloudFrontがオリジンリクエストをSigV4署名してくれるため、ブラウザにAWSのアクセスキーを
持たせる必要はありません。ただし、Lambda Function URLは未署名ペイロードをサポートしない
ため、クライアントは本文のハッシュ値をCloudFrontへ渡す必要があります。

ここで重要なのは、**ハッシュを計算する対象と実際に送信する本文が1byteでも異なると失敗する**
という点です。JSONを別々に`JSON.stringify`するのではなく、一度文字列化した値をハッシュ計算と
`fetch`の両方で使います。

## curlで再現する

まず、ヘッダーを付けないPOSTを試します。

```sh
curl -X POST \
  -H 'content-type: application/json' \
  --data '{"url":"https://example.com"}' \
  https://example.cloudfront.net/api/diagnose
```

OACの設定やエラーレスポンスによって見え方は異なりますが、このリクエストはLambdaへ正常に
到達しません。

次に、送信する本文のSHA-256を計算します。

```sh
BODY='{"url":"https://example.com"}'
HASH=$(printf '%s' "$BODY" | openssl dgst -sha256 -r | awk '{print $1}')
```

計算した値を`x-amz-content-sha256`へ設定します。

```sh
curl -X POST \
  -H 'content-type: application/json' \
  -H "x-amz-content-sha256: $HASH" \
  --data "$BODY" \
  https://example.cloudfront.net/api/diagnose
```

これでCloudFrontがリクエストを署名でき、Lambda Function URLまでPOSTが到達しました。

## Web Crypto APIでSHA-256を計算する

ブラウザではWeb Crypto APIの`crypto.subtle.digest`を利用できます。

```ts
const sha256 = async (value: string) => {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(value),
  );

  return [...new Uint8Array(digest)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
};
```

`digest`は`ArrayBuffer`を返すため、`Uint8Array`へ変換し、各byteを2桁の16進数にします。

- [SubtleCrypto: digest() method - MDN](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest)

## fetchへ組み込む

JSON本文を一度だけ生成し、同じ文字列からハッシュを計算します。

```ts
const callApi = async (path: string, body: unknown) => {
  const payload = JSON.stringify(body);

  const response = await fetch(`/api${path}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-amz-content-sha256": await sha256(payload),
    },
    body: payload,
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.json();
};
```

これでブラウザからのPOSTでも、OACを経由してLambda Function URLを呼べます。

`crypto.subtle`はSecure Contextで提供されるため、本番ではHTTPSを利用します。localhostは
開発用途のSecure Contextとして扱われます。

## CloudFrontからLambdaへ必要な権限

今回の切り分けでは、POSTの本文ハッシュとは別に、Lambdaのリソースポリシーも確認しました。
AWS公式ドキュメントでは、CloudFrontのサービスプリンシパルに次の2つのActionを許可する例が
示されています。

- `lambda:InvokeFunctionUrl`
- `lambda:InvokeFunction`

CDKで不足分を明示的に追加する場合は、次のようにDistributionのARNへ限定できます。

```ts
api.addPermission("AllowCloudFrontInvokeFunction", {
  principal: new iam.ServicePrincipal("cloudfront.amazonaws.com"),
  action: "lambda:InvokeFunction",
  sourceArn: `arn:${cdk.Aws.PARTITION}:cloudfront::${cdk.Aws.ACCOUNT_ID}:distribution/${distribution.distributionId}`,
  invokedViaFunctionUrl: true,
});
```

権限が不足している場合はGETも失敗します。GETは成功しPOSTだけ失敗する場合は、まず
`x-amz-content-sha256`を疑うと切り分けやすいです。

## デバッグ時のチェックリスト

同様の現象に遭遇した場合は、次の順番で確認すると原因を絞り込めます。

1. CloudFrontの`/api/*` BehaviorがLambda Function URLを向いているか
2. Lambda Function URLの`AuthType`が想定どおりか
3. OACのOrigin typeがLambda、Signing behaviorが`always`か
4. Lambdaのリソースポリシーに必要な2つのActionがあるか
5. GETのhealth checkは成功するか
6. POST本文と`x-amz-content-sha256`の計算対象が完全に同じか
7. CloudFrontのカスタムエラーレスポンスが元の403を404へ置換していないか

また、CloudFrontのレスポンスだけでなく、LambdaのCloudWatch LogsにInvocationが残っているかも
重要です。ログがなければ、Lambdaハンドラーより前の認証・署名段階で拒否されている可能性が
高いです。

## まとめ

CloudFront OACをLambda Function URLに利用すると、Function URLを直接公開せずにAPIを配信
できます。一方で本文を伴うPOST・PUTでは、通常の`fetch`に加えてペイロードハッシュが必要です。

- GETが成功してもPOSTが成功するとは限らない
- POST・PUTでは本文のSHA-256を`x-amz-content-sha256`へ設定する
- ハッシュ計算と送信には同一の本文文字列を使う
- ブラウザではWeb Crypto APIで計算できる
- CloudFrontには`InvokeFunctionUrl`と`InvokeFunction`の両権限を与える
- カスタムエラーレスポンスによって403が404に見えることがある

OACやLambda側だけを調べ続けると見落としやすい仕様なので、POSTだけが失敗する場合は
リクエストヘッダーも確認するとよいです。
