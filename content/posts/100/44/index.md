---
title: "JS + Canvasで画像をプルプルふるわせる。"
path: "/entry/44"
date: "2018-09-13 00:40:27"
coverImage: "../../../images/thumbnail/javascript-logo.png"
author: "s-yoshiki"
tags: ["javascript"]
---

## 概要

canvas + JSで画像をプルプル震わせる。

## デモ

<div><script async="" src="//jsfiddle.net/s_yoshiki/t8abdvrx/embed/result,js,html/"></script></div>
<a href="https://jsfiddle.net/s_yoshiki/t8abdvrx/show" target="_blank">外部ウィンドウで開く</a>

## ソース

```
(function(){
    
    var image_url = "/path/to/image_url.png"
    var canavs    = document.getElementById("canvas");
    var context = canvas.getContext('2d');
    var event_btn      = document.getElementById("event_flg");
    var base_image  = {};
    var event_flg = true;
    var interval = 10;
    
    //振れ幅の設定
    var imPadding = {
        x : 50, y: 50
    };
    
    //画像 initialization
    var image = new Image();
    image.src = image_url;
    image.onload = function(){
        canvas.width = image.width    + imPadding.x;
        canvas.height = image.height + imPadding.y;
        pullImagePixels();
    }
    
    function pullImagePixels(){
        if(event_flg){
            context.clearRect(0, 0, canvas.width, canvas.height)
            context.drawImage(image, 
                              getRandomArbitary(0,imPadding.x),
                              getRandomArbitary(0,imPadding.y));
        }
        setTimeout(pullImagePixels,interval);
    }
    
    function getRandomArbitary(min, max) {
        return parseInt(Math.random() * (max - min) + min,10);
    }
    
    //ボタンはんどら
    event_btn.addEventListener("click",function(){
        if(!event_flg){
            event_btn.innerHTML = "■";
        }else{
            event_btn.innerHTML = "▶︎";
        }
        event_flg = (!event_flg);
    });    
    
})();
```

```
<canvas id="canvas"></canvas>
<button id="event_flg">■</button>
```

## その他

setTimeout使ってるあたりがダサいですね。Promiseが使えるよう勉強します。
