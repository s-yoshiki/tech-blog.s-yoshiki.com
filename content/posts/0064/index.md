---
title: "mavonEditor と Vue.js で作るMarkdownエディタのデモ + APIの紹介"
path: "/entry/64"
date: "2018-10-14 23:22:26"
coverImage: "../../../images/thumbnail/javascript-logo.png"
author: "s-yoshiki"
tags: ["html5","css3","javascript"]
---

## 概要

<img src="https://github.com/hinesboy/mavonEditor/raw/master/img/en/en-image.gif">
mavonEditor + Vue.js で作るMarkdownエディタについての紹介です。
また、用意されているAPIなどについて少し紹介します。

## mavonEditor

https://github.com/hinesboy/mavonEditor

中国語と英語のドキュメントが用意されています。
またデフォルトの言語も中国語になっています。

## セットアップ

基本的には複雑な設定を不要とし、以下のコードで動きます。

HTML

```html
<div id="app">
  <mavon-editor></mavon-editor>
</div>
```

JavaScript

```js
Vue.use(window['mavon-editor']);
var app = new Vue({
  el: '#app',
});
```

## カスタマイズ

特に設定も必要なく上記のコードで動きます。
拡張する場合はいくつかのプロパティなどを定義する必要があります。

これは、mavon-editor内に記述されたメソッドをエディタ外部のDOMに吐き出すデモです。

### デモ

<script async="" src="//jsfiddle.net/s_yoshiki/k9402zy1/embed/result,js,html,css/dark/"></script>

### コード

```html
<div id="app">
    <div class="editor">
        <mavon-editor fontSize="26" language="en" scrollStyle="false" placeholder="Markdown形式で入力してください。" boxShadow="false"  :toolbars="toolbars" v-on:imgAdd="$imgAdd" v-on:change="$change" ></mavon-editor>
    </div>
    <button @click="getMsg">getMsg</button>
    <div>{{ message }}</div>
</div>
```

```js
Vue.use(window['mavon-editor']);

var app = new Vue({
  el: '#app',
  data() {
    return {
      // mavon-editor
      toolbars: {
        bold: false,
      },
      // other
      message: '',
    };
  },
  methods: {
    $imgAdd(pos, $file) {
      alert('upload image');
    },
    $change(value, reader) {
      this.message = value;
    },
    getMsg() {
      console.log(this.message);
    },
  },
});
```

## APIの紹介

用意されているAPIには以下のようなものがあります。

### プロパティ

プロパティ一覧。
<a href="https://github.com/hinesboy/mavonEditor/blob/master/README-EN.md">ここから引用</a>

<table>
<thead>
<tr>
<th>name</th>
<th>type</th>
<th>default value</th>
<th>describe</th>
</tr>
</thead>
<tbody>
<tr>
<td>value</td>
<td>String</td>
<td></td>
<td>Initial value</td>
</tr>
<tr>
<td>language</td>
<td>String</td>
<td>zh-CN</td>
<td>Language switch, zh-CN: Simplified Chinese ， en: English ， fr: French, pt-BR: Brazilian Portuguese, ru: Russian</td>
</tr>
<tr>
<td>fontSize</td>
<td>String</td>
<td>15px</td>
<td>font-size of edit area</td>
</tr>
<tr>
<td>scrollStyle</td>
<td>Boolean</td>
<td>true</td>
<td>Open the scroll bar style(Temp only support chrome)</td>
</tr>
<tr>
<td>boxShadow</td>
<td>Boolean</td>
<td>true</td>
<td>css: box-shadow of mavonEditor</td>
</tr>
<tr>
<td>subfield</td>
<td>Boolean</td>
<td>true</td>
<td>true: Double columns - Edit preview same screen , Single Columns - otherwise not</td>
</tr>
<tr>
<td>defaultOpen</td>
<td>String</td>
<td></td>
<td>edit: default show edit area , preview: default show preview area , other = edit</td>
</tr>
<tr>
<td>placeholder</td>
<td>String</td>
<td>Begin editing...</td>
<td>The default prompt text when the textarea is empty</td>
</tr>
<tr>
<td>editable</td>
<td>Boolean</td>
<td>true</td>
<td>Edit switch</td>
</tr>
<tr>
<td>codeStyle</td>
<td>String</td>
<td>code-github</td>
<td>markdown Style: default github, <a href="/hinesboy/mavonEditor/blob/master/src/lib/core/hljs/lang.hljs.css.js">option
hljs color scheme</a></td>
</tr>
<tr>
<td>toolbarsFlag</td>
<td>Boolean</td>
<td>true</td>
<td>Show toolbars</td>
</tr>
<tr>
<td>navigation</td>
<td>Boolean</td>
<td>false</td>
<td>Show navigation</td>
</tr>
<tr>
<td>ishljs</td>
<td>Boolean</td>
<td>true</td>
<td>highlight code switch</td>
</tr>
<tr>
<td>imageFilter</td>
<td>Function</td>
<td>null</td>
<td>Image file filter Function, params is a File Object, you should return Boolean                about
the test result</td>
</tr>
<tr>
<td>imageClick</td>
<td>function</td>
<td>null</td>
<td>Image Click Function</td>
</tr>
<tr>
<td>toolbars</td>
<td>Object</td>
<td>As in the following example</td>
<td>toolbars</td>
</tr>
</tbody>
</table>

