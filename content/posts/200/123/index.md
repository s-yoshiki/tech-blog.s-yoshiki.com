---
title: "画像のプーリング処理 canvas + JavaScript"
path: "/entry/123"
date: "2019-05-19 00:54:50"
coverImage: "../../../images/thumbnail/javascript-logo.png"
author: "s-yoshiki"
tags: ["html5","javascript","機械学習","画像処理","vue.js","画像処理100本ノック","プーリング","cnn"]
---

## 概要

JavaScriptで画像のプーリング処理を行ってみました。

## プーリング処理について

プーリングは畳み込みに似た処理で、CNNでも重要な役割があります。
画像を圧縮する役割を果たします。
平均プーリングやmaxプーリングといったものがあります。
平均プーリングはグリッド内を平均の値で埋めるもので、MAXプーリングはグリッド内の最大値で埋めます。

<blockquote class="twitter-tweet" data-lang="ja">
<p lang="ja" dir="ltr"><Memo> 平均プーリング [average pooling]
プーリング関数の１つである、平均プーリングは、添付図のように、局所的な受容野 P_i,j 内に属するノードの入力値の平均を、このノードの出力として集約する（空間的にぼかす）。 <a href="https://t.co/0WxbnJ9qzO">pic.twitter.com/0WxbnJ9qzO</a>

— ヤガミ (@yagami_360) <a href="https://twitter.com/yagami_360/status/916257017588719617?ref_src=twsrc%5Etfw">2017年10月6日</a></blockquote>

<script async="" src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## サンプルソース

**MAXプーリング**

```js
export default class {
  /**
   * メイン
   * @param {Object} canvas
   * @param {Object} image
   */
  main(canvas, image) {
    let w = image.width;
    let h = image.height;
    let dx = w / 16;
    let dy = h / 16;

    let ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0, image.width, image.height);

    const blurColor = (x, y, w, h) => {
      let ctx = canvas.getContext('2d');
      let r, g, b;
      r = g = b = 0;

      let src = ctx.getImageData(x, y, w, h);
      let dst = ctx.createImageData(w, h);

      for (let i = 0; i < src.data.length; i += 4) {
        r += src.data[i];
        g += src.data[i + 1];
        b += src.data[i + 2];
      }

      r /= src.data.length / 4;
      g /= src.data.length / 4;
      b /= src.data.length / 4;

      r = Math.ceil(r);
      g = Math.ceil(g);
      b = Math.ceil(b);

      for (let i = 0; i < src.data.length; i += 4) {
        dst.data[i] = r;
        dst.data[i + 1] = g;
        dst.data[i + 2] = b;
        dst.data[i + 3] = 255;
      }
      ctx.putImageData(dst, x, y);
    };

    for (let i = 0; i < canvas.width; i += dx) {
      for (let j = 0; j < canvas.height; j += dy) {
        blurColor(i, j, dx, dy);
      }
    }
  }
}
```

**MAXプーリング**

```js
export default class {
  /**
   * メイン
   * @param {Object} canvas
   * @param {Object} image
   */
  main(canvas, image) {
    let w = image.width;
    let h = image.height;
    let dx = w / 16;
    let dy = h / 16;

    let ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0, image.width, image.height);

    const blurColor = (x, y, w, h) => {
      let ctx = canvas.getContext('2d');
      let r, g, b;
      r = g = b = 0;

      let src = ctx.getImageData(x, y, w, h);
      let dst = ctx.createImageData(w, h);

      for (let i = 0; i < src.data.length; i += 4) {
        r = src.data[i] > r ? src.data[i] : r;
        g = src.data[i + 1] > g ? src.data[i + 1] : g;
        b = src.data[i + 2] > b ? src.data[i + 2] : b;
      }

      for (let i = 0; i < src.data.length; i += 4) {
        dst.data[i] = r;
        dst.data[i + 1] = g;
        dst.data[i + 2] = b;
        dst.data[i + 3] = 255;
      }
      ctx.putImageData(dst, x, y);
    };

    for (let i = 0; i < canvas.width; i += dx) {
      for (let j = 0; j < canvas.height; j += dy) {
        blurColor(i, j, dx, dy);
      }
    }
  }
}
```

## デモ

<a href="https://s-yoshiki.github.io/Gasyori100knockJS/#/questions/ans7/iframe">https://s-yoshiki.github.io/Gasyori100knockJS/#/questions/ans7/iframe</a>

<a href="https://s-yoshiki.github.io/Gasyori100knockJS/#/questions/ans7/iframe">平均プーリング</a>

<img src="https://images-tech-blog.s-yoshiki.com/img/2019/05/20190518004055.png">

平均プーリングのサンプルがこちらになります。

<a href="https://s-yoshiki.github.io/Gasyori100knockJS/#/questions/ans8/iframe">https://s-yoshiki.github.io/Gasyori100knockJS/#/questions/ans8/iframe</a>

<a href="https://s-yoshiki.github.io/Gasyori100knockJS/#/questions/ans8/iframe">MAXプーリング</a>

<img src="https://images-tech-blog.s-yoshiki.com/img/2019/05/20190518004109.png">

MAXプーリングのサンプルがこちらになります。

## 参考文献

<a href="https://qiita.com/FukuharaYohei/items/73cce8f5707a353e3c3a">https://qiita.com/FukuharaYohei/items/73cce8f5707a353e3c3a</a>

<a href="http://pynote.hatenablog.com/entry/dl-pooling">http://pynote.hatenablog.com/entry/dl-pooling</a>

<a href="https://deepage.net/deep_learning/2016/11/07/convolutional_neural_network.html">https://deepage.net/deep_learning/2016/11/07/convolutional_neural_network.html</a>

<a href="https://github.com/yoyoyo-yo/Gasyori100knock/tree/master/Question_01_10">https://github.com/yoyoyo-yo/Gasyori100knock/tree/master/Question_01_10</a>
