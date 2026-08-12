---
title: "[Vue]フロントエンド機能のみでダウンロードを実装する[JS]"
path: "/entry/250"
date: "2021-09-30 01:00"
coverImage: "../../../images/thumbnail/javascript-logo.png"
author: "s-yoshiki"
tags: ["vue.js","javascript"]
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
  el: '#app',
  data: {
    text: '',
    csvData: [
      ['col1', 'col2', 'col3'],
      ['a', 'b', 'c'],
      ['aa', 'bb', 'cc'],
    ],
  },
  methods: {
    download: function () {
      const bom = new Uint8Array([0xef, 0xbb, 0xbf]);
      const blob = new Blob([bom, this.text], {
        type: 'text/csv;charset=utf-8',
      });
      const blobURL = URL.createObjectURL(blob);
      const link = document.createElement('a');

      link.href = blobURL;
      link.download = 'sample.csv';
      document.body.appendChild(link);
      link.click();
      link.remove();

      // Blob URLが保持しているメモリを解放する
      URL.revokeObjectURL(blobURL);
    },
  },
  created() {
    this.text = this.csvData.map(e1 => e1.join(',')).join('\n');
  },
});
```

`URL.createObjectURL()` で作成したURLは、不要になったら `URL.revokeObjectURL()` で解放します。繰り返しダウンロードする画面で解放しないと、Blobがメモリに残り続ける原因になります。

## Vue 3 / TypeScriptで再利用する

ダウンロード処理はVue固有ではないため、関数として切り出せます。

```ts
export function downloadText(
  content: string,
  filename: string,
  type = 'text/plain;charset=utf-8',
): void {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = filename;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
```

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { downloadText } from './downloadText';

const text = ref('hello\nworld');

const download = () => {
  downloadText(text.value, 'sample.txt');
};
</script>

<template>
  <button type="button" @click="download">ダウンロード</button>
</template>
```

## CSVを作るときの注意

単純な `row.join(',')` は、値の中にカンマ、改行、ダブルクォートが含まれると壊れます。CSVとしてエスケープしてください。

```js
const escapeCsv = (value) => {
  const text = String(value ?? '');
  return /[",\r\n]/.test(text)
    ? `"${text.replaceAll('"', '""')}"`
    : text;
};

const csv = rows
  .map((row) => row.map(escapeCsv).join(','))
  .join('\r\n');
```

Excelで日本語CSVを開く用途ではUTF-8 BOMを付けることがあります。一方、連携先がBOMを許容しない場合もあるため、利用先の仕様に合わせます。

## 制約と安全上の注意

- ブラウザ内でBlobを生成するため、巨大ファイルには不向きです
- ファイル名へユーザー入力を使う場合は `/` や制御文字を除去します
- `download` 属性は同一オリジンURLまたはBlob URLで使うのが基本です
- Service Workerでは `URL.createObjectURL()` を利用できません
- サーバーが生成済みの大容量ファイルは、ストリーミング配信や署名付きURLを検討します

### デモ

<iframe width="100%" height="300" src="//jsfiddle.net/s_yoshiki/82fa5ksb/embedded/result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

## 参考サイト

[Blob - Web API | MDN](https://developer.mozilla.org/ja/docs/Web/API/Blob)

[URL.createObjectURL() - Web API | MDN](https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL_static)

[URL.revokeObjectURL() - Web API | MDN](https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL_static)