### ツールバー

上記のプロパティのtoolbarsに関しては以下のようなオブジェクトを定義した上で渡す必要があります。

```css
toolbars: {
      bold: true,
      italic: true,
      header: true,
      underline: true,
      strikethrough: true,
      mark: true,
      superscript: true,
      subscript: true,
      quote: true,
      ol: true,
      ul: true,
      link: true,
      imagelink: true,
      code: true,
      table: true,
      fullscreen: true,
      readmodel: true,
      htmlcode: true,
      help: true,
      /* 1.3.5 */
      undo: true,
      redo: true,
      trash: true,
      save: true,
      /* 1.4.2 */
      navigation: true，
      /* 2.1.8 */
      alignleft: true,
      aligncenter: true,
      alignright: true,
      /* 2.2.1 */
      subfield: true,
      preview: true
  }
```

### イベントメソッド

イベントメソッドには次のようなものが用意されています。

<table>
<thead>
<tr>
<th>name</th>
<th>params</th>
<th>describe</th>
</tr>
</thead>
<tbody>
<tr>
<td>change</td>
<td>String: value , String: reder</td>
<td>Edit area change callback event (render: Html source code)</td>
</tr>
<tr>
<td>save</td>
<td>String: value , String: reder</td>
<td>Ctrl+s and click save button</td>
</tr>
<tr>
<td>fullScreen</td>
<td>Boolean: status , String: value</td>
<td>Fullscreen editing toggle callback event(boolean: Fullscreen status)</td>
</tr>
<tr>
<td>readModel</td>
<td>Boolean: status , String: value</td>
<td>Reading mode toggle callback event(boolean: Reading mode status)</td>
</tr>
<tr>
<td>htmlCode</td>
<td>Boolean: status , String: value</td>
<td>Html code mode toggle callback event(boolean: status)</td>
</tr>
<tr>
<td>subfieldToggle</td>
<td>Boolean: status , String: value</td>
<td>Double columns edit mode toggle callback event(boolean: double columns status)</td>
</tr>
<tr>
<td>previewToggle</td>
<td>Boolean: status , String: value</td>
<td>Preview & Edit toggle callback event(boolean: preview status)</td>
</tr>
<tr>
<td>helpToggle</td>
<td>Boolean: status , String: value</td>
<td>Help-me toggle callback event(boolean: help status)</td>
</tr>
<tr>
<td>navigationToggle</td>
<td>Boolean: status , String: value</td>
<td>Navigation mode toggle callback event(boolean: nav status)</td>
</tr>
<tr>
<td>imgAdd</td>
<td>String: filename, File: imgfile</td>
<td>Add image file callback event(filename: write in origin md, File: File Object)</td>
</tr>
<tr>
<td>imgDel</td>
<td>String: filename</td>
<td>Delete image file callback event(filename: write in origin md)</td>
</tr>
</tbody>
</table>

### おまけ : mavonEditorのサイズの固定

デフォルトの状態だと改行した際にウィンドウがでかくなっていきます。

もしかしたら適切なプロパティが用意されているのかもしれませんが、
cssに以下のような属性を適用させたことで、ウィンドウサイズを固定できました。

```css
.markdown-body {
    max-height: 600px;
    height: 600px;
}
```
