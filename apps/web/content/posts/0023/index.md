---
title: "ナイーブベイズで文字化けの種別を判定する。"
path: "/entry/23"
date: "2018-07-28 01:22:45"
coverImage: "../../../images/thumbnail/python-logo.png"
author: "s-yoshiki"
tags: ["python","機械学習","scikit-learn","ベイズ","ナイーブベイズ"]
---

## 背景

古い構成のシステムとかだとソースコード、HTMLの雛形、DB、内部処理のエンコード形式など文字コードがバラバラなんて言うことがある。
euc-jpとshift-jisが混ざってる上にターミナルやvimのエンコードでぐちゃぐちゃ下文字列を見る時の気分は最悪だ。
と言うわけで、コピペするだけでどの文字化けを解くのが目的。
<a href="http://lab.kiki-verb.com/mojibakeratta/">http://lab.kiki-verb.com/mojibakeratta/</a> (もじばけらった)とか
こう言うものもあるが、スマートで一発に解くのが目的。兼、機械学習のお勉強。

## 概要

scikit-learnのナイーブベイズ分類器を使って、エンコードされてしまった文字列を解析する。

scikit-learnとナイーブベイズ

ナイーブベイズ分類器はいくつか用意されており、その中でもシンプルなガウシアンを利用する。
65535種類あるUTF-8の中から、どんな文字が多く出現しているかをカウントしていく方法で分類

## 対象とする文字化け

#### 学習データ

| \#      | 元の文字コード | エンコードした文字コード | 例                                                                          |
| :------ | :------------- | :----------------------- | :-------------------------------------------------------------------------- |
| 1       | shift-jis      | utf-8                    | 「縺薙ｌ縺ｯUTF-8縺ｮ繝・く繧ｹ繝医〒縺吶よ怙霑代・谿・←縺薙ｌ縺ｧ縺吶・縲」    |
| 2       | euc-jp         | utf-8                    | 「ﾎ･ﾆ･ｭ･ｹ･ﾈ､ﾇ､ｹ｡｣､ｽ､・ﾊ､熙ﾋﾊﾘﾍ」                                            |
| 3       | utf-8          | shift-jis                | 「$l$O(Jiso-2022-jp$B$N%F%-%9%H$G$9!#(JJIS$B$H$b8@$C$?$j$7$^$9!#EE;R%a!<%」 |
| おまけ1 | -              | -                        | 「This is plane text」 ※英語として分類                                      |
| おまけ2 | -              | -                        | 「この文章は日本語で書かれています」 ※日本語として分類                      |

#### 分類するデータ

```
arr = [
    "これはUTF-8のテキストです。最近は殆どこれですね。",
    "代・谿・←縺薙ｌ縺ｧ縺吶・縲",
    "Hello World",
    "euc-jp､ﾎ･ﾆ･ｭ･ｹ･ﾈ､ﾇ､ｹ｡｣､ｽ､・ﾊ､熙ﾋﾊﾘﾍﾀ､ﾃ､ｿ､ﾎ､ﾇ､ﾞ",
    "$B$N%F%-%9%H$G$9!#(JJIS$B$H"
]
```

## 結果

```
['ja-jp'] これはUTF-8のテキストです。最近は殆どこれですね。
['shift-jis->utf-8'] 代・谿・←縺薙ｌ縺ｧ縺吶・縲
['en'] Hello World
['euc-jp->utf-8'] euc-jp､ﾎ･ﾆ･ｭ･ｹ･ﾈ､ﾇ､ｹ｡｣､ｽ､・ﾊ､熙ﾋﾊﾘﾍﾀ､ﾃ､ｿ､ﾎ､ﾇ､ﾞ
['utf-8->shift-jis'] $B$N%F%-%9%H$G$9!#(JJIS$B$H
```

となった。
データが集めがザルだったが、それっぽく分類できるのは確認できた。
APIにするのも難しくなさそう。

## ソース

```py
import numpy as np
from sklearn.naive_bayes import GaussianNB
from sklearn.metrics import accuracy_score

def count_codePoint(str):
  counter = np.zeros(65535)
  
  for i in range(len(str)):
    code_point = ord(str[i])
    if code_point > 65535 :
      continue
    counter[code_point] += 1
   
  counter = counter/len(str)
  return counter

ja_str = '縺薙ｌ縺ｯUTF-8縺ｮ繝・く繧ｹ繝医〒縺吶よ怙霑代・谿・←縺薙ｌ縺ｧ縺吶・縲'
en_str = ' This is English Strings.'

x_train = [
    count_codePoint('This is plane text'),
    count_codePoint('この文章は日本語で書かれています'),
    
    count_codePoint('縺薙ｌ縺ｯUTF-8縺ｮ繝・く繧ｹ繝医〒縺吶よ怙霑代・谿・←縺薙ｌ縺ｧ縺吶・縲'), 
    count_codePoint('ﾎ･ﾆ･ｭ･ｹ･ﾈ､ﾇ､ｹ｡｣､ｽ､・ﾊ､熙ﾋﾊﾘﾍ'),
    count_codePoint('$l$O(Jiso-2022-jp$B$N%F%-%9%H$G$9!#(JJIS$B$H$b8@$C$?$j$7$^$9!#EE;R%a!<%'),
    count_codePoint('$N%F%-%9%H$G$9!#(JJIS$B$H$b8@$C$?$j$7$^$9!#EE;R%a!<')
]

y_train = [
    'en',
    'ja-jp',
    
    'shift-jis->utf-8',
    'euc-jp->utf-8',
    'utf-8->JIS',
    'utf-8->shift-jis',
]

#学習
clf = GaussianNB()
clf.fit(x_train, y_train)

arr = [
    'これはUTF-8のテキストです。最近は殆どこれですね。',
    '代・谿・←縺薙ｌ縺ｧ縺吶・縲',
    'Hello World',
    'euc-jp､ﾎ･ﾆ･ｭ･ｹ･ﾈ､ﾇ､ｹ｡｣､ｽ､・ﾊ､熙ﾋﾊﾘﾍﾀ､ﾃ､ｿ､ﾎ､ﾇ､ﾞ',
    '$B$N%F%-%9%H$G$9!#(JJIS$B$H'
]

for i in arr:
  sub_arr = [count_codePoint(i)]
  y_pred = clf.predict(sub_arr)
  print(y_pred,i)[/python]
```

## 参考

<a href="http://labs.timedia.co.jp/2010/12/identifying-electronic-ghosts.html">http://labs.timedia.co.jp/2010/12/identifying-electronic-ghosts.html</a>
