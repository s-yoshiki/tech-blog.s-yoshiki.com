---
title: "MonacoEditor + Vue を使ってエディタを実装"
path: "/entry/141"
date: "2019-06-23 16:56:54"
coverImage: "../../../images/thumbnail/vue-logo.png"
author: "s-yoshiki"
tags: ["html5","javascript","monaco editor","vue.js"]
---

## 概要

Vue + MonacoEditorでJSのデバッガを作ってみました。
標準入出力(?)をサポートしています。とりあえず意味がわからないと思うのでデモをみてください。

## 紹介

**デモ**

<a href="https://s-yoshiki.github.io/AtCoder-JsDebugger/#/">https://s-yoshiki.github.io/AtCoder-JsDebugger/#/</a>

**GitHub**

<a href="https://github.com/s-yoshiki/AtCoder-JsDebugger">https://github.com/s-yoshiki/AtCoder-JsDebugger</a>

## セットアップ


### Vue

Vueプロジェクトのセットアップはこの辺りを参考にしてください。

<a href="https://tech-blog.s-yoshiki.com/2019/02/1090/">https://tech-blog.s-yoshiki.com/2019/02/1090/</a>

### vue-monaco

ここを参考にしました。

<a href="https://github.com/egoist/vue-monaco">https://github.com/egoist/vue-monaco</a>

```js
yarn add vue-monaco
```


## Usage


### サンプルコード


```html
<template>
  <monaco-editor class="editor" v-model="code" language="javascript" ref="editor" :theme="theme"></monaco-editor>
</template>

<script>
import MonacoEditor from "vue-monaco";

export default {
  components: {
    MonacoEditor
  },
  data() {
    return {
      code: "const noop = () => {}",
      theme: "vs-dark"
    };
  }
};
</script>

<style>
.editor {
  width: 600px;
  height: 800px;
}
</style>

```


### ポイント


#### テーマカラーについて

themeに指定できるのは以下の3種類である。
<ul>
 	<li>'vs' (白)</li>
 	<li>'vs-dark' (黒)</li>
 	<li>'hc-black' (ハイライトカラー)</li>
</ul>

#### エディタのリサイズ

cssを調整して、縦・横幅を100%にしていたとしても、エディタはリサイズされません。
windowのリサイズを検知した瞬間に以下のようなメソッドを適用する必要があります。

```js
window.addEventListener('resize', (e) => {
    this.$refs.editor.getMonaco().layout()
})
```


#### エディタの変更の検知

エディタの内容の変更についてはvueのwatchを使うのが良いでしょう。

変更を検知した瞬間に alert するサンプル

```js
import MonacoEditor from 'vue-monaco'
export default {
    components: {
        MonacoEditor,
    },
    data() {
        return {
            code: '',
        }
    },
    watch: {
        code() {
            alert(this.code)
        }
    },
}
```
