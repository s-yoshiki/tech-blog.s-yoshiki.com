---
title: "SAA試験対策 AWS BlackBeltを写経する"
path: "/entry/165"
date: "2019-09-29 23:21:06"
coverImage: "../../../images/thumbnail/aws-logo.png"
author: "s-yoshiki"
tags: ["amazon-aws","ec2","awsソリューションアーキテクト","資格試験"]
---
2019/09/23にAWSソリューションアーキテクトアソシエイト(通称SAA)に合格しました。
この記事はその際に行なった試験対策の話です。

## はじめに

AWSソリューションアーキテクトアソシエイトの合格体験記を見ているとよく書かれているキーワードとして「BlackBelt」なるのもがあります。
BlackBeltはAWSが提供するオンラインセミナーのことであり、講義後に資料が公開されます。

この資料は「AWS クラウドサービス活用資料集」と呼ばれます。

**AWS クラウドサービス活用資料集**

<a href="https://aws.amazon.com/jp/aws-jp-introduction/aws-jp-webinar-service-cut/">
https://aws.amazon.com/jp/aws-jp-introduction/aws-jp-webinar-service-cut/
</a>

これを使って、どのように学習に活用するかは色々なやり方があると思います。

例えば、通勤時間中にざっと流し読みするとか、ポイントをまとめるとか...あると思います。

私が行なった方法は「写経」です。

具体的には各スライドに出てくる文章やキーワード、図などを文章で構造化し、ひたすら書き写すという方法です。

初めて試験を受ける私にとってポイントを絞るとか山を張るような器用な対策ができなかったので、このようなやり方で進めました。

よかったか悪かったかも分かりませんし、少なくとも効率的なやり方では無いですが、結果的に合格することができました。

## 写経の例

EC2、EBS、ELBを例に「写経」します。

### EC2

<ul>
 	<li>EC2とは?
<ul>
 	<li>1時間または秒単位の従量課金で利用可能なAWSクラウド上の仮想サーバー</li>
 	<li>追加・削除、マシンスペック変更も数分で可能</li>
 	<li>20のリージョンにある61のアベイラビリティーゾーン(AZ)で運用</li>
 	<li>プロセッサとアーキテクチャ
<ul>
 	<li>Intel(x86_64 arch)、 AMD(x86_64 arch0)、 AWS Graviton Processor(64-bit Arm arch)</li>
</ul>
</li>
</ul>
</li>
 	<li>インスタンスタイプ
<ul>
 	<li>命名規則: c5d.xlarge == ${インスタンスファミリー}${世代}${機能}.${インスタンスサイズ}
<ul>
 	<li>インスタンスファミリー[必須]: メモリ・I/O・CPUクロック・GPU・汎用性などの種別
<ul>
 	<li>汎用:
<ul>
 	<li>A, T: 開発環境, Web,</li>
 	<li>M: DB、キャッシュサーバ</li>
</ul>
</li>
 	<li>コンピューティング最適化:
<ul>
 	<li>C: バッチ、動画像処理、エンコーディング</li>
</ul>
</li>
 	<li>ストレージ最適化:
<ul>
 	<li>H: BigData、分散型ファイルシステム</li>
 	<li>I: NoSQLデータベース</li>
</ul>
</li>
</ul>
</li>
 	<li>世代[必須]: 数字が大きい方が新しい</li>
 	<li>機能[任意]: インスタンスストア付加、ネットワーク強化、メモリ強化、等</li>
</ul>
</li>
 	<li>EC2 Bare Metal: ハードウェアへのダイレクトアクセスを提供する</li>
 	<li>バースト: 負荷に応じて高いレベルまでCPU性能がバーストする機能
<ul>
 	<li>T2, T3のみ</li>
</ul>
</li>
</ul>
</li>
 	<li>通信とセキュリティ
<ul>
 	<li>キーペア: AWSは公開鍵のみを保持、秘密鍵はユーザが管理</li>
 	<li>セキュリティグループ: ファイアウォール機能のこと
