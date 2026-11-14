---
title: "画像処理100本ノック：フィルタ・濃度変換・座標変換（Q.9〜40）"
path: "/entry/319"
date: "2026-07-23 21:10"
coverImage: "../../../images/thumbnail/javascript-logo.png"
author: "s-yoshiki"
aiGenerated: true
tags: ["typescript", "javascript", "canvas", "画像処理", "画像処理100本ノック"]
---

## 概要

画像処理100本ノックのQ.9〜40を、空間フィルタ、濃度変換、幾何変換、周波数処理、JPEG圧縮の順に解説します。
個別の記事をまとめ、同じCanvas実装で使う境界処理や画素値の扱いも見比べられるようにしました。

- [Q.9〜40のデモ](https://s-yoshiki.github.io/Gasyori100knockJS/questions)
- [Q.9〜40の実装](https://github.com/s-yoshiki/Gasyori100knockJS/tree/master/src/questions/answers)

シリーズは次の4記事です。

- [1. 基礎の画素操作 Q.1〜8](/entry/110)
- [2. フィルタ・濃度・座標変換 Q.9〜40](/entry/319)
- [3. 領域・形状・特徴抽出 Q.41〜83](/entry/324)
- [4. 画像分類・物体検出 Q.84〜100](/entry/333)

## Q.9〜19 空間フィルタ

[Gasyori100knockJS](https://github.com/s-yoshiki/Gasyori100knockJS)のQ.9〜19では、
近傍画素を使った平滑化とエッジ検出を実装しています。

- [Q.9 ガウシアンフィルタ](https://s-yoshiki.github.io/Gasyori100knockJS/questions/9)
- [Q.10 メディアンフィルタ](https://s-yoshiki.github.io/Gasyori100knockJS/questions/10)
- [Q.11〜19の問題一覧](https://s-yoshiki.github.io/Gasyori100knockJS/questions)

### 畳み込みの基本

空間フィルタは、注目画素の周囲にカーネルを重ね、画素値と係数の積和を出力します。
3×3カーネルなら、画像の各座標で9画素を参照します。

```ts
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    for (let ky = -1; ky <= 1; ky++) {
      for (let kx = -1; kx <= 1; kx++) {
        const sx = Math.min(width - 1, Math.max(0, x + kx));
        const sy = Math.min(height - 1, Math.max(0, y + ky));
        value += src.data[(sy * width + sx) * 4 + channel] *
          kernel[ky + 1][kx + 1];
      }
    }
  }
}
```

端の画素では画像外を参照しないように座標をクランプします。RGBを個別に計算し、アルファ値は
255のままにするのが各実装に共通する流れです。

### 平滑化フィルタ（Q.9〜12）

| 問題 | 実装の要点 |
| --- | --- |
| Q.9 ガウシアン | 距離に応じたガウス分布の重みを3×3へ配置し、カーネルの合計が1になるよう正規化する |
| Q.10 メディアン | 3×3近傍の9個の値を並べ替え、中央の値を選ぶ |
| Q.11 平滑化 | 3×3の全係数を`1 / 9`にした平均フィルタを畳み込む |
| Q.12 モーション | 左上から右下の対角成分だけに`1 / 3`を置き、一定方向のぶれを作る |

ガウシアンフィルタと平均フィルタはいずれもローパスフィルタですが、ガウシアンは中心に近い
画素ほど重くするため、単純平均より自然にぼかせます。メディアンフィルタは積和を使わず、
外れ値の影響を受けにくいのでごま塩ノイズに向いています。

- [Ans009.ts](https://github.com/s-yoshiki/Gasyori100knockJS/blob/master/src/questions/answers/Ans009.ts)
- [Ans010.ts](https://github.com/s-yoshiki/Gasyori100knockJS/blob/master/src/questions/answers/Ans010.ts)
- [Ans011.ts](https://github.com/s-yoshiki/Gasyori100knockJS/blob/master/src/questions/answers/Ans011.ts)
- [Ans012.ts](https://github.com/s-yoshiki/Gasyori100knockJS/blob/master/src/questions/answers/Ans012.ts)

### エッジ検出フィルタ（Q.13〜19）

| 問題 | カーネルまたは処理 | 特徴 |
| --- | --- | --- |
| Q.13 MAX-MIN | 近傍の最大値−最小値 | 局所的な濃度差を直接取り出す |
| Q.14 微分 | 隣接画素の差 | 水平・垂直方向の輪郭を分けて確認できる |
| Q.15 Sobel | 中央の行・列を強くした一次微分 | 微分と平滑化を同時に行う |
| Q.16 Prewitt | 行・列を均等に重み付けした一次微分 | Sobelより単純な係数で勾配を求める |
| Q.17 Laplacian | 二次微分 | 方向に依存しないエッジを得る |
| Q.18 Emboss | 対角方向の差＋128 | 明暗差を浮き彫りとして見せる |
| Q.19 LoG | ガウシアン＋Laplacian | ノイズを抑えてから二次微分する |

一次微分フィルタはx方向とy方向を別々に適用します。横方向の輝度変化を計算すると縦線が、
縦方向の変化を計算すると横線が強く出ます。

Laplacianは二次微分なので方向を分けませんが、ノイズも強調します。LoGでは先にガウシアンで
平滑化することで、この弱点を補っています。

- [Ans013.ts〜Ans019.ts](https://github.com/s-yoshiki/Gasyori100knockJS/tree/master/src/questions/answers)

### 実装を読むときのポイント

同じ「輪郭を抽出する」処理でも、カーネルによって方向性、ノイズへの強さ、線の太さが変わります。
デモでは同じ入力画像に各フィルタを適用し、出力の違いを比較できます。

畳み込みの実装を追うときは、次の順で確認すると理解しやすくなります。

1. カーネルの係数と合計
2. 画像端で使う座標
3. RGBをそのまま処理するか、グレースケールへ変換するか
4. 負の計算結果をどのように0〜255へ収めるか

#### 畳み込みを共通関数にする

各フィルタの違いは主にカーネルなので、座標走査と積和計算を共通化すると比較しやすくなります。
出力画素は概念的に次の式で求めます。

```text
dst(x, y) = Σky Σkx src(x + kx, y + ky) × kernel(kx, ky)
```

カーネルの合計が0になる微分フィルタでは負の値も発生します。表示用に絶対値を取るのか、
128を中心として符号を残すのかを決めてから0〜255へクランプします。ぼかしでは係数の合計で
割り、画像全体の明るさが変わらないようにします。

3×3カーネルを画像全体へ適用する計算量は`O(width × height × 9)`です。大きなガウシアン
カーネルは縦横へ分離できるため、`K²`回の積和を`2K`回へ減らせます。

#### 画像端の扱い

範囲外を0とみなすと外周が暗くなり、端の座標へクランプすると境界付近の明るさを保ちやすく
なります。比較用デモでは、どの境界条件を採用したかを揃えないとカーネル本来の差と端処理の差が
混ざる点に注意が必要です。

## Q.20〜24 ヒストグラムと濃度変換

画像処理100本ノックのうち、画素値の分布を扱うQ.20〜24を解説します。ヒストグラムを
可視化し、線形変換、統計量、累積度数、ガンマ特性を使って画像の明るさとコントラストを
変える一連の処理です。

### ヒストグラムを作る（Q.20）

0〜255に対応する256要素の配列を用意し、画素値を添字として出現回数を加算します。

```ts
const histogram = new Array<number>(256).fill(0);
for (let i = 0; i < src.data.length; i += 4) {
  histogram[src.data[i]]++;
  histogram[src.data[i + 1]]++;
  histogram[src.data[i + 2]]++;
}
```

現在の実装ではChart.jsを使わず、Canvas 2D APIで棒グラフを直接描画しています。

- [Q.20のデモ](https://s-yoshiki.github.io/Gasyori100knockJS/questions/20)
- [Ans020.ts](https://github.com/s-yoshiki/Gasyori100knockJS/blob/master/src/questions/answers/Ans020.ts)



#### Canvasでヒストグラムを描く（Q.20）

256個の度数をCanvasの幅へ割り当て、度数に応じた高さの棒を描きます。度数の最大値が0でも除算しないよう、
最大値の下限を1にします。

```ts
const maxCount = Math.max(1, ...histogram);
const barWidth = canvas.width / histogram.length;

histogram.forEach((count, index) => {
  const height = (count / maxCount) * canvas.height;
  context.fillRect(
    index * barWidth,
    canvas.height - height,
    Math.max(1, barWidth),
    height,
  );
});
```

RGBを3チャンネル別に集計するか、輝度へ変換して1本に集約するかでグラフの意味が変わります。

### 線形な濃度変換（Q.21、Q.22）

Q.21の正規化では、入力画像の最小値`vMin`と最大値`vMax`を、出力範囲`dMin`〜`dMax`へ
線形に写します。

```ts
const normalize = (value: number) =>
  ((dMax - dMin) / (vMax - vMin)) * (value - vMin) + dMin;
```

Q.22では平均と標準偏差を求め、分布の中心を指定平均へ移し、分布の幅を指定標準偏差へ
拡大・縮小します。どちらも画素の大小関係を保ったままコントラストを調整する処理です。

- [Q.21の実装](https://github.com/s-yoshiki/Gasyori100knockJS/blob/master/src/questions/answers/Ans021.ts)
- [Q.22の実装](https://github.com/s-yoshiki/Gasyori100knockJS/blob/master/src/questions/answers/Ans022.ts)

### 累積ヒストグラムによる平坦化（Q.23）

ヒストグラム平坦化では、値`v`以下の画素数を累積し、全画素数に対する割合を0〜255へ
割り当てます。頻度が集中した濃度域を広く使うため、暗部や明部へ偏った画像の細部が
見えやすくなります。

単純な正規化は最小値と最大値だけを見ます。一方、平坦化は分布全体を使う点が違います。

### 非線形なガンマ補正（Q.24）

ガンマ補正は、正規化した画素値へべき乗を適用します。

```ts
const corrected = 255 * (value / 255) ** (1 / gamma);
```

線形変換と異なり、中間調の明るさを選択的に変えられます。`gamma`の値によって暗部を
持ち上げたり、明部を抑えたりできます。

- [Q.23のデモ](https://s-yoshiki.github.io/Gasyori100knockJS/questions/23)
- [Q.24のデモ](https://s-yoshiki.github.io/Gasyori100knockJS/questions/24)

### 実装で気を付ける数値処理

ヒストグラムは通常256要素の整数配列を用意し、画素値を添字として出現回数を加算します。
RGBを別々に数える方法と、輝度へ変換して1本だけ数える方法ではグラフの意味が異なるため、
目的を先に決めます。

RGBをチャンネルごとに伸張すると色合いが変わることがあります。明るさだけを調整したい場合はHSVやYCbCrへ変換し、明度成分を処理します。

正規化や平坦化では、最大値と最小値が等しい単色画像を入力すると分母が0になります。この場合は
入力をそのまま返すなどの分岐が必要です。累積分布関数を使う平坦化では、計算中は浮動小数点を
保ち、RGBA配列へ戻す直前に丸めると誤差が積み重なりにくくなります。

ガンマ補正では`gamma <= 0`を拒否し、0〜255をいったん0〜1へ正規化します。補正後の値を
クランプし、アルファ値は変更しない、という規則を共通化しておくと色チャンネルごとの実装差を
防げます。

### 結果を検証する

処理前後でヒストグラムを並べ、平均値・最小値・最大値も表示すると変化を定量的に確認できます。
見た目が改善していても白飛びや黒つぶれが増えていることがあるため、グラフと画像の両方で判断します。

## Q.25〜31 画像補間とアフィン変換

画像の座標を変える処理として、Q.25〜27の画像補間とQ.28〜31のアフィン変換をまとめます。
どちらも出力画像の座標から元画像の参照位置を求める「逆写像」が共通の土台です。

### なぜ逆写像を使うのか

入力の各画素を変換先へ移す順写像では、丸めによって複数画素が同じ位置へ集まったり、
出力に未設定の穴ができたりします。出力の全画素を順に走査して入力座標を逆算すれば、
必ず各出力画素へ値を設定できます。

### 画像補間

逆算した入力座標は小数になるため、周囲の画素から値を決めます。

| 問題 | 参照する画素 | 特徴 |
| --- | --- | --- |
| Q.25 最近傍補間 | 最も近い1画素 | 高速だが輪郭が階段状になりやすい |
| Q.26 Bi-linear補間 | 周囲4画素 | 距離に応じた線形補間で滑らか |
| Q.27 Bi-cubic補間 | 周囲16画素 | 3次関数を使い輪郭を比較的保ちやすい |

Bi-linear補間では、座標の小数部分を重みとして左右を補間し、その結果を上下方向に補間します。

```ts
const top = (1 - dx) * p00 + dx * p10;
const bottom = (1 - dx) * p01 + dx * p11;
const value = (1 - dy) * top + dy * bottom;
```

- [Ans025.ts](https://github.com/s-yoshiki/Gasyori100knockJS/blob/master/src/questions/answers/Ans025.ts)
- [Ans026.ts](https://github.com/s-yoshiki/Gasyori100knockJS/blob/master/src/questions/answers/Ans026.ts)
- [Ans027.ts](https://github.com/s-yoshiki/Gasyori100knockJS/blob/master/src/questions/answers/Ans027.ts)

### アフィン変換

アフィン変換は2×3行列で座標を変換します。

```text
[ x' ]   [ a b tx ] [ x ]
[ y' ] = [ c d ty ] [ y ]
                    [ 1 ]
```

| 問題 | 変換 |
| --- | --- |
| Q.28 | `tx`と`ty`による平行移動 |
| Q.29 | `a`と`d`による拡大・縮小 |
| Q.30 | `sinθ`と`cosθ`による回転 |
| Q.31 | `b`または`c`によるせん断 |

回転では、画像中心を原点へ移動してから回し、最後に中心座標を戻します。左上を原点のまま
回転すると、画像がCanvasの外へ大きく移動するためです。

行列の逆変換で入力座標を求めた後、最近傍法などの補間を適用します。つまりアフィン変換は
「座標を求める部分」、画像補間は「小数座標の色を決める部分」として組み合わせられます。

- [Ans028.ts〜Ans031.ts](https://github.com/s-yoshiki/Gasyori100knockJS/tree/master/src/questions/answers)
- [Q.25〜31のデモ](https://s-yoshiki.github.io/Gasyori100knockJS/questions)

### なぜ逆変換で座標を求めるのか

入力画素を順方向に移動すると、出力側に値が書かれない穴や、複数画素が重なる場所ができます。
そこで出力の各座標`(x', y')`から逆行列を使って入力座標`(x, y)`を求めます。

```text
[x]   [a b tx]⁻¹ [x']
[y] = [c d ty]   [y']
[1]   [0 0  1]   [ 1]
```

2×2部分の行列式`ad - bc`が0に近い変換は逆行列を作れません。スケール0などの入力をUI側で
拒否するか、エラーとして扱う必要があります。

### 補間と境界処理の選択

最近傍法は高速ですが拡大時に階段状の輪郭が目立ちます。バイリニア補間は周囲4画素へ距離に応じた
重みを掛け、滑らかな結果を得ます。入力座標が画像外に出た場合は透明、背景色、端の複製のどれを
使うかを明示します。

画質を比較するときは同じ画像を何度も変換せず、常に原画像から目的のサイズへ一度で変換します。
縮小と拡大を繰り返すと補間誤差が蓄積し、アルゴリズム間の比較が難しくなります。

## Q.32〜35 フーリエ変換と周波数フィルタ

Q.32〜35では、2次元離散フーリエ変換で画像を周波数成分へ分解し、周波数領域で
ローパス、ハイパス、バンドパスフィルタを適用します。

### 2次元DFTと逆DFT（Q.32）

各周波数`(u, v)`に対して全画素`(x, y)`を走査し、実部と虚部を求めます。

```ts
const angle = -2 * Math.PI * (x * u / width + y * v / height);
real += value * Math.cos(angle);
imag += value * Math.sin(angle);
```

逆変換では角度の符号を反転し、画素数で割って空間画像へ戻します。この実装は仕組みを
追いやすい一方で計算量が大きく、画像サイズによっては完了まで時間がかかります。

- [Q.32のデモ](https://s-yoshiki.github.io/Gasyori100knockJS/questions/32)
- [Ans032.ts](https://github.com/s-yoshiki/Gasyori100knockJS/blob/master/src/questions/answers/Ans032.ts)

### 周波数領域の読み方

低周波成分は画像全体の緩やかな明るさの変化、高周波成分は輪郭や細かな模様に対応します。
実装ではスペクトルをシフトし、低周波が画像中央へ来るようにしてから円形のマスクを作ります。

### 周波数フィルタ

| 問題 | 残す成分 | 出力の特徴 |
| --- | --- | --- |
| Q.33 ローパス | 中心付近の低周波 | 細部やノイズが減り、ぼける |
| Q.34 ハイパス | 中心から遠い高周波 | 輪郭や細かな模様が残る |
| Q.35 バンドパス | 指定した半径の帯域 | 特定スケールの模様を抽出する |

フィルタ処理そのものは、通過させない周波数の実部と虚部を0にする処理です。その後に逆DFTを
行うと、周波数マスクの効果を空間画像として確認できます。

- [Ans033.ts](https://github.com/s-yoshiki/Gasyori100knockJS/blob/master/src/questions/answers/Ans033.ts)
- [Ans034.ts](https://github.com/s-yoshiki/Gasyori100knockJS/blob/master/src/questions/answers/Ans034.ts)
- [Ans035.ts](https://github.com/s-yoshiki/Gasyori100knockJS/blob/master/src/questions/answers/Ans035.ts)

### 空間フィルタとの関係

ガウシアンフィルタによるぼかしは、周波数領域では高周波を弱める処理と考えられます。
Sobelなどのエッジ検出は高周波を強調します。空間領域と周波数領域の結果を比較すると、
別々に見えるフィルタが同じ性質を扱っていることが分かります。

### DFT実装の計算量とデータ構造

2次元DFTを定義どおり二重に計算すると、入力と出力の座標をそれぞれ走査するため計算量は
`O(W²H²)`になります。学習用の小さな画像では式を追いやすい一方、実用サイズではFFTを使う
必要があります。

周波数成分は実部と虚部の2配列、または`{ re, im }`の配列として保持します。振幅を表示するときは
`sqrt(re² + im²)`を求めますが、値の範囲が広いため`log(1 + magnitude)`で圧縮すると低い成分も
見やすくなります。

実数画像のスペクトルは共役対称になります。中心移動後の表示が左右・上下で不自然に非対称なら、
指数の符号、座標、実部と虚部の更新を確認する手掛かりになります。

### 周波数マスクの副作用

矩形や円で周波数を急に0へ切ると、空間画像では輪郭付近に波紋状のリンギングが出ます。
カットオフ付近を滑らかに減衰させるマスクと比較すると、周波数応答の鋭さと空間的な副作用の
トレードオフを確認できます。

## Q.36〜40 DCTとJPEG圧縮

Q.36〜40ではJPEG圧縮の中心処理を段階的に実装します。8×8ブロックのDCT、PSNRによる評価、
量子化、YCbCr変換をつなぎ、圧縮でどの情報が失われるかを確認します。

### 8×8ブロックのDCT（Q.36）

DCTは画像を余弦波の周波数成分へ変換します。JPEGでは画像を8×8画素のブロックに分け、
ブロックごとに64個のDCT係数を求めます。左上が直流成分で、右下へ進むほど高周波です。

逆DCTで元の画素へ戻せるため、Q.36では変換と逆変換を続けて実行して結果を確認します。

### 画質をPSNRで評価する（Q.37）

原画像と復元画像の差を平均二乗誤差`MSE`で表し、PSNRを計算します。

```text
PSNR = 10 log10(255² / MSE)
```

PSNRが大きいほど差が小さいことを表します。見た目だけでなく数値でも圧縮結果を比較できます。

### DCT係数を量子化する（Q.38）

DCT係数を量子化テーブルで割り、整数へ丸めます。高周波側ほど大きな値で割るため、人が
気づきにくい細かな成分の多くが0になります。

```ts
const quantized = dotDivide(block, quantizationTable)
  .map((row) => row.map((value) => Math.round(value)));
const restored = dotMultiply(quantized, quantizationTable);
```

丸めで失われた値は逆量子化しても戻りません。これが非可逆圧縮になる箇所です。

### RGBをYCbCrへ変換する（Q.39）

RGBを輝度`Y`と色差`Cb`、`Cr`へ分けます。人の視覚は色の細かな変化より明るさの変化に
敏感なので、輝度と色差で異なる量子化を適用できます。

### JPEG風の圧縮処理をつなぐ（Q.40）

Q.40では次の順に処理します。

1. RGBからYCbCrへ変換する
2. 各成分を8×8ブロックへ分けてDCTする
3. 輝度用・色差用のテーブルで量子化する
4. 逆量子化と逆DCTを行う
5. YCbCrからRGBへ戻し、0〜255へクランプする

色差成分を強く圧縮しても見た目への影響が比較的小さいという視覚特性を、コードと出力の両方で
確認できます。

- [Q.36〜40のデモ](https://s-yoshiki.github.io/Gasyori100knockJS/questions)
- [Ans036.ts](https://github.com/s-yoshiki/Gasyori100knockJS/blob/master/src/questions/answers/Ans036.ts)
- [Ans040.ts](https://github.com/s-yoshiki/Gasyori100knockJS/blob/master/src/questions/answers/Ans040.ts)

### 実装をブロック単位に分ける

JPEG風処理では8×8ブロックごとに、画素値から128を引いて中心を0へ移し、DCT係数を計算します。
左上のDC係数はブロックの平均的な明るさ、それ以外のAC係数は横・縦方向の細かい変化を表します。
右下へ行くほど高周波になるため、量子化テーブルも高周波を粗く丸める値になっています。

画像サイズが8の倍数でない場合は、端を複製してパディングするなどの方針が必要です。復元後は
元サイズへ切り詰めます。ブロック境界だけを特別扱いすると、圧縮とは別の継ぎ目が生じます。

### 圧縮率と画質を観察する

量子化後に0になった係数の割合を数えると、情報がどれだけ削減されたかを確認できます。
量子化テーブルへ倍率を掛け、PSNRや平均二乗誤差と見た目を並べると、数値指標と知覚品質が
必ずしも一致しないことも分かります。

実際のJPEGでは、量子化後の係数をジグザグ順に並べ、連続する0を効率よく符号化します。
このシリーズの実装は主に変換と量子化を学ぶ段階であり、ファイル形式全体のエンコーダーでは
ない点も区別しておきます。

## まとめ

Q.9〜40では、近傍画素の畳み込みから始め、画素値の分布、座標変換、周波数、圧縮へと扱う範囲を広げます。
空間フィルタと周波数フィルタの対応、逆写像と補間の組み合わせ、DCT係数の量子化を続けて読むと、
画像の表現を変える複数の方法がつながります。[領域・形状・特徴抽出の記事](/entry/324)へ続きます。
