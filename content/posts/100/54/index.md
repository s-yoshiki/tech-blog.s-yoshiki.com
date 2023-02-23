---
title: "NodeJSでsitemapをパースしてURLを抽出する。"
path: "/entry/54"
date: "2018-09-25 01:00:16"
coverImage: "../../../images/thumbnail/javascript-logo.png"
author: "s-yoshiki"
tags: ["javascript","スクレイピング","node.js","sitemap"]
---

## 概要

NodeJSでsitemap.xmlからURLを抽出する方法のメモ。
ちょっとググるとsitemap-stream-parserなんてものがありましたが、正直イケてませんでした。

PythonならBeautifulSoupという強力なライブラリがありますが、
せっかくなのでNodeJS自作しました。

## 環境 + 利用したもの

macOS
NodeJS v10.10.0
sync-request ※同期処理でリクエストを投げる
xml2json *XMLをJSONに変換するモジュール

## 実装

### 実装で気をつけたポイント

sitemap.xmlはURLがそのまま記述されているパターンのものと、
子のxmlのパスが記述されているパターンがあります。

ちょっとググるとこの点を考慮していないものも見受けられますが、
紹介する実装はこの点を考慮しました。

### シンプルに配列を返すパターン

```js
const request = require('sync-request');
const parser = require('xml2json');

const url = 'https://tech-blog.s-yoshiki.com/sitemap.xml';
console.log(JSON.stringify(getSitemap(url)));

function getSitemap(sitemap_url) {
  var result = [];
  var response = request(
    'GET',
    sitemap_url,
  );

  if (response.statusCode !== 200) {
    console.log('Status Code (function) : ' + response.statusCode);
    return;
  }

  var data = JSON.parse(
    parser.toJson(
      response.getBody('utf8'),
    ),
  );
  if (data['urlset']) {
    if (data['urlset']['url'].length > 0) {
      data['urlset']['url'].forEach((v) => {
        result.push(v);
      });
    } else if (data['urlset']['url']) {
      result.push(data['urlset']['url']);
    }
  }

  if (!data['sitemapindex'] || !data['sitemapindex']['sitemap']) {
    return result;
  }

  if (data['sitemapindex']['sitemap'].length > 0) {
    data['sitemapindex']['sitemap'].forEach((v) => {
      Array.prototype.push.apply(result, getSitemap(v.loc));
    });
  } else if (data['sitemapindex']['sitemap']['loc']) {
    result.push(getSitemap(v.loc));
  }
  return result;
}
```

### 非同期実行にする場合

```js
getSitemap(url, (v) => {
  console.log(v);
}, (err) => {
  console.log(err);
});

function getSitemap(sitemap_url, success_callback, err_callback) {
  var response = request(
    'GET',
    sitemap_url,
  );

  if (response.statusCode !== 200) {
    err_callback(response);
    return;
  }

  var data = JSON.parse(
    parser.toJson(
      response.getBody('utf8'),
    ),
  );
  if (data['urlset']) {
    if (data['urlset']['url'].length > 0) {
      data['urlset']['url'].forEach((v) => {
        success_callback(v);
      });
    } else if (data['urlset']['url']) {
      success_callback(data['urlset']['url']);
    }
  }

  if (!data['sitemapindex'] || !data['sitemapindex']['sitemap']) {
    return;
  }

  if (data['sitemapindex']['sitemap'].length > 0) {
    data['sitemapindex']['sitemap'].forEach((v) => {
      getSitemap(v.loc, success_callback, err_callback);
    });
  } else if (data['sitemapindex']['sitemap']['loc']) {
    getSitemap(v.loc, success_callback, err_callback);
  }
}
```

### 出力

出力例として、下記のような出力がされます。

```js
{ loc: 'https://tech-blog.s-yoshiki.com/2018/01/13/',
  lastmod: '2018-05-03T05:45:57+00:00',
  changefreq: 'monthly',
  priority: '1.0' }
{ loc: 'https://tech-blog.s-yoshiki.com/2018/01/10/',
  lastmod: '2018-09-09T07:59:35+00:00',
  changefreq: 'monthly',
  priority: '1.0' }
{ loc: 'https://tech-blog.s-yoshiki.com/2018/01/5/',
  lastmod: '2018-01-22T12:15:57+00:00',
  changefreq: 'monthly',
  priority: '1.0' }
{ loc: 'https://tech-blog.s-yoshiki.com/blog_history/',
  lastmod: '2018-09-24T15:38:10+00:00',
  changefreq: 'weekly',
  priority: '0.3' }
{ loc: 'https://tech-blog.s-yoshiki.com/contents/',
  lastmod: '2018-06-16T14:48:38+00:00',
  changefreq: 'weekly',
  priority: '0.3' }
{ loc: 'https://tech-blog.s-yoshiki.com/about-me/',
  lastmod: '2018-07-28T13:28:55+00:00',
  changefreq: 'weekly',
  priority: '0.3' }
```
