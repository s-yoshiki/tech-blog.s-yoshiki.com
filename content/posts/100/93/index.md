---
title: "文字列のAAを自動生成 デモ + サンプルコード JavaScript"
path: "/entry/93"
date: "2019-01-03 17:23:56"
coverImage: "../../../images/thumbnail/javascript-logo.png"
author: "s-yoshiki"
tags: ["html5","javascript","画像処理"]
---

## 概要

文字列から文字列のAA(アスキーアート)を自動生成するデモを紹介します。

## サンプル画像

<a href="https://pbs.twimg.com/media/Dv-GHJbU8AAa-kG.jpg"><img src="https://pbs.twimg.com/media/Dv-GHJbU8AAa-kG.jpg" width="500"></a>
普通のアルファベット平仮名漢字を変換してみました。

↓実際の文字列↓ (端末・ブラウザなど、環境によっては正しく表示されません)

```
                                                                          0000
                                                                          0000                                  000000000000000000000000000000000000000000
                                                                          0000                                  0000      0000000000000000000000  00000000
                                                                          0000        0000000000                00        0000                      00
                                    0000                        00000000000000000000000000000000                00      0000                        00
                                    0000                        0000000000000000                                00      0000                        00
                                  00000000                                0000          0000                    00    0000      00000000000000      00
                                  00000000                                00            0000                    00    0000      0000      0000      00
                                  00000000                                0000  000000000000                    00  000000      0000        00      00
    0000000000                  0000  000000                            000000000000000000000000                00    0000      0000        00      00
  0000    000000                00    000000                        0000000000      000000  000000              00      0000    0000        00      00
0000        0000              0000      000000                    0000000000        0000      000000            00      0000    0000        00      00
0000        0000              00        000000                  000000    00      000000        0000            00        0000  0000        00      00
          000000            0000          0000                  0000      00      0000          0000            00        0000  0000      0000      00
      0000000000            00000000000000000000              0000        0000  0000              00            00        0000  00000000000000      00
  0000      0000            00            000000              0000        0000000000            0000            00        0000  0000                00
0000        0000          0000              000000            0000        00000000              0000            00000000000000  0000                00
0000        0000          00                000000            0000        000000              000000            00    0000                          00
0000        0000        0000                  000000          000000    000000              000000              00                                  00
00000000000000000000    0000                  000000            000000000000            00000000                00                                  00
  00000000  000000  0000000000            00000000000000          000000          000000000000                  00                          0000000000
                                                                                  000000                        00                          0000000000
                                                                                                                00                                           

```

<a href="https://pbs.twimg.com/media/Dv-GHJaVAAE_z55.jpg"><img src="https://pbs.twimg.com/media/Dv-GHJaVAAE_z55.jpg" width="500"></a>
顔文字を変換するとこんな感じになります。

<a href="https://pbs.twimg.com/media/Dv-GHJaUUAAN7xP.jpg"><img src="https://pbs.twimg.com/media/Dv-GHJaUUAAN7xP.jpg" width="500"></a>
絵文字もAA化できました。

## デモ

<a href="https://jsfiddle.net/s_yoshiki/vL0wno18/show">外部リンクで開く</a>

<script async="" src="//jsfiddle.net/s_yoshiki/vL0wno18/embed/result/"></script>

## デモ解説

### ソース

#### HTML

```html
<div class="markdown-body">
    <canvas id="canvas" width="200" height=30>
	図形を表示するには、canvasタグをサポートしたブラウザが必要です。
	</canvas>
    <input type="text" id="text">
    <input type="button" id=main value="RUN">
    <pre id="result">
    </pre>
</div>
```

#### JavaScript

```js
function main() {
    var canvas = document.getElementById('canvas');
    if (!canvas.getContext) {
        return;
    }
    var context = canvas.getContext('2d');
    var text = document.getElementById("text").value;

    var charSize = 25;
    canvas.width = charSize * text.length;
    canvas.height = charSize + 2;
    context.font = "25px 'Times New Roman'";
    initCanvas();
    context.fillText(text, 0, 25);
    canvas2aa();
}

function initCanvas() {
    var canvas = document.getElementById('canvas');
    if (!canvas.getContext) {
        return -1
    }
    var context = canvas.getContext('2d');

    var dst = context.createImageData(canvas.width, canvas.height);

    for (var i = 0; i < dst.data.length; i++) {
        dst.data[i] = 255;
    }
    context.putImageData(dst, 0, 0);
}

function canvas2aa() {
    document.getElementById("result").innerHTML = ""
    var canvas = document.getElementById('canvas');
    if (!canvas.getContext) {
        return -1;
    }

    var context = canvas.getContext('2d');
    var src = context.getImageData(0, 0, canvas.width, canvas.height);
    var dst = context.createImageData(canvas.width, canvas.height);

    for (var i = 0; i < src.data.length; i = i + 4) {
        var x = (src.data[i] + src.data[i + 1] + src.data[i + 2]) / 3;
        dst.data[i] = x;
        dst.data[i + 1] = x;
        dst.data[i + 2] = x;
        dst.data[i + 3] = src.data[i + 3];

        var text = ""
        if (x <= 127) {
            text = "00";
        } else {
            text = "  ";
        }

        if (i / 4 % canvas.width === 0) {
            text = "\n";
        }
        document.getElementById("result").innerHTML += text
    }
    context.putImageData(dst, 0, 0);
}

document.getElementById("main").onclick = function() {
    main();
};

```

### 解説

任意の文字列をcanvasに描画した後、canvasのピクセルデータ(imageData)を走査します。

この時、2値化の処理と同じように、閾値より低いものは文字を描画、そうでなければ描画しない(実際にはスペースを描画)しています。