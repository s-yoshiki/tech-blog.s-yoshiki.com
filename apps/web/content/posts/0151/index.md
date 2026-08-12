---
title: "shields.io用アイコンジェネレータを作ってみた"
path: "/entry/151"
date: "2019-07-13 22:57:08"
coverImage: "../../../images/thumbnail/shieldsio.png"
author: "s-yoshiki"
tags: ["小ネタ","vue.js","shields.io"]
---

## 概要

shields.io用アイコンジェネレータを作ってみました。

## デモ

<iframe src="https://codesandbox.io/embed/icon-generator-shields-io-t8csp?fontsize=14" title="Icon generator -  shields io" allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

<a href="https://codesandbox.io/s/icon-generator-shields-io-t8csp?fontsize=14">
<img alt="Edit Icon generator -  shields io" src="https://codesandbox.io/static/img/play-codesandbox.svg">
</a>

## 情報

Vue + codesandboxで作ってみました。
詳しい作り方は<a href="https://tech-blog.s-yoshiki.com/2019/07/1400/">ここ</a>を参考にしてください。

## 参考

<a href="https://tech-blog.s-yoshiki.com/2019/07/1400/">https://tech-blog.s-yoshiki.com/2019/07/1400/</a>

<a href="https://qiita.com/s-yoshiki/items/436bbe1f7160b610b05c">https://qiita.com/s-yoshiki/items/436bbe1f7160b610b05c</a>

## ソース

**index.vue**

```html
<template>
  <div class="main">
    <h2>icon-generator shields.io</h2>
    <div>
      Template :
      <select v-model="selectedIcon" v-on:change="bindItemStatus('');generateIconUrl()">
        <option disabled value>Please select one</option>
        <option v-for="option in options" v-bind:key="option.name">{{ option.name }}</option>
      </select>
    </div>
    <div>
      TextLeft:
      <input type="text" v-model="inputItemTextLeft" v-on:keyup="generateIconUrl()">
      TextRight:
      <input
        type="text"
        v-model="inputItemTextRight"
        v-on:keyup="generateIconUrl()"
      >
      Logo:
      <input type="text" v-model="inputItemLogo" v-on:keyup="generateIconUrl()">
      Color:
      <input type="text" v-model="inputItemColor" v-on:keyup="generateIconUrl()">
      Style:
      <select v-model="selectedStyle" v-on:change="generateIconUrl()">
        <option disabled value>Please select one</option>
        <option v-for="option in iconStyle" v-bind:key="option.name">{{ option.value }}</option>
      </select>
    </div>
    <div class="center">
      <img :src="dispLogoUrl" height="80">
    </div>
    <div class="center">
      <button v-on:click="addItem()">add icon</button>
    </div>
    
    <div class="center img-height-50" v-html="addesUrlsHTML"></div>
    
    <code>
    {{addesUrlsHTML}}
    </code>

  </div>
</template>

<script>
import icons from "../lib/icons.js";
import iconStyle from "../lib/iconStyle.js";
export default {
  name: "Index",
  data() {
    return {
      selectedIcon: "vue.js",
      options: icons,
      selectedStyle: "plastic",
      iconStyle: iconStyle,
      inputItemTextRight: "",
      inputItemTextLeft: "",
      inputItemLogo: "",
      inputItemColor: "",
      dispLogoUrl: "",
      addedIconsUrl: [],
      addesUrlsHTML: "",
      addesUrlsText: ""
    };
  },
  methods: {
    getColorCode(key) {
      for (let i = 0; i < icons.length; i++) {
        const name = icons[i].name;
        if (name === key) {
          return icons[i].color;
        }
      }
      return "";
    },
    bindItemStatus() {
      this.inputItemTextLeft = "";
      let text = this.selectedIcon.split("-").join(" ");
      text = text.split("");
      text[0] = text[0].toUpperCase();
      text = text.join("");
      this.inputItemTextRight = text;
      this.inputItemLogo = this.selectedIcon;
      this.inputItemColor = this.getColorCode(this.selectedIcon);
    },
    generateIconUrl() {
      this.dispLogoUrl = this.bindCustomIconUrl(
        this.inputItemTextLeft,
        this.inputItemTextRight,
        this.inputItemLogo,
        this.inputItemColor,
        this.selectedStyle
      );
    },
    bindCustomIconUrl(
      textLeft,
      textRight,
      logo,
      color = "ccc",
      style = "flat"
    ) {
      textLeft = encodeURI(textLeft);
      textRight = encodeURI(textRight);
      logo = encodeURI(logo);
      color = encodeURI(color);
      style = encodeURI(style);
      return `https://img.shields.io/badge/${textLeft}-${textRight}-${color}.svg?logo=${logo}&style=${style}`;
    },
    addItem() {
      this.addedIconsUrl.push(this.dispLogoUrl);
      this.addesUrlsHTML = this.addedIconsUrl
        .map(e => {
          return `<img src="${e}">`;
        })
        .join("\n");
    }
  },
  mounted() {
    this.bindItemStatus();
    this.generateIconUrl();
  }
};
</script>
```