<ul>
 	<li>デフォルトでは全トラフィックが閉じている</li>
 	<li>必要な通信のみ定義する: TCP/UDP、ポート、アクセス元IP</li>
</ul>
</li>
 	<li>IPの種類 (VPCを利用した場合)
<ul>
 	<li>Private IP:
<ul>
 	<li>必ず割り当てられる</li>
 	<li>起動/停止した時 IPは変わらない</li>
</ul>
</li>
 	<li>Public IP
<ul>
 	<li>ランダムに割り当てられる</li>
 	<li>起動/停止した時 IPは変わる</li>
</ul>
</li>
 	<li>Elastic IP
<ul>
 	<li>静的なIP</li>
 	<li>起動/停止した時 IPは変わらない</li>
 	<li>アタッチしたインスタンスを起動していない場合、課金発生</li>
</ul>
</li>
</ul>
</li>
 	<li>ENI: ネットワークインタフェース
<ul>
 	<li>紐つけ対象: Private IP、Elastic IP、MACアドレス、セキュリティグループ</li>
 	<li>インスタンスによって割り当て可能な数が異なる</li>
</ul>
</li>
 	<li>拡張ネットワーキング
<ul>
 	<li>ixgbevf (Intel 82599VF)</li>
 	<li>ENA (Elastic Network Adapter)</li>
</ul>
</li>
</ul>
</li>
 	<li>ストレージ:
<ul>
 	<li>インスタンスストア
<ul>
 	<li>概要: ホストコンピュータに内蔵されたディスク</li>
 	<li>性能・容量はインスタンスタイプごとに規定</li>
 	<li>費用: 無料</li>
 	<li>Stop/Terminateするとクリアされる</li>
</ul>
</li>
 	<li>EBS
<ul>
 	<li>ネットワークで接続</li>
 	<li>EC2インスタンスとは独立管理</li>
 	<li>Snapshotを取得しS3に保存可能</li>
 	<li>費用: 発生</li>
 	<li>Stop/Terminateしてもクリアされない</li>
 	<li>EBS最適化オプション: 通常のネットワークとは別にEBS専用帯域を確保する
<ul>
 	<li>起動時に有効/無効を選択可</li>
 	<li>帯域はインスタンスサイズによって異なる</li>
 	<li>インスタンスタイプによってはデフォルトで有効</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
 	<li>AMI: OSイメージ
<ul>
 	<li>自作可能</li>
 	<li>カスタムAMIを元に何台でもインスタンス作成可能</li>
 	<li>別リージョンへのコピーも可能</li>
 	<li>AMIの分類
<ul>
 	<li>アーキテクチャ: x86 or Arm</li>
 	<li>ビット: 32 or 64</li>
 	<li>仮装方式: PV(非推奨) or HVM</li>
 	<li>ブートストレージ: EBS Backed or Instance Store-Baked(S3 Baked)</li>
</ul>
</li>
 	<li>AMIを探す: コミュニティAMI、マーケットプレイス</li>
</ul>
</li>
 	<li>プレイスメントグループ: EC2インスタンスの物理的な配置オプション
<ul>
 	<li>クラスタ
<ul>
 	<li>インスタンスを密な場所に配置 => ネットワークパフォーマンスを最適化</li>
 	<li>単一アベイラビリティゾーン</li>
</ul>
</li>
 	<li>スプレッド
<ul>
 	<li>インスタンスを別々のハードウェアに分散して配置 => 障害リスク軽減</li>
 	<li>複数AZへの配置可能かつ最大7つ</li>
</ul>
</li>
 	<li>パーティション
<ul>
 	<li>論理的な区切り(パーティション)に配置 + パーティションが異なるインスタンスを同一のハードウェアを共有しないように分散してインスタンスを配置 => 障害をパーティション単位に抑制</li>
</ul>
</li>
</ul>
</li>
 	<li>ライフサイクル
