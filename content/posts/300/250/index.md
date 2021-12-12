---
title: "[Vue]フロントエンド機能のみでダウンロードを実装する[JS]"
path: "/entry/250"
date: "2021-09-30 01:00"
coverImage: "../../../images/thumbnail/javascript-logo.png"
author: "s-yoshiki"
tags: ["vue","javascript"]
---

## 概要

フロントエンドのみ(=サーバサイドがダウンロードさせない) でダウンロードを行う機能を実装した時のメモです。

Vueを利用して実装していますが、ここで記載しているコードはVueに依存した機能ではなく、ピュアなJSのAPIをコールしているものです。

## 実装

### ポイント

Blobオブジェクトを利用するところがポイントとなります。

ダウンロードのイベントが実行された際、download属性を付与したaタグの要素を動的に作成します。

このaタグ要素にはダウンロードさせたいBlobオブジェクトを設定しておきます。

そして、この要素のクリックイベントを発火させることでダウンロードさせます。

### ソース

```html
<div id="app">
  <h2>ダウンロードのデモ</h2>
  <textarea v-model="text"></textarea>
  <br>
  <button v-on:click="download">download</button>
</div>
```

```js
new Vue({
  el: "#app",
  data: {
    text: '',
    csvData: [
    	['col1', 'col2', 'col3'],
    	['a', 'b', 'c'],
    	['aa', 'bb', 'cc'],
    ]
  },
  methods: {
  	download: function() {
      let blob = new Blob([this.text], {type : 'text/plain'});
      let blobURL = window.URL.createObjectURL(blob);
      let obj = document.createElement('a');
      obj.href = blobURL;
      obj.download = `202109091200.csv`
      document.body.appendChild(obj);
      obj.click();
      obj.parentNode.removeChild(obj);
    }
  },
  created() {
  	this.text = this.csvData.map(e1 => e1.join(",")).join("\n")
  }
})
```

### デモ

<iframe width="100%" height="300" src="//jsfiddle.net/s_yoshiki/82fa5ksb/embedded/result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>


## 参考サイト

[Blob - Web API | MDN](https://developer.mozilla.org/ja/docs/Web/API/Blob)
