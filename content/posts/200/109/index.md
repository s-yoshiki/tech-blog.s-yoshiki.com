---
title: "vue-cli3のセットアップと開発サーバ起動からバンドルファイル生成まで"
path: "/entry/109"
date: "2019-02-24 01:05:33"
coverImage: "../../../images/thumbnail/vue-logo.png"
author: "s-yoshiki"
tags: ["javascript","vue.js","webpack","node.js"]
---

## 概要

Vue.jsで作ったアプリをGitHub Pagesで公開する方法について。

## 検証環境

 - nodejs 11.10.0
 - npm 6.7.0
 - vue@cli 3.4.0

nodejsとnpmの導入については省略します。

## vue@cliの導入

vue@cliを導入します。

```shell
npm install @vue/cli -g
```

今回の場合はグローバルにインストールしています。

## vueプロジェクトの作成

上記のインストールが完了すると、vueコマンドが使えるようになります。

ここで、サンプルプロジェクトを作ります。

```shell
vue create sampleproject
cd sampleproject
```

開発サーバを起動してhttp://localhost:8080から確認をすることができます。

```shell
npm run server
```

本番用ビルドは

```shell
npm run build
```

でおこなうことができます。

## 開発・本番ビルドの設定

上記のビルドの際の設定はプロジェクトディレクトリのルート直下にvue.config.jsを置いておくと便利です。

### 各項目の設定

**module.outputDir**
バンドルファイル生成時に吐かれるディレクトリのパス。デフォルトではdist。

**module.publicPath**
バンドルファイルのjsやcssのパス。デフォルトではルートであるため、バンドルファイルが呼ばれるHTMLファイルをドキュメントルートのサブディレクトリの下におく場合は相対パスの方が良いと思う。

**module.configureWebpack.resolve.alias.vue$**
開発モードで起動時に、これを設定しておかないとテンプレートが読み込まれない。
詳しくは
<a href="https://forum.vuejs.org/t/how-to-configure-vue-cli-3-to-leverage-webpack-root-folder-aliases/40943/11">How to configure Vue CLI 3 to leverage webpack root folder aliases?</a>

```js
module.exports = {
  outputDir:'docs',
  publicPath: './',
  configureWebpack: {
    resolve: {
      alias: {
        "vue$": 'vue/dist/vue.esm.js'
      }
    }
  }
}

```

## 参考

<a href="https://www.maytry.net/start-pwa-by-vue-cli-3/">https://www.maytry.net/start-pwa-by-vue-cli-3/</a>