<ul>
 	<li>Running(実行中): 課金される、Stopped・Terminatedに遷移</li>
 	<li>Stopped(停止中): 課金されない、Runningに遷移</li>
 	<li>Terminated(削除済み): Running・Stoppedのどれにも遷移しない</li>
</ul>
</li>
 	<li>費用
<ul>
 	<li>オンデマンド: 初期費用なし、従量課金</li>
 	<li>リザーブド: 1年間または3年間、常に利用可能なキャパシティ予約により、最大75%の割引
<ul>
 	<li>スケジュールされたリザーブドインスタンス: 指定した時間帯のみのキャパシティ予約により、5%-10%の割引</li>
</ul>
</li>
 	<li>スポット: 使用キャパシティを時価で提供、最大90%の割引</li>
</ul>
</li>
 	<li>その他キーワード:
<ul>
 	<li>ユーザデータ: 起動時にスクリプト実行を行う機能</li>
 	<li>インスタンスメタデータ: 自インスタンスに関するデータを取得するための方法</li>
 	<li>起動テンプレート: EC2起動時に設定すべき項目をテンプレート化</li>
</ul>
</li>
</ul>
**Amazon EC2 (2019/03/05)**

<a href="https://www.slideshare.net/AmazonWebServicesJapan/20190305-aws-black-belt-online-seminar-amazon-ec2">Slideshare</a>
<a href="https://d1.awsstatic.com/webinars/jp/pdf/services/20190305_AWS-Blackbelt-EC2.pdf">PDF</a>
<a href="https://youtu.be/P5zX4DdlYOE">YouTube</a>

### <a name="header-n842" class="md-header-anchor md-print-anchor" href="af://n842"> </a><span>EBS</span>

<ul>
 	<li><span>EBS概要</span>
<ul>
 	<li><span>EC2インスタンスにアタッチして使用するストレージ</span></li>
 	<li><span>目的: OS、アプリケーション、データ置き場</span></li>
 	<li><span>SnapshotによるS3バックアップ、ディスク暗号化が可能</span></li>
 	<li><span>99.999%の可用性</span></li>
</ul>
</li>
 	<li><span>特徴</span>
<ul>
 	<li><span>容量 MAX 16TB</span></li>
 	<li><span>同一AZからのみ利用可能</span></li>
 	<li><span>複数のインスタンスから参照できない</span></li>
 	<li><span>Snapshot -> S3 は任意のAZに復元できる</span></li>
</ul>
</li>
 	<li><span>EBS最適化インスタンス</span>
<ul>
 	<li><span>最適化あり: 独立した帯域で通信 -> I/Oの安定化</span></li>
 	<li><span>最適化なし: 同じ帯域を利用 -> 他のネットワークの影響を受ける</span></li>
 	<li><span>旧世代のインスタンスを除いてデフォルトでON</span></li>
 	<li><span>大きいインスタンスタイプほど帯域が広い</span></li>
</ul>
</li>
 	<li><span>ブロックストレージの種類</span>
<ul>
 	<li><span>一時記憶</span>
<ul>
 	<li><span>EC2インスタンスストア</span></li>
</ul>
</li>
 	<li><span>永続記憶</span>
<ul>
 	<li><span>SSD (gp2, io1)</span></li>
 	<li><span>HDD (st1, sc1)</span></li>
</ul>
</li>
</ul>
</li>
 	<li><span>EBSユースケース</span>
<ul>
 	<li><span>汎用SSD (gp1)</span>
<ul>
 	<li><span>ブートボリューム</span></li>
 	<li><span>負荷が少ないシステム</span></li>
 	<li><span>開発テスト環境</span></li>
 	<li><span>仮想デスクトップ</span></li>
</ul>
</li>
 	<li><span>プロビジョンドIOPS (io1)</span>
<ul>
 	<li><span>RDB</span></li>
 	<li><span>NoSQL</span></li>
