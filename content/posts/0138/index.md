---
title: "AWS S3のオブジェクト一覧をPHPで表示させる"
path: "/entry/138"
date: "2019-06-19 00:19:50"
coverImage: "../../../images/thumbnail/aws-logo.png"
author: "s-yoshiki"
tags: ["amazon-aws","php","amazon-s3","iam","aws-sdk"]
---

## 概要

AWS S3のオブジェクト一覧をPHPで表示させるサンプルコードの紹介.

## S3アカウント

S3バケット参照用のユーザの作成方法は以下を参照してください。

<a href="https://tech-blog.s-yoshiki.com/2019/06/1292/">https://tech-blog.s-yoshiki.com/2019/06/1292/</a>

## サンプル

```php
require_once "vendor/autoload.php";
use Aws\S3\S3Client;

// バケット名
$bucket = '-----------------------';
// アクセスキーID
$accessKeyId = '--------------------';
// シークレットキー
$secretKey = '----------------------------------------';
$baseUrl = "https://s3-ap-northeast-1.amazonaws.com";

$s3 = new S3Client([
    'version' => 'latest',
    'credentials' => [
        'key' => $accessKeyId,
        'secret' => $secretKey,
    ],
    'region'  => 'ap-northeast-1',
]);

$objects = $s3->listObjects([
    'Bucket' => $bucket
]);

foreach ($objects['Contents'] as $object) {
    // 0バイトの時はディレクトリ
    if ($object['Size'] == '0') {
        continue;
    }
    // ファイルリンク
    echo("<a href='{$baseUrl}/{$bucket}/{$object['key']}' >{$baseUrl}/{$bucket}/{$object['Key']}</a>");
    // ファイルサイズ
    echo($object['Size']);
    // 更新日時
    echo((((array)$object['LastModified'])['date']));
    // 画像パス
    echo("<img src='{$baseUrl}/{$bucket}/{$object['key']}' height='30' loading='lazy'>");
}
```
