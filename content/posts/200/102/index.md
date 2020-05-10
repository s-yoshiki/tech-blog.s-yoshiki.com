---
title: "画像にモザイクをかける JavaScript canvas デモあり"
path: "/entry/102"
date: "2019-01-24 23:12:19"
coverImage: "../../../images/thumbnail/javascript-logo.png"
author: "s-yoshiki"
tags: ["html5","javascript","画像処理","モザイク"]
---

## 概要

JavaScript + canvasでブラウザでアップロードした画像にモザイクをかけるデモを作成しました。

## デモ画像

スライダーを動かし、モザイクの粒度を決めます。
例えば、10と選択した場合は 10ピクセル x 10ピクセル でモザイクがかかります。

<a href="https://images-tech-blog.s-yoshiki.com/img/2019/01/201901242247_ab5n9l.jpg">
<img src="https://images-tech-blog.s-yoshiki.com/img/2019/01/201901242247_ab5n9l.jpg">
</a>

<a href="https://images-tech-blog.s-yoshiki.com/img/2019/01/201901242247_m38jax.jpg">
<img src="https://images-tech-blog.s-yoshiki.com/img/2019/01/201901242247_m38jax.jpg"></a>

<a href="https://images-tech-blog.s-yoshiki.com/img/2019/01/201901242247_qnwi0z.jpg"><img src="https://images-tech-blog.s-yoshiki.com/img/2019/01/201901242247_qnwi0z.jpg"></a>

## デモ

<script async="" src="//jsfiddle.net/s_yoshiki/jp0zmxbt/embed/result/"></script>

<a href="https://jsfiddle.net/s_yoshiki/jp0zmxbt/show">外部ウィンドウで開く</a>

## サンプルソース

```js
const canvas = document.getElementById("canvas")
var image_url = ""

function drawImage(url, k) {
    let ctx = canvas.getContext('2d')
    let image = new Image()
    image.src = url
    image.onload = () => {
        var scale = 1
        var fixed_w = image.width * scale
        var fixed_h = image.height * scale
        canvas.width = fixed_w
        canvas.height = fixed_h
        ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, fixed_w, fixed_h);

		if (k > 1) {
            var i, j
            for (i = 0; i < canvas.width; i += k) {
                for (j = 0; j < canvas.height; j += k) {
                    blurColor(i, j, k, k)
                }
            }
            cutRemnant(0, 0, i - k, j - k)
        }
    }
}

function blurColor(x, y, w, h) {
    let ctx = canvas.getContext('2d')
    let r, g, b
    r = g = b = 0
    
    var src = ctx.getImageData(x, y, w, h);
    var dst = ctx.createImageData(w, h)

    for (var i = 0; i < src.data.length; i += 4) {
        r += src.data[i]
        g += src.data[i + 1]
        b += src.data[i + 2]
    }

    r /= src.data.length / 4
    g /= src.data.length / 4
    b /= src.data.length / 4

    r = Math.ceil(r)
    g = Math.ceil(g)
    b = Math.ceil(b)

    for (var i = 0; i < src.data.length; i += 4) {
        dst.data[i] = r
        dst.data[i + 1] = g
        dst.data[i + 2] = b
        dst.data[i + 3] = 255
    }

    ctx.putImageData(dst, x, y)
}

function cutRemnant(x, y, w, h) {
    let ctx = canvas.getContext('2d')

    var src = ctx.getImageData(x, y, w, h);
    var dst = ctx.createImageData(canvas.width, canvas.height)

    for (var i = 0; i < src.data.length; i += 4) {
        dst.data[i + 3] = 0
    }
    
    ctx.putImageData(dst, x, y)
    ctx.putImageData(src, x, y)
}

function resizeCanvas(width, height, func) {
    var img = new Image();
    img.onload = function() {
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        if (func) {
            func();
        }
    }
    img.src = canvas.toDataURL();
}

document.querySelector('input[type="file"]').onchange = function() {
    let img = this.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(img)
    reader.onload = function() {
    	image_url = reader.result
        drawImage(reader.result, 1)
    }
}

document.getElementById("slider").addEventListener("change", function(e) {
	var value = document.getElementById('output1').value
    drawImage(image_url, Number(value))
})
```