</ul>
</li>
 	<li><span>スループット最適化HDD (st1)</span>
<ul>
 	<li><span>ビックデータ</span></li>
 	<li><span>Hadoop</span></li>
</ul>
</li>
 	<li><span>コールドHDD</span>
<ul>
 	<li><span>ログデータ</span></li>
 	<li><span>アーカイブ・大量データ</span></li>
</ul>
</li>
</ul>
</li>
 	<li><span>EBSボリュームタイプ</span>
<ul>
 	<li><span>汎用SSD (gp1)</span>
<ul>
 	<li><span>サイズ: 1~16TiB</span></li>
 	<li><span>IOPS: 3 (1GiBあたり)</span>
<ul>
 	<li><span>ベースラインパフォーマンスが 3,000 IOPS 以下の場合、3,000 IOPS までバーストが可能</span></li>
 	<li><span>最小 100 IOPS (33.33 GiB 以下) から最大16,000 IOPS (5,334 GiB 以上) </span></li>
</ul>
</li>
 	<li><span>スループット</span>
<ul>
 	<li><span>128 MiB /s（ 170 GiB まで）</span></li>
 	<li><span>最大 250 MiB /s( 170 GiB から 334 GiB )</span></li>
 	<li><span>250 MiB /s ( 334 GiB 以上)</span></li>
</ul>
</li>
</ul>
</li>
 	<li><span>プロビジョンドIOPS (io1)</span>
<ul>
 	<li><span>サイズ: １〜16TiB</span></li>
 	<li><span>IOPS: 必要なIOPS値を指定可能</span>
<ul>
 	<li><span>容量(GiB)あたり50 IOPS を指定できる</span></li>
 	<li><span>最小 100 IOPS</span></li>
 	<li><span>最大 64,000 IOPS（Nitro ベースインスタンス）</span></li>
 	<li><span>最大 32,000 IOPS（その他インスタンス）</span></li>
</ul>
</li>
 	<li><span>スループット</span>
<ul>
 	<li><span>最大 1,000 MiB /s（2000 IOPS 以上のときかつ Nitro ベースインスタンス</span></li>
 	<li><span>最大 500 MiB /s（その他のインスタンス）</span></li>
</ul>
</li>
</ul>
</li>
 	<li><span>スループット最適化HDD (st1)</span>
<ul>
 	<li><span>サイズ: 500GiB~16TiB</span></li>
 	<li><span>IOPS: 最大500IOPS</span></li>
 	<li><span>スループット</span>
<ul>
 	<li><span>ベース値：1 TiB あたり 40 MiB /s</span></li>
 	<li><span>バースト値：1 TiB あたり 250 MiB /s</span></li>
 	<li><span>バーストクレジット上限：1TiB / 1TiB</span></li>
 	<li><span>最大 500 MiB /s</span></li>
</ul>
</li>
</ul>
</li>
 	<li><span>コールドHDD</span>
<ul>
 	<li><span>サイズ: 500GiB~16TiB</span></li>
 	<li><span>IOPS: 最大250IOPS</span></li>
 	<li><span>スループット</span>
<ul>
 	<li><span>ベース値：1 TiB あたり 12 MiB /s</span></li>
 	<li><span>バースト値：1 TiBあたり 80 MiB /s</span></li>
 	<li><span>バーストクレジット上限：1 TiB /1 TiB</span></li>
 	<li><span>最大 250 MiB /s</span></li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
 	<li><span>監視</span>
<ul>
 	<li><span>性能の監視</span>
<ul>
 	<li><span>CloudWatch 標準メトリクス</span></li>
 	<li><span>Read/Bytes, Read/Ops, VolumeConsumedReadWrite</span></li>
</ul>
</li>
 	<li><span>容量</span>
<ul>
 	<li><span>CloudWatch カスタムメトリクス</span></li>
 	<li><span>空き容量・使用量</span></li>
</ul>
</li>
 	<li><span>バーストクレジット</span>
