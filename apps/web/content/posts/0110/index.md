---
title: "TypeScriptとCanvas APIで画像処理100本ノックを全100問実装した"
path: "/entry/110"
date: "2019-03-27 19:26:05"
coverImage: "../../../images/thumbnail/javascript-logo.png"
author: "s-yoshiki"
tags: ["typescript", "javascript", "canvas", "アルゴリズム", "画像処理", "画像処理100本ノック"]
---

## 概要

[画像処理100本ノック](https://github.com/ryoppippi/Gasyori100knock)を、TypeScriptと
Canvas APIで実装しました。画像処理ライブラリを使わず、Q.1〜Q.100をブラウザ上で実行できます。
ReactとViteで作ったアプリの概要、問題別の解説、ローカルでの起動方法をこの記事にまとめます。

- [Gasyori100knockJSのデモ](https://s-yoshiki.github.io/Gasyori100knockJS/)
- [s-yoshiki/Gasyori100knockJS](https://github.com/s-yoshiki/Gasyori100knockJS)

![Gasyori100knockJS](https://raw.githubusercontent.com/s-yoshiki/Gasyori100knockJS/master/public/common/og-image.png)

この記事は2019年に、JavaScriptとVueで40問まで実装した時点の記録として公開しました。
2026年に100問すべての実装とReact・TypeScriptへの移行が完了したため、現在の構成と
アルゴリズム別の解説記事一覧へ更新しました。

## 実装の特徴

Canvas 2D Contextの`getImageData`でRGBAの画素配列を取得し、各アルゴリズムを適用した結果を
`putImageData`でCanvasへ戻します。

```ts
const src = context.getImageData(0, 0, width, height);
const dst = context.createImageData(width, height);

for (let i = 0; i < src.data.length; i += 4) {
  // src.data[i + 0] = R
  // src.data[i + 1] = G
  // src.data[i + 2] = B
  // src.data[i + 3] = A
}

context.putImageData(dst, 0, 0);
```

OpenCVなどの画像処理ライブラリは使用していません。行列演算、ヒストグラム描画、HOG、
IoU、NMSもプロジェクト内で実装しています。

### アプリケーションの構成

画面と画像処理ロジックを分離しています。Reactの画面側はCanvasの準備と問題の実行を担当し、
各アルゴリズムはReactに依存しないTypeScriptの関数として実装しています。

```text
pages        問題や一覧の画面
  ↓
components   Canvasの準備と解答の実行
  ↓
questions    各問題の画像処理ロジック
  ↓
lib          Canvas、行列、ヒストグラムなどの共通処理
```

この構成により、画面の実装とアルゴリズムを別々に追えます。問題ごとのページは埋め込みにも
対応しているため、特定の処理だけを教材やドキュメントから試すこともできます。

## 4記事で読む画像処理100本ノック

問題をアルゴリズムの役割で4つに分けました。各ページで、デモ、実装の要点、注意点をまとめています。

| 記事 | 問題 | 主な内容 |
| --- | --- | --- |
| 1. 基礎の画素操作 | Q.1〜8 | 色変換、二値化、減色、プーリング（この記事） |
| [2. フィルタ・濃度・座標変換](/entry/319) | Q.9〜40 | 平滑化、エッジ、ヒストグラム、補間、周波数処理、JPEG |
| [3. 領域・形状・特徴抽出](/entry/324) | Q.41〜83 | Canny、モルフォロジー、ラベリング、HOG、色追跡、特徴点 |
| [4. 画像分類・物体検出](/entry/333) | Q.84〜100 | k-NN、k-means、ニューラルネットワーク、NMS、評価 |

## 基礎となる画素操作（Q.1〜8）

Canvasの`ImageData.data`は、画素ごとに赤・緑・青・アルファの順で値を持つ配列です。問題1〜8では、
このRGBA配列を走査し、色変換や領域の集約を行います。デモでは各問題に同じ画像を入力し、結果を比較できます。

| 問題 | デモ | 実装 |
| --- | --- | --- |
| Q.1 RGBチャンネル入れ替え | [デモ](https://s-yoshiki.github.io/Gasyori100knockJS/questions/1) | [Ans001.ts](https://github.com/s-yoshiki/Gasyori100knockJS/blob/master/src/questions/answers/Ans001.ts) |
| Q.2 グレースケール | [デモ](https://s-yoshiki.github.io/Gasyori100knockJS/questions/2) | [Ans002.ts](https://github.com/s-yoshiki/Gasyori100knockJS/blob/master/src/questions/answers/Ans002.ts) |
| Q.3 固定閾値の二値化 | [デモ](https://s-yoshiki.github.io/Gasyori100knockJS/questions/3) | [Ans003.ts](https://github.com/s-yoshiki/Gasyori100knockJS/blob/master/src/questions/answers/Ans003.ts) |
| Q.4 大津の二値化 | [デモ](https://s-yoshiki.github.io/Gasyori100knockJS/questions/4) | [Ans004.ts](https://github.com/s-yoshiki/Gasyori100knockJS/blob/master/src/questions/answers/Ans004.ts) |
| Q.5 RGBとHSVの変換 | [デモ](https://s-yoshiki.github.io/Gasyori100knockJS/questions/5) | [Ans005.ts](https://github.com/s-yoshiki/Gasyori100knockJS/blob/master/src/questions/answers/Ans005.ts) |
| Q.6 固定値への減色 | [デモ](https://s-yoshiki.github.io/Gasyori100knockJS/questions/6) | [Ans006.ts](https://github.com/s-yoshiki/Gasyori100knockJS/blob/master/src/questions/answers/Ans006.ts) |
| Q.7 平均プーリング | [デモ](https://s-yoshiki.github.io/Gasyori100knockJS/questions/7) | [Ans007.ts](https://github.com/s-yoshiki/Gasyori100knockJS/blob/master/src/questions/answers/Ans007.ts) |
| Q.8 Maxプーリング | [デモ](https://s-yoshiki.github.io/Gasyori100knockJS/questions/8) | [Ans008.ts](https://github.com/s-yoshiki/Gasyori100knockJS/blob/master/src/questions/answers/Ans008.ts) |

### チャンネル入れ替えとグレースケール

Q.1では各画素のRとBを入れ替えてBGRにします。Gとアルファ値はそのまま引き継ぎます。
Canvasの配列はRGBA順なので、添字を4つずつ進めると1画素を処理できます。

```ts
for (let i = 0; i < src.data.length; i += 4) {
  dst.data[i] = src.data[i + 2];
  dst.data[i + 1] = src.data[i + 1];
  dst.data[i + 2] = src.data[i];
  dst.data[i + 3] = src.data[i + 3];
}
```

Q.2では次の輝度近似を使い、計算結果をRGBの各チャンネルに設定します。

```text
Y = 0.2126R + 0.7152G + 0.0722B
```

係数は緑の寄与を大きくしており、単純平均より人の視覚に近い明るさになります。Q.3以降の二値化や
エッジ検出でもグレースケールを使います。いずれも透明度を保つため、出力のアルファ値には入力をコピーします。

### 固定閾値と大津の二値化

Q.3は各画素の輝度を閾値128と比べ、閾値より大きければ白、小さければ黒にします。閾値を固定すると
簡単に実装できますが、明るさが異なる画像では前景と背景をうまく分けられない場合があります。

Q.4では、まずグレースケール画像のヒストグラムを計算し、0〜255の閾値候補ごとに前景と背景のクラス間分散を求めます。
分散が最大となる閾値を選び、画素を黒と白に分けます。

```text
score(t) = w₀ × w₁ × (μ₀ - μ₁)²
```

`w₀`、`w₁`は各クラスの画素数、`μ₀`、`μ₁`は各クラスの平均輝度です。固定閾値と自動閾値を同じ画像へ
適用すると、画像ごとに適切な閾値がどう変わるかを確認できます。

### HSV変換と色相の変更

HSVは色相`H`、彩度`S`、明度`V`で色を表します。RGBから変換するときは、最大値`max`と最小値`min`を使い、
`V = max`、`S = (max - min) / max`とします。`max`が0なら黒なので彩度を0とします。色相は最大値となった
チャンネルに応じて求め、値域を0〜360度に収めます。

Q.5のデモは色相に180度を加えて補色へ移し、HSVからRGBへ戻します。色相は角度として循環するため、
`(H + 180) % 360`のように扱います。無彩色では色相が定まらないので、変換時に0除算を避けます。

### 固定代表値への減色

Q.6ではRGBの各チャンネルを4段階へ量子化し、0〜63、64〜127、128〜191、192〜255の範囲をそれぞれ
32、96、160、224へ写します。

```ts
const quantized = Math.floor(value / 64) * 64 + 32;
```

これは入力画像に関係なく同じ代表値を使う方法です。入力画像の色分布に合わせて代表色を決めるk-means減色は、
Q.91〜92で扱います。

### 平均・Maxプーリング

Q.7とQ.8では画像を8×8画素のブロックへ分け、ブロック内の色を1つの値で表します。平均プーリングは各チャンネルの
平均を使って滑らかにし、Maxプーリングは最大値を残します。どちらも空間の解像度を下げ、局所領域の情報を集約します。

畳み込みのようにカーネル係数との積和を計算する処理とは異なり、プーリングは領域内の統計量を直接選びます。
後半のHOGや画像ピラミッドでも、局所領域をまとめる考え方が別の形で登場します。

## アルゴリズムのつながり

100問は独立したサンプルの集合ではなく、前半で作った処理を後半で再利用する構成です。

```text
グレースケール・平滑化
  ├─ 勾配 → Canny → Hough直線検出
  ├─ 勾配 → HOG ─┐
  └─ 二値化 → 形態学・細線化
                  │
補間 → 画像ピラミッド
                  │
色ヒストグラム → k-NN / k-means
                  │
IoU + HOG + NN + NMS → 物体検出
```

たとえばHOGはQ.66〜69で作成し、Q.96以降の顔・非顔分類と物体検出で再利用します。
IoUは学習用クロップのラベル付け、NMS、最終評価でそれぞれ異なる役割を持ちます。

## ローカルで動かす

Node.jsとpnpmを用意し、次のコマンドで起動します。

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

## 問題ページをiframeで埋め込む

特定の問題だけを別ページに表示する場合は、問題ページの埋め込みURLをiframeで読み込みます。
たとえばQ.1は次のように埋め込めます。

```html
<iframe
  src="https://s-yoshiki.github.io/Gasyori100knockJS/embed/1"
  style="width: 100%; height: 520px; border: 0"
  loading="lazy"
></iframe>
```

## 学習するときの進め方

最初から100問を順番に消化するより、次の単位で結果を比較すると理解しやすくなります。

写真だけで確かめる前に、全画素が同じ画像、中央だけが白い画像、横方向のグラデーションなど、
結果を予測しやすい小さな入力を試します。中間画像やヒストグラムも確認すると、計算式と座標・
配列添字のどちらに問題があるかを切り分けやすくなります。

1. 同じ入力に対してRGB/BGR、HSV、グレースケールの値を確認する
2. 畳み込みフィルターのkernelと境界処理を変える
3. 二値化からラベリング、輪郭、特徴量へ進む
4. 学習データと評価データを分離して分類結果を見る
5. IoU、Precision/Recall、NMSの閾値を変えて検出結果を比較する

ブラウザ実装ではCanvasの画素配列がRGBA順である一方、元のOpenCV教材はBGRを前提にする場合があります。アルゴリズムを移植するときは、チャンネル順、値域、丸め、画像端の扱いをテストで固定すると差分を追いやすくなります。

## 実装を利用する際の注意

これは学習用の素朴な実装です。実サービスで大きな画像を処理する場合は、メインスレッドを塞がないようWeb Worker、OffscreenCanvas、WASM/OpenCV.js、GPU処理などを検討してください。また、ユーザーが指定した画像はサイズ・MIME typeを検証し、Object URLを作った場合は不要になった時点で解放します。

## まとめ

ブラウザで結果を確認しながら、画素操作、周波数解析、特徴抽出、分類、物体検出までを
段階的に追えるようにしました。画面と処理ロジックを分けた実装を確認し、問題別のデモや解説を
行き来することで、数式と実際の画素の変化を結び付けて学べます。解説記事は問題番号の区切り
ではなく、同じ考え方や共通処理を持つアルゴリズム単位でまとめています。
