---
title: "画像のヒストグラムを表示する Chart.js JavaScript canvas"
path: "/entry/127"
date: "2019-05-26 19:30:25"
coverImage: "../../../images/thumbnail/javascript-logo.png"
author: "s-yoshiki"
tags: ["html5","javascript","画像処理","画像処理100本ノック","chart.js"]
---

## 概要

画像のヒストグラムをJavaScriptで算出してグラフとして表示してみます。

## ヒストグラム算出のサンプルコード

ヒストグラムの表示にChart.jsを使っています。

### インストール

npmを使っている場合は次のようにinstallします。

```
npm install chart.js
```

こちらを参考にしました。

<a href="https://www.chartjs.org/docs/latest/getting-started/installation.html">https://www.chartjs.org/docs/latest/getting-started/installation.html</a>

### ヒストグラム表示クラス

```js
import Chart from 'chart.js';

export default class Histogram {
  /**
   * ヒストグラムを描画する
   * @param {Object} canvas
   * @param {Object} data
   */
  static renderHistogram(canvas, data) {
    let labels = new Array(data.length).fill('');
    new Chart(canvas, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: '画素値',
            data,
            backgroundColor: 'rgba(80,80,80,0.5)',
          },
        ],
      },
      options: {
        title: {
          display: true,
          text: 'Histogram',
        },
        scales: {
          yAxes: [{
            ticks: {
              suggestedMin: 0,
            },
          }],
        },
        animation: {
          duration: 0,
        },
      },
    });
  }
}
```

### ヒストグラム算出

長さが255の配列を0で初期化し、各ピクセルのベクトルの数をカウントしています。
また、算出の前にrgbからグレイスケール画像に変換しています。

```js
import Histogram
const grayscale = (r, g, b) => 0.2126 * r + 0.7152 * g + 0.0722 * b
// 略
let pixelValues = new Array(255).fill(0)
for (let i = 0; i < src.data.length; i += 4) {
    let gray = grayscale(src.data[i], src.data[i + 1], src.data[i + 2])
    gary = Math.floor(gray)
    pixelValues[gray]++
}
Histogram.renderHistogram(canvas, pixelValues)
```

## デモ

こちらからデモを試せます。

<a href="https://s-yoshiki.github.io/Gasyori100knockJS/#/questions/ans20/iframe">https://s-yoshiki.github.io/Gasyori100knockJS/#/questions/ans20/iframe</a>

## 出力結果

次のように出力されます。

<img src="https://images-tech-blog.s-yoshiki.com/img/2019/05/20190526181900.png">

<img src="https://images-tech-blog.s-yoshiki.com/img/2019/05/20190526191307.jpg">

## 参考

<a href="https://s-yoshiki.github.io/Gasyori100knockJS/#/">https://s-yoshiki.github.io/Gasyori100knockJS/#/</a>
