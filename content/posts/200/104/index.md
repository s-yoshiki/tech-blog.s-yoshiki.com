---
title: "S3 で静的サイトをホスティングする"
path: "/entry/104"
date: "2019-01-25 00:45:15"
coverImage: "../../../images/thumbnail/aws-logo.png"
author: "s-yoshiki"
tags: ["amazon-aws","amazon-s3"]
---

## 概要

S3でバケットに置いたHTMLなどを静的サイトとしてホスティングする方法を紹介します。

## バケットの作成と公開設定

S3バケットの作成と公開設定はここを参考にしてください。

<a href="https://tech-blog.s-yoshiki.com/2019/01/1052/">https://tech-blog.s-yoshiki.com/2019/01/1052/</a>

## 静的ホスティングの設定

<a href="https://images-tech-blog.s-yoshiki.com/img/2019/01/201901242331_f9jLMz.jpg"><img src="https://images-tech-blog.s-yoshiki.com/img/2019/01/201901242331_f9jLMz.jpg"></a>

AWSのコンソールからバケットを選択します。

選択したバケットのタブからプロパティを選択し、
インデックスドキュメント名とエラードキュメント名を入力します。

<a href="https://images-tech-blog.s-yoshiki.com/img/2019/01/201901250025_4fg29z.jpg">
<img src="https://images-tech-blog.s-yoshiki.com/img/2019/01/201901250025_4fg29z.jpg"></a>

バケットからindex.htmlをアップします。

<a href="https://images-tech-blog.s-yoshiki.com/img/2019/01/201901250025_fhwuio.jpg"><img src="https://images-tech-blog.s-yoshiki.com/img/2019/01/201901250025_fhwuio.jpg"></a>

S3を静的サイトとしてホスティングしている場合は

http://バケット名.s3-website-ap-northeast-1.amazonaws.com

からアップロードしたhtmlを見ることができます。