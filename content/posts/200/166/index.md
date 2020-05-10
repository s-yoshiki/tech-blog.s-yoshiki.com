---
title: "Selenium + Python でYahooのログインや検索・メールの操作を自動化する。"
path: "/entry/166"
date: "2019-10-21 18:54:05"
coverImage: "../../../images/thumbnail/yahoo-logo.png"
author: "s-yoshiki"
tags: ["selenium","python"]
---

## 概要

Selenium + PythonでYahooメールの各種メールボックスの操作を自動化する方法の紹介です。

## 環境

今回紹介する方法はmac上にselenimu環境を構築しています。

<!-- wp:list -->
<ul><li>macOS catalina</li><li>Python3.7</li><li>Selenium</li><li>ChromeDriver</li></ul>
<!-- /wp:list -->

## Selenium環境の構築

<!-- wp:heading {"level":3} -->

### Seleniumのインストール

まずはじめにSeleniumをpipでインストールします。

```shell
$ pip install selenium
```

続いて、ChromeDriverをbrew経由でインストールします。

ChromeDriverは、Selenium WebDriverがChromeを制御するために使用する別個の実行ファイルです。

```shell
$ brew install chromedriver
```

<!-- wp:heading {"level":3} -->

### 検証

```py
from selenium import webdriver
driver = webdriver.Chrome()
```

正しくインストールされていると、上記のコードを実行した際にChromeが立ち上がります。

## Yahoo検索する

ここから実践編です。まずは簡単に実装できるヤフーの検索の実装の紹介です。

具体的には検索のテキストボックスや検索ボタンの要素を取得してイベントを実行するというものです。

**サンプルソース**

```py
from selenium import webdriver
from selenium.webdriver.common import keys
import time

driver = webdriver.Chrome()

## 検索
def search(word):
    # "p"は検索ボックスのname
    driver.find_element_by_name("p").send_keys(word)
    # "_63Ie6douiF2dG_ihlFTen"は検索ボタンのクラス
    driver.find_element_by_class_name("_63Ie6douiF2dG_ihlFTen").click()

search("Selenium")
```

## Yahooにログイン/ログアウトする

次にヤフーにログインする実装の紹介です。

ポイントとなるのはtime.sleep(2)を挿入して待ち時間を作っています。ヤフーのログイン画面はIDを入力した後にJSのイベントが走るので、"待ち"を作って考慮しています。

```py
from selenium import webdriver
from selenium.webdriver.common import keys
import time

driver = webdriver.Chrome()

## Login
def login(username, password):
    driver.get("https://login.yahoo.co.jp/config/login")
    driver.find_element_by_id("username").send_keys(username)
    driver.find_element_by_id("btnNext").click()
    time.sleep(2)
    driver.find_element_by_id("passwd").send_keys(password)
    driver.find_element_by_id("btnSubmit").click()
```

また、ログアウトは次のコードとなります。比較的簡単に実装できました。

```py
## Logout
def logout():
    driver.get("https://login.yahoo.co.jp/config/login?logout=1")
```

## Yahooメールの操作〜ゴミ箱を空にする

次はYahooメールの操作についての実装です。

ここではゴミ箱の中身を全て削除するサンプルを紹介します。

Yahooメールの受信メール関連の操作は、概ね共通であり、受信ボックス画面(TOP)に遷移した後、

<ol><li>任意のタブ or メニューを選択</li><li>項目の操作</li><li>イベント実行</li><li>モーダルウィンドウの対応</li></ol>

、、、という流れになります。

ゴミ箱の操作であれば、

<ol><li>ゴミ箱を選択</li><li>任意の項目を選択 (サンプルソースでは全メール選択)</li><li>削除実行</li><li>OKボタンのモーダル操作</li></ol>

という流れになります。

```py
def deleteTrashMail():
    driver.get("https://jp.mg5.mail.yahoo.co.jp/")
    driver.find_element_by_id("Trash").click()
    time.sleep(1)
    driver.find_element_by_class_name("focusable").click()
    time.sleep(1)
    driver.find_element_by_id("h_delete").click()
    time.sleep(1)
    driver.find_element_by_id("okModalOverlay").click()
```

## サンプルソース

```py
from selenium import webdriver
from selenium.webdriver.common import keys
import time

driver = webdriver.Chrome()

## 検索
def search(word):
    driver.find_element_by_name("p").send_keys(word)
    driver.find_element_by_class_name("_63Ie6douiF2dG_ihlFTen").click()

## Login
def login(username, password):
    driver.get("https://login.yahoo.co.jp/config/login")
    driver.find_element_by_id("username").send_keys(username)
    driver.find_element_by_id("btnNext").click()
    time.sleep(2)
    driver.find_element_by_id("passwd").send_keys(password)
    driver.find_element_by_id("btnSubmit").click()

## Logout
def logout():
    driver.get("https://login.yahoo.co.jp/config/login?logout=1")

def _deleteSelectedMails():
    time.sleep(1)
    driver.find_element_by_class_name("focusable").click()
    time.sleep(1)
    driver.find_element_by_id("h_delete").click()
    time.sleep(1)
    driver.find_element_by_id("okModalOverlay").click()

## 受信メール削除
def deleteReceivedMail():
    driver.get("https://jp.mg5.mail.yahoo.co.jp/")
    _deleteSelectedMails()

## 下書きメール削除
def deleteDraftMail():
    driver.get("https://jp.mg5.mail.yahoo.co.jp/")
    driver.find_element_by_id("Draft").click()
    _deleteSelectedMails()

## 迷惑メール削除
def deleteBulkMail():
    driver.get("https://jp.mg5.mail.yahoo.co.jp/")
    driver.find_element_by_id("Bulk").click()
    _deleteSelectedMails()

## 送信メール削除
def deleteSentMail():
    driver.get("https://jp.mg5.mail.yahoo.co.jp/")
    driver.find_element_by_id("Sent").click()
    _deleteSelectedMails()

## ゴミ箱メール削除
def deleteTrashMail():
    driver.get("https://jp.mg5.mail.yahoo.co.jp/")
    driver.find_element_by_id("Trash").click()
    _deleteSelectedMails()

## main
if __name__ == '__main__':
    try:
        login("ididididid", "passpasspass")
    except:
        print('error:login')
    try:
        deleteReceivedMail()
        time.sleep(3)
    except:
        print('error:deleteReceivedMail')
    try:
        deleteDraftMail()
    except:
        print('error:deleteDraftMail')
    try:
        deleteBulkMail()
    except:
        print('error:deleteBulkMail')
    try:
        deleteSentMail()
    except:
        print('error:deleteSentMail')
    try:
        deleteTrashMail()
    except:
        print('error:deleteTrashMail')
    try:
        logout()
    except:
        print('error:logout')
    driver.close()
```

## 参考

<a href="http://chromedriver.chromium.org/getting-started">http://chromedriver.chromium.org/getting-started</a>