<ul>
 	<li><span>BurstBalance</span></li>
</ul>
</li>
</ul>
</li>
 	<li><span>NVMe</span>
<ul>
 	<li><span>Nitro ベースインスタンスでは、NVMe ブロックデバイスとして EBS ボリューム認識</span></li>
</ul>
</li>
 	<li><span>Elastic Volume</span>
<ul>
 	<li><span>インスタンスアタッチ中にサイズ変更可能</span></li>
</ul>
</li>
 	<li><span>EBS Snapshot</span>
<ul>
 	<li><span>定期的にバックアップを取得する</span></li>
 	<li><span>作成時は静止点を設けることを推奨</span></li>
 	<li><span>差分ごと管理できる</span></li>
 	<li><span>リージョン間コピーをサポート</span></li>
</ul>
</li>
 	<li><span>暗号化</span>
<ul>
 	<li><span>特徴</span>
<ul>
 	<li><span>ONにすると全て暗号化される</span></li>
 	<li><span>ハードウェア機能で行うのでパフォーマンス影響は小さい</span></li>
 	<li><span>暗号化されたsnapshotは復元すると暗号化されている</span></li>
</ul>
</li>
 	<li><span>キー</span>
<ul>
 	<li><span>AES-256</span></li>
 	<li><span>Data Key はボリュームごとに一意のキーを生成、ボリューム上に保存</span></li>
 	<li><span>Data Key 生成にはKMS CMK 両方 の利用が可能</span></li>
</ul>
</li>
 	<li><span>無効化・有効化</span>
<ul>
 	<li><span>Snapshot経由</span></li>
 	<li><span>OS側のコピー rsyncなど</span></li>
</ul>
</li>
</ul>
</li>
 	<li><span>価格</span>
<ul>
 	<li><span>汎用SSD (gp1)</span>
<ul>
 	<li><span>$0.12 / GB / 月</span></li>
</ul>
</li>
 	<li><span>プロビジョンドIOPS (io1)</span>
<ul>
 	<li><span>$0.142</span></li>
 	<li><span>指定IOPS</span>
<ul>
 	<li><span>$0.074 / IOPS / 月</span></li>
</ul>
</li>
</ul>
</li>
 	<li><span>スループット最適化HDD (st1)</span>
<ul>
 	<li><span>$0.054</span></li>
</ul>
</li>
 	<li><span>コールドHDD</span>
<ul>
 	<li><span>$0.03</span></li>
</ul>
</li>
</ul>
</li>
</ul>
**<span>Amazon EBS (2019/03/05)</span>**
<a href="https://www.slideshare.net/AmazonWebServicesJapan/20190320-aws-black-belt-online-seminar-amazon-ebs/"><span>Slideshare</span></a>
<a href="https://d1.awsstatic.com/webinars/jp/pdf/services/20190320_AWS-BlackBelt-EBS.pdf"><span>PDF</span></a>
<a href="https://youtu.be/ffND-tX1Qxs"><span>YouTube</span></a>

### <a name="header-n1110" class="md-header-anchor md-print-anchor" href="af://n1110"> </a><span>ELB</span>

<ul>
 	<li><span>ELBとは</span>
<ul>
 	<li><span>実現できるシステム: スケーラブル、可用性があるサービス</span></li>
 	<li><span>特徴</span>
<ul>
 	<li><span>スケーラブル : キャパシティを自動増減</span></li>
 	<li><span>料金: 従量課金</span></li>
 	<li><span>管理: マネージド</span></li>
 	<li><span>連携: Auto Scaling, Route 53, Cloud Formation</span></li>
</ul>
</li>
 	<li><span>リクエストやコネクションが均等になるような負荷分散</span></li>
 	<li><span>ELB自体も自動スケール</span></li>
 	<li><span>複数AZに分散 => 2段階で分散</span>
<ul>
 	<li><span>ラウンドロビンでAZ内のALBに振り分け</span></li>
 	<li><span>負荷が均等になるようにEC2に振り分け</span></li>
