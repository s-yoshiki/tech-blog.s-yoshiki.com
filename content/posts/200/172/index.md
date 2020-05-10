---
title: "WordPress + WP2Static で静的サイトを生成する"
path: "/entry/172"
date: "2019-11-25 00:04:29"
coverImage: "../../../images/thumbnail/wordpress-logo.png"
author: "s-yoshiki"
tags: ["wordpress","cms","wp2static"]
---

## 概要

WP2StaticはWordPress から静的サイトを生成するプラグインです。

<!-- wp:embed {"url":"https://wp2static.com/"} -->
<figure class="wp-block-embed"><div class="wp-block-embed__wrapper">
https://wp2static.com/
</div></figure>
<!-- /wp:embed -->

これまで同じく静的サイトを生成する「StaticPress」や「Simply Static」などを試しましたが、動作の安定感や開発の頻度から最終的にWP2Staticに落ち着きました。\nインストールはプラグインの新規追加から検索してインストールする事ができます。

## クイックスタート

<!-- wp:image {"id":1556,"sizeSlug":"large"} -->
<figure class="wp-block-image size-large"><img src="https://tech-blog.s-yoshiki.com/wp-content/uploads/2019/11/wp2static_1-1024x325.png" alt="" class="wp-image-1556"/></figure>
<!-- /wp:image -->

プラグインからWP2Staticを選択します。

「Where will you host the optimized version of your site?」から出力形式を選択します。

<!-- wp:list -->
<ul><li>Subdirectory on current server</li><li> ZIP archive</li><li> Amazon S3</li><li> Bitbucket</li><li> BunnyCDN</li><li> GitHub Pages</li><li> GitLab</li><li> Netlify</li><li> FTP</li></ul>
<!-- /wp:list -->

設定情報などを入力後「Start static site export」を押下し生成を開始します。

「Save current options」で入力した設定情報を保存できます。

URLに非ASCII文字が存在する場合デプロイに失敗するようです。

<!-- wp:embed {"url":"https://forum.wp2static.com/-12/known-issues-incompatibilities"} -->
<figure class="wp-block-embed"><div class="wp-block-embed__wrapper">
https://forum.wp2static.com/-12/known-issues-incompatibilities
</div></figure>
<!-- /wp:embed -->

## 保存対象URLの補完

WP2Staticでは保存対象のURLを自動的に探索しますが、一部のURLは検出されません。任意のURLのページを含めたい場合は、次の画像のようにパスを入力して生成対象に追加する必要があります。

<!-- wp:image {"id":1558,"sizeSlug":"large"} -->
<figure class="wp-block-image size-large"><img src="https://tech-blog.s-yoshiki.com/wp-content/uploads/2019/11/wp2static_2-1024x394.png" alt="" class="wp-image-1558"/></figure>
<!-- /wp:image -->