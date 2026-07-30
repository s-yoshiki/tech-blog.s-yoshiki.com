---
title: "画像のヒストグラムをJavaScriptとCanvasで表示する"
path: "/entry/127"
date: "2019-05-26 19:30:25"
coverImage: "../../../images/thumbnail/javascript-logo.png"
author: "s-yoshiki"
tags: ["html5", "javascript", "typescript", "canvas", "画像処理", "画像処理100本ノック"]
---

## 概要

JavaScriptで画像のヒストグラムを計算し、Canvasへ棒グラフとして描画する方法を紹介します。

この記事は2019年にChart.jsを使う実装として公開しました。2026年の更新で、外部のグラフ
ライブラリを使わないTypeScript実装に合わせて内容を変更しました。

## デモとソース

- [Q.20 ヒストグラム表示](https://s-yoshiki.github.io/Gasyori100knockJS/questions/20)
- [Ans020.ts](https://github.com/s-yoshiki/Gasyori100knockJS/blob/master/src/questions/answers/Ans020.ts)
- [Canvasによるヒストグラム描画](https://github.com/s-yoshiki/Gasyori100knockJS/blob/master/src/lib/histogram.ts)

## ヒストグラムを計算する

0〜255の画素値に対応する256要素の配列を0で初期化します。画像のRGBA配列を4要素ずつ進み、
RGBの値を添字として出現回数を加算します。

```ts
const histogram = new Array<number>(256).fill(0);

for (let i = 0; i < src.data.length; i += 4) {
  histogram[src.data[i]]++;
  histogram[src.data[i + 1]]++;
  histogram[src.data[i + 2]]++;
}
```

グレースケールのヒストグラムが必要な場合は、RGBから輝度を計算して1画素につき1回加算します。

```ts
const gray = Math.floor(
  0.2126 * src.data[i] +
  0.7152 * src.data[i + 1] +
  0.0722 * src.data[i + 2],
);
histogram[gray]++;
```

## Canvasへ棒グラフを描く

最大度数を求め、グラフの高さに収まるように各ビンを正規化します。256本の棒をCanvasの幅へ
割り当て、`fillRect`で描画します。

```ts
const max = Math.max(...histogram);
const barWidth = canvas.width / histogram.length;

histogram.forEach((count, index) => {
  const height = (count / max) * canvas.height;
  context.fillRect(
    index * barWidth,
    canvas.height - height,
    Math.max(1, barWidth),
    height,
  );
});
```

現在の共通描画処理では、CSSカスタムプロパティから色を取得し、サイトのライト・ダークテーマへ
追従します。

## ヒストグラムから読み取れること

暗い画像は左側、明るい画像は右側へ分布が偏ります。狭い範囲へ値が集中している画像は
コントラストが低い傾向があります。

分布を確認した後、正規化、平坦化、ガンマ補正を適用すると、処理前後で画素値がどのように
移動したかを確認できます。

## 関連記事

- [画像のヒストグラムと濃度変換をCanvasで実装する](/entry/320)
- [JavaScriptで画像のヒストグラムを正規化](/entry/134)
- [画像をグレースケールに変換する](/entry/113)
