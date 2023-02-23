---
title: "地球上の2地点間の距離を取得するアルゴリズム(ヒュベニ or 球面三角法)比較【JavaScript】"
path: "/entry/8"
date: "2018-05-06 16:20:10"
coverImage: "../../../images/thumbnail/javascript-logo.png"
author: "s-yoshiki"
tags: ["html5","javascript","アルゴリズム", "GeoLocationAPI"]
---

## 概要

以前、地球上の2地点間の距離を計算する実装を行なった際に「ヒュベニの公式」と「球面三角法」を比較したことがあります。
ここでは改めて2つのアルゴリズムを実装して比較してみようと思います。

### ヒュベニの公式

http://hp.vector.co.jp/authors/VA002244/yacht/geo.htm

<a href="http://hp.vector.co.jp/authors/VA002244/yacht/geo.htm">ヒュベニの式を用いた、緯度・経度と距離・方位の相互変換の解説</a>

### 球面三角法

https://ja.wikipedia.org/wiki/%E7%90%83%E9%9D%A2%E4%B8%89%E8%A7%92%E6%B3%95

<a href="https://ja.wikipedia.org/wiki/%E7%90%83%E9%9D%A2%E4%B8%89%E8%A7%92%E6%B3%95">球面三角法</a>
基本的な三角関数を組み合わせたものです。
球面三角法はヒュベニと比べ計算結果は荒くなります。

## ソース

下記のソースでは「ヒュベニの公式」 と 「球面三角法」 を比較しています。

```js
//
// ヒュベニの公式
//
function hubeny(lat1, lng1, lat2, lng2) {
  function rad(deg) {
    return deg * Math.PI / 180;
  }
  // degree to radian
  lat1 = rad(lat1);
  lng1 = rad(lng1);
  lat2 = rad(lat2);
  lng2 = rad(lng2);

  // 緯度差
  var latDiff = lat1 - lat2;
  // 経度差算
  var lngDiff = lng1 - lng2;
  // 平均緯度
  var latAvg = (lat1 + lat2) / 2.0;
  // 赤道半径
  var a = 6378137.0;
  // 極半径
  var b = 6356752.314140356;
  // 第一離心率^2
  var e2 = 0.00669438002301188;
  // 赤道上の子午線曲率半径
  var a1e2 = 6335439.32708317;

  var sinLat = Math.sin(latAvg);
  var W2 = 1.0 - e2 * (sinLat * sinLat);

  // 子午線曲率半径M
  var M = a1e2 / (Math.sqrt(W2) * W2);
  // 卯酉線曲率半径
  var N = a / Math.sqrt(W2);

  t1 = M * latDiff;
  t2 = N * Math.cos(latAvg) * lngDiff;
  return Math.sqrt((t1 * t1) + (t2 * t2));
}

//
// 球面三角法
//
function sphericalTrigonometry(lat1, lng1, lat2, lng2) {
  // 赤道半径
  var R = 6378137.0;

  function rad(deg) {
    return deg * Math.PI / 180;
  }

  return R
    * Math.acos(
      Math.cos(rad(lat1))
          * Math.cos(rad(lat2))
          * Math.cos(rad(lng2) - rad(lng1))
        + Math.sin(rad(lat1))
          * Math.sin(rad(lat2)),
    );
}
```

### GeoLocationAPIとの組み合わせ

<a href="https://developer.mozilla.org/ja/docs/Web/API/Geolocation/Using_geolocation">https://developer.mozilla.org/ja/docs/Web/API/Geolocation/Using_geolocation</a>

GeoLocationAPIと組み合わせて現在地と任意の地点間の距離を計測します。

```js
var getSuccess = function(pos) {
  // 現在地の緯度経度
  var lat1 = pos.coords.latitude;
  var lng1 = pos.coords.longitude;

  // 新宿都庁の座標
  var lat2 = 35.689487;
  var lng2 = 139.691706;

  // 距離の計算//
  var ans1, ans2;
  try {
    ans1 = hubeny(lat1, lng1, lat2, lng2);
    ans2 = sphericalTrigonometry(lat1, lng1, lat2, lng2);
  } catch (e) {
    alert(e);
  }

  // 結果
  document.getElementById('result1').innerHTML = ans1 + ' m';
  document.getElementById('result2').innerHTML = ans2 + ' m';
};

var geoError = function() {
  var pos = {
    'coords': {
      'latitude': 35.5562073,
      'longitude': 139.5723855,
    },
  };
  getSuccess(pos);
  alert('Getting location failed.');
};

// GeoLocationAPIで現在地の座標を取得する
document.getElementById('start').onclick = function() {
  navigator.geolocation.getCurrentPosition(getSuccess, geoError, {
    enableHighAccuracy: true,
  });
};
```

<a href="https://jsfiddle.net/s_yoshiki/xL09s2fm/">デモ(外部リンク)</a>

## 結果

https://vldb.gsi.go.jp/sokuchi/surveycalc/main.html

<a href="https://vldb.gsi.go.jp/sokuchi/surveycalc/main.html">国土地理院のサイト</a>の計算結果と一緒に2つの実装を比較してみました。

※単位 : m

### 東京-川崎

東京(35.689487, 139.691706) 〜 川崎(35.5562073, 139.5723855)

```
球面三角法 : 18317.126210821592
ヒュベニ    : 18349.45459166647
地理院    : 18317.122
```

数メートルの誤差が生じる。

### 東京-名古屋

東京 〜 名古屋(35.2, 136.9)

```
球面三角法 : 259215.96201641572
ヒュベニ    : 258964.81739383226
地理院    : 259205.815
```

1km未満ではあるが誤差が生じた。

### 東京-ギニア湾

東京 〜 ギニア湾(0.0, 0.0)

```
球面三角法 : 15324766.692400709
ヒュベニ    : 14278853.174450254
地理院    : 14274245.589
```

## まとめ

数キロ程度の距離の計算では、ヒュベニと球面三角法の差は小さいものとなりましたが、
実用するのであれば様々なソフトウェアで採用実績のあるヒュベニの公式を使うのが無難かもしれません。

また、今回のソースでは測地系の差を考慮していないので、用いる測地系によって計算結果が少し変わってくると思います。

## 参考

<a href="https://keisan.casio.jp/exec/system/1257670779">https://keisan.casio.jp/exec/system/1257670779</a>

<a href="https://qiita.com/chiyoyo/items/b10bd3864f3ce5c56291">https://qiita.com/chiyoyo/items/b10bd3864f3ce5c56291</a>

<a href="https://qiita.com/port-development/items/eea3a0a225be47db0fd4">https://qiita.com/port-development/items/eea3a0a225be47db0fd4</a>
