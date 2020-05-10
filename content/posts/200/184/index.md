---
title: "Qiitaでバズるとこうなる。アクセスの分析や原因考察をする"
path: "/entry/184"
date: "2020-02-01 16:52:56"
coverImage: "../../../images/thumbnail/qiita-icon.png"
author: "s-yoshiki"
tags: ["小ネタ","雑談","ブログ","qiita","google-analytics"]
---

## 概要

Qiitaに数年前から投稿していますが、延3日間で「1000 いいね」をもらいました。今までの最大いいねが200未満だったこともあり、最高記録を大幅に更新しました。
(これは「バズった」といってもいいと思います。)
この時のアクセス分析やバズった原因を考察してみました。

<!-- wp:embed {"className":"twitter-tweet"} -->
<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">900いいね！ | Vue.jsで作成された、ちょっと面白くて役立ちそうなサービス by <a href="https://twitter.com/s_yoshiki_dev?ref_src=twsrc%5Etfw">@s_yoshiki_dev</a> <a href="https://t.co/ZISdnx6LsF">https://t.co/ZISdnx6LsF</a>
&mdash; Qiita (キータ) 公式 (@Qiita) <a href="https://twitter.com/Qiita/status/1223131319439437824?ref_src=twsrc%5Etfw">January 31, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
<!-- /wp:embed -->

## 投稿した記事

<!-- wp:embed {"url":"https://qiita.com/s-yoshiki/items/51150b37153b41df1da6"} -->
<figure class="wp-block-embed"><div class="wp-block-embed__wrapper">
https://qiita.com/s-yoshiki/items/51150b37153b41df1da6
</div></figure>
<!-- /wp:embed -->

Vue.jsで作成されたプロジェクトを紹介しているサイト「<a rel="noreferrer noopener" href="https://madewithvuejs.com/" target="_blank">**made with vue.js**</a>」の中で、個人的に面白いと思ったサイトを独断と偏見で選び出し、いくつか紹介したといものです。
サイトのスクショと簡単な紹介の一文を載せてあるだけの比較的内容薄めの記事です。

## アクセス分析

**いつものQIita (2020/01/21~2020/01/28)**

<!-- wp:image {"id":1678,"sizeSlug":"large"} -->
<figure class="wp-block-image size-large"><img src="https://tech-blog.s-yoshiki.com/wp-content/uploads/2020/02/image-1024x174.png" alt="" class="wp-image-1678"/></figure>
<!-- /wp:image -->

何もない日のQiitaはこんな状態です。1日100アクセス程度です。

**バズり1日目 (2020/01/29)**

<!-- wp:image {"id":1679,"sizeSlug":"large"} -->
<figure class="wp-block-image size-large"><img src="https://tech-blog.s-yoshiki.com/wp-content/uploads/2020/02/image-1-1024x174.png" alt="" class="wp-image-1679"/></figure>
<!-- /wp:image -->

朝8:00に記事を投稿。投稿直後は1時間ごとに30アクセス、2~3いいねがつきました。
Qiitaは9:00と17:00にトレンドランキングを更新しており、17:00にランキングに乗ったことで一気にアクセスが伸びはじめます。
18:00のアクセス数は230でした。この日の合計「いいね」数は100くらいだったと思います。

**バズり2日目 (2020/01/30)**

<!-- wp:image {"id":1680,"sizeSlug":"large"} -->
<figure class="wp-block-image size-large"><img src="https://tech-blog.s-yoshiki.com/wp-content/uploads/2020/02/image-2-1024x182.png" alt="" class="wp-image-1680"/></figure>
<!-- /wp:image -->

この日のランキング更新で9:00にデイリーランキングTOPになりました。
朝起きたら通知件数がエンカウントしていました。この日はブラウザを更新するたびに通知が届くという状態で正直興奮しました。
朝9:00のアクセス数は1500くらいでした。合計いいね数も700に到達しました。

**バズり3日目 (2020/01/31)**

<!-- wp:image {"id":1681,"sizeSlug":"large"} -->
<figure class="wp-block-image size-large"><img src="https://tech-blog.s-yoshiki.com/wp-content/uploads/2020/02/image-3-1024x181.png" alt="" class="wp-image-1681"/></figure>
<!-- /wp:image -->

前日より勢いは落ち着いたものの、依然として「いいね」の通知が届くという状態は続き、1000に達しました。

**3日間の合計**

