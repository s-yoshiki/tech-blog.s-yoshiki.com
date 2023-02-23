---
title: "Amazon S3 と ローカルファイルのチェックサムの比較"
path: "/entry/202"
date: "2020-07-24"
coverImage: "../../../images/thumbnail/aws-logo.png"
author: "s-yoshiki"
tags: ["amazon-aws", "linux", "php"]
---

## 概要

Amazon S3 の Etagを使ってファイルの整合性チェックをする。

## s3apiでEtagを取得

S3 APIを利用するとEtagを取得します。この値はmd5のハッシュ値になります。

```shell
$ aws s3api head-object --bucket hoge-bucket --key index.html         
{
    "AcceptRanges": "bytes",
    "LastModified": "Sat, 11 Jul 2020 16:29:05 GMT",
    "ContentLength": 54331,
    "ETag": "\"177238eb55e3042bf9cbecf3ba5aaf35\"",
    "ContentType": "text/html",
    "Metadata": {}
}
```

## 検証

MD5の値は、md5コマンドであれば

```shell
$ md5 index.html 
MD5 (index.html) = 177238eb55e3042bf9cbecf3ba5aaf35
```

opensslコマンドであれば

```shell
$ openssl md5 index.html                                       
MD5(index.html)= 177238eb55e3042bf9cbecf3ba5aaf35
```

phpであれば

```
php > echo hash_file('md5', 'index.html');
177238eb55e3042bf9cbecf3ba5aaf35
php > echo md5_file('index.html');
177238eb55e3042bf9cbecf3ba5aaf35
```

## マルチアップロード時の注意点

s3にマルチパートアップロードされた際のEtagの値は通常のmd5値と異なるようです。

[S3マルチパートアップロードのETagの値](https://techblog.recochoku.jp/3659)

[S3のEtagの値はMD5と同じ？](https://gside.org/blog/2016/10/24/)

[What is the algorithm to compute the Amazon-S3 Etag for a file larger than 5GB?](https://stackoverflow.com/questions/12186993/what-is-the-algorithm-to-compute-the-amazon-s3-etag-for-a-file-larger-than-5gb)

phpで対応する場合の実装

```php
function calculate_aws_etag($filename, $chunksize)
{
    $chunkbytes = $chunksize*1024*1024;
    if (filesize($filename) < $chunkbytes) {
        return md5_file($filename);
    } else {
        $md5s = array();
        $handle = fopen($filename, 'rb');
        if ($handle === false) {
            return false;
        }
        while (!feof($handle)) {
            $buffer = fread($handle, $chunkbytes);
            $md5s[] = md5($buffer);
            unset($buffer);
        }
        fclose($handle);
        $concat = '';
        foreach ($md5s as $indx => $md5) {
            $concat .= hex2bin($md5);
        }
        return md5($concat) .'-'. count($md5s);
    }
}

$etag = calculate_aws_etag('path/to/myfile.ext', 8);
```
