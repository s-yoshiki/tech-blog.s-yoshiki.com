---
title: "seleniumの環境構築 Ubuntu + Python3で構築"
path: "/entry/7"
date: "2018-04-09 14:59:41"
coverImage: "../../../images/thumbnail/python-logo.png"
author: "s-yoshiki"
tags: ["linux","ubuntu","selenium","python","google-chrome","vagrant"]
---

## 概要

Ubuntu上でSeleniumを動かした時のメモ・備忘録。ネット上でサンプルコードが見つかりやすいpythonでやることにした。
環境は、 Selenium + Chromedriver + Ubuntu14 + Python3

## 仮想環境構築

Vagrantを利用します。

<a href="https://qiita.com/w2-yamaguchi/items/191830191f8af05ac4dd">
https://qiita.com/w2-yamaguchi/items/191830191f8af05ac4dd</a>

<a href="https://qiita.com/hidekuro/items/385bcc4b9eb43945751d">
https://qiita.com/hidekuro/items/385bcc4b9eb43945751d</a>

この辺りを参考にしました。

```ruby
Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/xenial64"
  config.vm.box_version = "20180406.0.0"
  config.vm.network "forwarded_port", guest: 3000, host: 3000
  config.vm.network "private_network", ip: "192.168.33.10"
  config.vm.provider "virtualbox" do |vb|
    vb.gui = true
    vb.memory = "2048"
    vb.customize [
      "modifyvm", :id,
      "--vram", "256",
      "--clipboard",
      "--draganddrop",
      "--cpus", "2",
      "--ioapic", "on"
    ]
  end
end
```

次にデスクトップ環境を導入します。

```shell
sudo apt-get -y install ubuntu-desktop
```

デスクトップが重い場合はメモリの割り当てを増やします。
デフォルトのキーボードがUS配列だったのでこれも変更します。

```shell
sudo dpkg-reconfigure keyboard-configuration
```

そして
Generic 105-key (Intl) PC → Japanese → Japanese → The default for the keyboard layout → No compose key
ここを参考にしました。
<a href="https://qiita.com/jjjiii26/items/af134896483ae9d32a7d">https://qiita.com/jjjiii26/items/af134896483ae9d32a7d</a>

## Selenium導入

python3環境がなかったのでpythonを導入。

```shell
sudo apt install python3-pip
```

Chromeのインストール

```shell
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo dpkg -i google-chrome-stable_current_amd64.deb
```

Seleniumのインストール

```shell
sudo apt-get install python3-selenium
```

Chromeドライバのインストール

```shell
wget https://chromedriver.storage.googleapis.com/2.31/chromedriver_linux64.zip
unzip chromedriver_linux64.zip -d ~/bin/
```

これで準備完了。

また、

```shell
sudo apt-get search selenium
```

をすると下のように関連パッケージが出てくるので試してみたいと思います。

```shell
chromium-chromedriver/trusty-updates,trusty-security,now 65.0.3325.181-0ubuntu0.14.04.1 amd64 [installed]
  WebDriver driver for the Chromium Browser

libtest-www-selenium-perl/trusty 1.36-1 all
  Perl test framework using Selenium Remote Control

phpunit-selenium/trusty 1.2.6-3 all
  Selenium RC integration for PHPUnit

python-selenium/trusty,now 2.25.0-0ubuntu1 all [installed]
  python bindings for Selenium

ruby-childprocess/trusty 0.3.9-2 all
  Ruby library for controlling external programs running in the background
```

## 実行

```python
from selenium import webdriver

driver = webdriver.Chrome("/usr/bin/chromedriver")
driver.get('https://google.co.jp')
```

googleのトップに遷移します。