<!-- wp:image {"id":1682,"sizeSlug":"large"} -->
<figure class="wp-block-image size-large"><img src="https://tech-blog.s-yoshiki.com/wp-content/uploads/2020/02/image-4-1024x339.png" alt="" class="wp-image-1682"/></figure>
<!-- /wp:image -->

3日間の合計PVはおよそ2万に上りました。そして、平均セッション時間30秒ということから、多くの人が大して中身を見ず、「いいね」をしていることがわかります。

**アクセス流入**

<!-- wp:image {"id":1683,"sizeSlug":"large"} -->
<figure class="wp-block-image size-large"><img src="https://tech-blog.s-yoshiki.com/wp-content/uploads/2020/02/image-5-1024x480.png" alt="" class="wp-image-1683"/></figure>
<!-- /wp:image -->

1日目は直リンクできていることら、おそらくQiita内のリンクからのアクセスだと推測できます。2日目以降にSNS(おそらくTwitter)や被リンクからのアクセスが増えはじめました。
2日目の半分以上のアクセスはQiita外からのアクセスであるため、バズるためにはSNSの活用が不可欠と言えるでしょう。

**被リンク流入の分析**

<!-- wp:image {"id":1684,"sizeSlug":"large"} -->
<figure class="wp-block-image size-large"><img src="https://tech-blog.s-yoshiki.com/wp-content/uploads/2020/02/image-6-873x1024.png" alt="" class="wp-image-1684"/></figure>
<!-- /wp:image -->

被リンク流入はこの画像の通りです。1位のgoogleapi.com はAndroid版Chromeのおすすめからの流入だと思われるます。それ以外にもhatena関連(はてブ、など)でも話題になっていたようです。それ以外は様々なキュレーションサイトからの流入だと思われます。

## Qiitaでバズった原因の考察

今回この記事が「いいね」されたのは、「まとめ記事」的な感じな構成だったからだと思います。この手の構成は常に需要があると言われています。

<!-- wp:quote -->
<blockquote class="wp-block-quote">5.とりあえずまとめ的記事にする

まとめブログが一世を風靡したのと同じように、また、NAVERまとめが流行ったのと同じように「まとめ」というのは常に需要があります。自分の知識が溜まったときにまとめ記事を投稿してみてもいいでしょう。

- イマドキのJavaScriptの書き方2018 
- ここ数年前から2015/5までのモダンフロントエンドを総まとめしてみた 
- 【まとめ】これ知らないプログラマって損してんなって思う汎用的なツール 100超 
- プログラミングでよく使う英単語のまとめ【随時更新】
<cite><a href="https://qiita.com/Ancient_Scapes/items/bba0fab1e55936e7234a">https://qiita.com/Ancient_Scapes/items/bba0fab1e55936e7234a</a></cite></blockquote>
<!-- /wp:quote -->

他にもバズり原因は様々なサイトで考察されていますが、正直どれもしっくりきていません。
また、中身が良いからバズっているというようにも言い切れません。Qiitaの場合は特にです。
ちなみにバズる投稿として検索すると目に付くもは次の通りです。

<!-- wp:list -->
<ul><li>本文の長さが最適であること</li><li>タイトルの長さが最適であること</li><li>投稿時間</li></ul>
<!-- /wp:list -->

<!-- wp:embed {"url":"https://qiita.com/mtitg/items/25e3d0d75429dcfeb199","type":"rich","providerNameSlug":"埋め込みハンドラー"} -->
<figure class="wp-block-embed is-type-rich is-provider-埋め込みハンドラー"><div class="wp-block-embed__wrapper">
https://qiita.com/mtitg/items/25e3d0d75429dcfeb199
</div></figure>
<!-- /wp:embed -->

<!-- wp:embed {"url":"https://ytsubuku.com/buzz-on-qiita"} -->
<figure class="wp-block-embed"><div class="wp-block-embed__wrapper">
https://ytsubuku.com/buzz-on-qiita
</div></figure>
<!-- /wp:embed -->

## 終わりに

初めて「1000いいね」をもらって嬉しく思いましたが、Qiitaにはもっといいねされるべき良質な記事が眠っている様な気がし、こんな記事がたくさん「いいね」されてしまうことについて申し訳なく思ったりしてます。そして、これはQiitaが技術情報共有サービスから初心者向けの慣れ合いのサービスに変わりつつあるといってもいいかもしれません。改めてどのメディアで何の情報収集(発信)をするか見極めて考え直すタイミングがきていると思いました。?

