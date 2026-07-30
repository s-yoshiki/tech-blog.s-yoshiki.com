---
title: "画像処理100本ノックをTypeScriptとCanvas APIで実装した"
path: "/entry/318"
date: "2026-07-23 21:00"
coverImage: "../../../images/thumbnail/opencv-logo.png"
author: "s-yoshiki"
tags: ["typescript", "javascript", "react", "canvas", "画像処理"]
---

## 概要

画像処理の代表的なアルゴリズムを100問の演習形式で学べる「画像処理100本ノック」を、
TypeScriptとCanvas APIで実装したWebアプリケーションを公開しています。

- [Gasyori100knockJS - デモ](https://s-yoshiki.github.io/Gasyori100knockJS/)
- [s-yoshiki/Gasyori100knockJS - GitHub](https://github.com/s-yoshiki/Gasyori100knockJS)

Q.1からQ.100までをブラウザ上で実行でき、入力画像と処理結果をその場で比較できます。

![Gasyori100knockJS](https://raw.githubusercontent.com/s-yoshiki/Gasyori100knockJS/master/public/common/og-image.png)

## Gasyori100knockJSとは

[画像処理100本ノック](https://github.com/ryoppippi/Gasyori100knock)の各問題を、
TypeScriptとCanvas APIを使ってブラウザ上で動く形にしたプロジェクトです。

OpenCVなどの画像処理ライブラリは使用していません。Canvas 2D Contextの
`getImageData`で画素を読み出し、アルゴリズムを適用した結果を`putImageData`で
Canvasへ書き戻しています。

例えばQ.1のチャネル入れ替えでは、RGBAの画素バッファを4要素ずつ処理します。

```ts
const src = ctx.getImageData(0, 0, image.width, image.height);
const dst = ctx.createImageData(image.width, image.height);

for (let i = 0; i < src.data.length; i += 4) {
  dst.data[i] = src.data[i + 2];
  dst.data[i + 1] = src.data[i + 1];
  dst.data[i + 2] = src.data[i];
  dst.data[i + 3] = src.data[i + 3];
}

ctx.putImageData(dst, 0, 0);
```

ライブラリのAPIを呼び出すだけでは見えにくい、画素データの構造や計算手順をコードから
確認できる点が特徴です。

## 収録している内容

100問は、基本的な色変換から物体検出の評価まで段階的に構成されています。

| 問題 | 主なテーマ |
| --- | --- |
| Q.1〜10 | 色変換、二値化、プーリング、平滑化 |
| Q.11〜20 | 空間フィルタ、エッジ、ヒストグラム |
| Q.21〜30 | 濃度変換、補間、アフィン変換 |
| Q.31〜40 | フーリエ変換、DCT、JPEG圧縮 |
| Q.41〜50 | Canny、Hough変換、モルフォロジー |
| Q.51〜60 | 形態学的変換、テンプレート照合、ラベリング |
| Q.61〜70 | 連結数、細線化、HOG、色追跡 |
| Q.71〜80 | 画像ピラミッド、顕著性、ガボールフィルタ |
| Q.81〜90 | コーナー検出、色ヒストグラム認識、k-NN、k-means |
| Q.91〜100 | k-means減色、IoU、ニューラルネット、物体検出、NMS、評価指標 |

問題一覧から任意の問題を選び、実行ボタンを押すと処理結果を確認できます。入力画像を
切り替えられる問題では、画像の特徴によって出力がどう変わるかも比較できます。

## 実装上の特徴

### 画像処理ロジックとUIを分離

アプリケーションはReactとViteで構築していますが、各問題の画像処理ロジックはReactに
依存しない構成にしています。

```text
pages        ルーティング単位の画面
  ↓
components   Canvasの準備と解答の実行
  ↓
questions    各問題の画像処理ロジック
  ↓
lib          Canvas、行列、ヒストグラムの共通処理
```

UIと画像処理の責務を分けたことで、画面側のフレームワークを変更しても、100問分の
アルゴリズムをそのまま利用できます。

### 実行時の依存を最小限にした

行列演算やヒストグラム描画もプロジェクト内で実装しています。逆行列、要素ごとの積と商、
Canvasを使ったヒストグラム描画などを共通処理として切り出しており、実行時の依存は
ReactとReact Routerのみです。

### 各問題をiframeで埋め込める

問題ページの埋め込みコードを使うと、特定の問題だけを別ページへ掲載できます。

```html
<iframe
  src="https://s-yoshiki.github.io/Gasyori100knockJS/embed/1"
  style="width: 100%; height: 520px; border: 0"
  loading="lazy"
></iframe>
```

アルゴリズムの解説記事や教材から、実際に動くデモへ直接触れられる用途を想定しています。

## ローカルで動かす

Node.jsとpnpmを用意し、次のコマンドで起動できます。

```sh
git clone https://github.com/s-yoshiki/Gasyori100knockJS.git
cd Gasyori100knockJS
pnpm install
pnpm dev
```

起動後、`http://localhost:5173/Gasyori100knockJS/`を開きます。

型検査、Lint、フォーマット検査、テストは次のコマンドでまとめて実行できます。

```sh
pnpm check
```

## まとめ

Gasyori100knockJSでは、画像処理100本ノックの全問題をブラウザ上で試せます。Canvas APIを
通じて画素を直接操作しているため、各アルゴリズムの入出力だけでなく実装の流れも追えます。

画像処理の学習やTypeScriptでのCanvas操作のサンプルとして、デモとソースコードを
活用してみてください。

## 参考

- [s-yoshiki/Gasyori100knockJS](https://github.com/s-yoshiki/Gasyori100knockJS)
- [Gasyori100knock（画像処理100本ノック）](https://github.com/ryoppippi/Gasyori100knock)
