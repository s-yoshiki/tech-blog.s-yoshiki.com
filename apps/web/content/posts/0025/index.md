---
title: "HTMLの中からaタグ・imgタグのリンクだけを抽出するツールを作った【JS】"
path: "/entry/25"
date: "2018-08-04 19:56:37"
coverImage: "../../../images/thumbnail/javascript-logo.png"
author: "s-yoshiki"
tags: ["html5","javascript","domparser"]
---

## 概要

HTMLの中からaタグ・imgタグのリンクを抽出するツールを作りました。
**a href抽出**
<img src="https://qiita-image-store.s3.amazonaws.com/0/82419/0b7bfae9-9701-ab29-3bdf-8c20f243df29.png" alt="2018080418_domparse1.png">
**img src抽出**
<img src="https://qiita-image-store.s3.amazonaws.com/0/82419/9b50959c-df5b-c07b-d123-a5ce1b37c17f.png" alt="2018080418_domparse2.png">
HTMLテキストをコピペするとaタグ・imgタグのリンクを抽出します。
pythonのスクレイピング関連ツール(bs4)とかを使えば、
簡単にパースをすることができると思いますが、
フロントの機能だけで(JSのみで)成り立つのがメリットかと思います。

## デモ

<iframe width="100%" height="300" src="//jsfiddle.net/s_yoshiki/m3uboag5/embedded/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

<a href="https://jsfiddle.net/s_yoshiki/m3uboag5/">https://jsfiddle.net/s_yoshiki/m3uboag5/</a>

## DomParserの紹介

<a href="https://developer.mozilla.org/ja/docs/Web/API/DOMParser">DOMParser - Web API インターフェイス | MDN</a>
xml html svgなどをパースします。

### DOMParser の生成

parser.parseFromString()を使うことでdocumentオブジェクトを返り血として受け取ることができます。
つまり、 getElementById()などが使えるということです。
<a href="https://developer.mozilla.org/ja/docs/Web/API/Document">document - Web API インターフェイス | MDN</a>

```js
var parser = new DOMParser();
var doc = parser.parseFromString(stringContainingXMLSource, 'application/xml');
// SVGDocument でも HTMLDocument でもなく、Document が返る

parser = new DOMParser();
doc = parser.parseFromString(stringContainingXMLSource, 'image/svg+xml');
// SVGDocument (Document) が返る

parser = new DOMParser();
doc = parser.parseFromString(stringContainingHTMLSource, 'text/html');
// HTMLDocument (Document) が返る
```

### aタグLinkの取得

以下の方法でリンクを取得できます。

```js
Array.from(doc.links, (e) => {
  return e.getAttribute('href').toString();
});
```

<a href="https://developer.mozilla.org/ja/docs/Web/API/Document/links">document.links - Web API インターフェイス | MDN</a>

```js
Array.from(doc.images, (e) => {
  return e.getAttribute('src').toString();
});
```

<a href="https://developer.mozilla.org/ja/docs/Web/API/Document/images">document.images - Web API インターフェイス | MDN</a>

## ソース

### HTML

```html
<!--
<link type="text/css" rel="stylesheet" href="//unpkg.com/bootstrap/dist/css/bootstrap.min.css"/>
<link type="text/css" rel="stylesheet" href="//unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.css"/>

<script src="//unpkg.com/babel-polyfill@latest/dist/polyfill.min.js"></script>
<script src="//unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.js"></script> -->
<header>
  <div class="container">

    ## html Parser

    <span>htmlをパースします</span>
  </div>
</header>

<main>
  <div class="container">
    <div>
      <textarea class="form-control" id="text"><html>
<body>
    <div>
        <p id="hello">
            Hello World!
        

        <a href="http://hoge.co.jp"></a>
    </div>
</body>
</html>
</textarea>
    </div>

    <div>
      <div>
        <select name="horoscope" class="form-control" id="select">
          <option value="1">a - href</option>
          <option value="2">img - src</option>
        </select>
      </div>
      <div>
        <label class="radio-inline"><input type="radio" name="format" id="type:json" checked> JSON </label>
        <label class="radio-inline"><input type="radio" name="format" id="type:csv"> CSV </label>
      </div>
    </div>
    <div align="right">
      <button class="btn btn-primary mb-2" id="run">
        run
      </button>
    </div>

    <div>
      <textarea class="form-control" id="result"></textarea>
    </div>
  </div>
</main>

<footer>
  <div class="container">

    <div style="font-family: Impact;">html Parser</div>hmtlをパースします
  </div>
</footer>
```

### JS

```js
(() => {
  'use stricts';

  document.getElementById('run').addEventListener('click', () => {
    try {
      let src = document.getElementById('text').value;
      let parsed_obj = getParsedObject(src);

      let type_csv = document.getElementById('type:csv').checked;
      let dst = {};
      let mode = document.getElementById('select').value;

      if (mode === '1') {
        dst = getHrefs(parsed_obj);
      } else if (mode === '2') {
        dst = getImgSrcs(parsed_obj);
      }

      if (type_csv) {
        document.getElementById('result').value = putList(dst);
      } else {
        document.getElementById('result').value = JSON.stringify(dst);
      }
    } catch (e) {
      alert(e);
    }
  });

  function getParsedObject(str_html) {
    let parser = new DOMParser();
    let doc = parser.parseFromString(str_html, 'text/html');
    return doc;
  }

  function getHrefs(doc) {
    return Array.from(
      doc.links,
      (e) => {
        return e.getAttribute('href').toString();
      },
    );
  }

  function getImgSrcs(doc) {
    return Array.from(
      doc.images,
      (e) => {
        return e.getAttribute('src').toString();
      },
    );
  }

  function putList(src) {
    var result = '';
    src.forEach((e) => {
      result += e + '\n';
    });
    return result;
  }
})();
```

何かしら役に立つ場面はあると思います。

## 参考
