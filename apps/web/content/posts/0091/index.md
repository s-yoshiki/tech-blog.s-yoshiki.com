---
title: "全角かな or カナを半角カナに変換する【JS】"
path: "/entry/91"
date: "2018-12-28 00:37:06"
coverImage: "../../../images/thumbnail/javascript-logo.png"
author: "s-yoshiki"
tags: ["html5","javascript"]
---

## 概要

全角かなもしくは全角カナを半角カナに変換するサンプルコードとデモを紹介します。

## デモ

<script async="" src="//jsfiddle.net/s_yoshiki/g01zevLj/embed/result,js/"></script>

<iframe width="100%" height="500" src="//jsfiddle.net/s_yoshiki/g01zevLj/embedded/result,js" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

## サンプルコード

### HTML

```html
<div>
    <div>
        <div>
            <div>
                <label>input</label>
                <textarea id="src"></textarea>
                <label>output</label>
                <textarea id="dst"></textarea>
                <div>
                    <button id="run">run</button>
                </div>
                <select id="kana-type">
                    <option value="all" selected>全て変換</option>
                    <option value="hiragana">かなのみ変換</option>
                    <option value="katakana">カナのみ変換</option>
                </select>
            </div>
        </div>
    </div>
</div>
```

### JS

```js
const KANA = {
  'normal': {
    'src': {
      'hiragana':
        'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんぁぃぅぇぉヵヶっゃゅょゎ。、「」ー',
      'katakana':
        'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンァィゥェォヵヶッャュョヮ。、「」ー',
    },
    'dst': 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝｧｨｩｪｫヵヶｯｬｭｮﾜ｡､｢｣-',
    'suffix': '',
  },
  'dakuon': {
    'src': {
      'hiragana': 'がぎぐげござじずぜぞだぢづでどばびぶべぼゔ',
      'katakana': 'ガギグゲゴザジズゼゾダヂヅデドバビブベボヴ',
    },
    'dst': 'ｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾊﾋﾌﾍﾎｳ',
    'suffix': 'ﾞ',
  },
  'handakuon': {
    'src': {
      'hiragana': 'ぱぴぷぺぽ',
      'katakana': 'パピプペポ',
    },
    'dst': 'ﾊﾋﾌﾍﾎ',
    'suffix': 'ﾟ',
  },
};

document.getElementById('run').addEventListener('click', (e) => {
  var input = document.getElementById('src');
  var output = document.getElementById('dst');
  var type = document.getElementById('kana-type');

  output.value = '';

  var zenkaku = [];
  var hankaku = [];

  for (var key1 in KANA) {
    var src = KANA[key1].src;
    var dst = KANA[key1].dst;
    var suffix = '';

    if (KANA[key1].suffix) {
      suffix = KANA[key1].suffix;
    }

    for (var key2 in src) {
      if (type.value === 'all' || key2 === type.value) {
        var row = src[key2];
        for (var j = 0; j < row.length; j++) {
          zenkaku.push(row[j] + suffix);
          hankaku.push(dst[j] + suffix);
        }
      }
    }
  }

  input.value.split('').forEach((e) => {
    for (var i = 0; i < zenkaku.length; i++) {
      if (zenkaku[i] == e) {
        output.value += hankaku[i];
        return;
      }
    }
    output.value += e;
  });
});
```