</ul>
</li>
 	<li><span>ヘルスチェック</span>
<ul>
 	<li><span>指定した設定に基づきインスタンスのヘルスチェックを行う</span></li>
</ul>
</li>
 	<li><span>課金体系</span>
<ul>
 	<li><span>CLB: 処理料</span></li>
 	<li><span>ALB: LCU</span></li>
</ul>
</li>
</ul>
</li>
 	<li><span>ELB Tips</span>
<ul>
 	<li><span>Route53 以外のDNSを利用する</span>
<ul>
 	<li><span>CNAMEを使う</span></li>
</ul>
</li>
 	<li><span>Route53 を使う</span>
<ul>
 	<li><span>CNAME</span></li>
 	<li><span>エイリアス</span></li>
 	<li><span>Zone Apex を利用する場合</span>
<ul>
 	<li><span>CNAMEは不可</span></li>
 	<li><span>エイリアスレコードを使用</span></li>
</ul>
</li>
</ul>
</li>
 	<li><span>クライアントのIPアドレス</span>
<ul>
 	<li><span>ソースIPアドレスがELBのIPアドレスとなる</span></li>
</ul>
</li>
 	<li><span>AZとキャパシティ</span>
<ul>
 	<li><span>クロスゾーン不可分散でAZを超えて不可を均等にできる</span></li>
</ul>
</li>
 	<li><span>コネクションタイムアウト</span>
<ul>
 	<li><span>異常だと自動で切断する</span></li>
 	<li><span>デフォルト: 60s (1~3600s に変更可能)</span></li>
</ul>
</li>
 	<li><span>VPCでの利用</span>
<ul>
 	<li><span>サブネットは最小 /27 CIDRブロックで、８個以上の空きIPが必要</span></li>
</ul>
</li>
 	<li><span>Internet-Facing ELB / Internal ELB</span>
<ul>
 	<li><span>Internet-Facing ELB: インターネットからアクセスできるELB</span></li>
 	<li><span>Internal ELB: オンプレミス環境からのみアクセスできるELB</span></li>
</ul>
</li>
 	<li><span>セキュリティグループ</span>
<ul>
 	<li><span>任意のセキュリティグループを設定可能</span></li>
 	<li><span>バックエンドのEC2インスタンスはELBからのみリクエストを受け付ける設定を推奨</span></li>
</ul>
</li>
</ul>
</li>
 	<li><span>SSL</span>
<ul>
 	<li><span>TLS 1.1, 1.2のサポート</span></li>
 	<li><span>Perfect Forward Secrecy (PFS) のサポート</span></li>
 	<li><span>Server Order Preference</span></li>
</ul>
</li>
 	<li><span>スティッキーセッション</span>
<ul>
 	<li><span>同じユーザから来たリクエストを全て同じEC2インスタンスに送信</span></li>
 	<li><span>デフォルト: 無効</span></li>
 	<li><span>HTTP/HTTPSのみ可能</span></li>
 	<li><span>独自のCookieを挿入</span></li>
</ul>
</li>
 	<li><span>Connection Draining</span>
<ul>
 	<li><span>EC2インスタンスをELBから登録解除したり、ヘルスチェックが失敗した時に、新規割り振りは中止して、処理中のリクエストは終わるまで一定期間待つ</span></li>
</ul>
</li>
</ul>

**<span>ELB (2016/10/12)</span>**
<a href="https://www.slideshare.net/AmazonWebServicesJapan/aws-black-belt-online-seminar-2016-elastic-load-balancing"><span>SlideShare</span></a>
<a href="https://d1.awsstatic.com/webinars/jp/pdf/services/20161012_AWS-BlackBelt-ELBUpdate.pdf"><span>PDF</span></a><a href="https://youtu.be/P5zX4DdlYOE" target="_blank" class="url">https://youtu.be/P5zX4DdlYOE</a><span>)</span>