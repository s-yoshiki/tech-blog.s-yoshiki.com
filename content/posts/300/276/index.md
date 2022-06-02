---
title: "[AWS]DataSync/Storage Gateway/Transfer Familyの比較とユースケース"
path: "/entry/276"
date: "2022-05-29 18:00"
coverImage: "../../../images/thumbnail/aws-logo.png"
author: "s-yoshiki"
tags: ["amazon-aws"]
---

## 概要

AWSのマイグレーション関連で出てくる、「DataSync」「Storage Gateway」「Transfer Family」あたりのサービスの
違いや使い分けが分からなくなってしまったため整理した際のメモです。

また、それぞれのユースケースをまとめました。


※本記事に記載している内容は2022/05時点のものです。

<!-- 
## 比較表

||DataSync|Storage Gateway|Transfer Family|Snowball|
|-|-|-|-|-|
|プロトコル|SMB/NFS|SMB|STFP/FTPS/FTP|-|
|オンプレ→AWS|SMB/NFS|SMB|STFP/FTPS/FTP|-|
|AWS→AWS|SMB/NFS|SMB|STFP/FTPS/FTP|-| 
-->

## どちらのサービスを使った方が良いか

似たような機能・サービスを比較してみました。

### AWS DataSync と rsync or aws s3 cli

- DataSyncの方が自動化・高速化されている
- AWSストレージサービスに直接統合するのでセキュア

### AWS DataSync と S3レプリケーション or S3バッチオペレーション

- 継続的なデータ配信、データパイプライン、データレイクの取り込み、複数バケットの統合 → DataSync
- 特定のバケットへのデータの継続的なレプリケーション → S3レプリケーション
- S3オブジェクトの大規模なバッチオペレーション → S3バッチオペレーション

### AWS DataSync と AWS Snowball Edge

- 厳しい帯域制限 → Snowball
- 切断された環境 → Snowball
- その他ネットワーク環境が厳しい → Snowball
- 上記以外 → DataSync

### AWS DataSync と AWS Storage Gateway

- 一度きりの移行 → DataSync
- 継続的なデータ更新 → Storage Gateway

DataSync とファイルゲートウェイを組み合わせて利用することでインフラを最小限にしつつシームレスな移行を実現できる

### AWS DataSync と Amazon S3 Transfer Acceleration

- アプリケーションが既に Amazon S3 API に統合されていて、大きなファイルを S3 に転送するために高いスループットが必要な場合 → S3 Transfer Acceleration
- 既存のストレージシステム (ネットワーク接続ストレージなど) や変更できない機器 (DNA シーケンサー、ビデオカメラなど) からデータを転送する場合や複数の転送先が必要な場合 → DataSync

### AWS Storage Gateway と AWS Transfer Family 

- 既にSFTPを利用している場合 → AWS Transfer Family 
- NFS/SMBやS3などのDataSync対応サービスの場合 → DataSync



## AWS DataSync

[AWS DataSync](https://docs.aws.amazon.com/ja_jp/datasync/latest/userguide/what-is-datasync.html)

AWSのストレージサービスとのデータ転送を高速・簡単・自動で行えるサービス。

### ユースケース

- データの迅速な移行
- データ保護
- アーカイブ
- オンプレ-AWS間のワークフローの管理

### 特徴

- プロトコル: NFS/SMB/HDFS
  - NFSに対応するので、EFSやFSxシリーズに対応する
- 移行時の除外パターンを設定できる
- 一回きりの移行だけでなく、長期運用(バックアップ取得)等にも利用可能
  - cron式で同期
- エンドツーエンドの暗号化

### 料金

0.0125USD / GB

[詳細](https://aws.amazon.com/jp/datasync/pricing/)

## AWS Transfer Family

### 特徴

S3もしくはEFSへのFTP/FTPS/SFTP接続を可能にするサービス。

### ユースケース

- ホスティングしているファイルの更新
- データレイクの転送手段
- アプリケーションでの利用等

### 特徴

- フルマネージド
- AD,LDAP,IDプロバイダなどの認証方式をサポート

### 料金

- SFTP
  - 時間料金: 0.3USD/h
  - アップロード: 0.04USD/GB
  - ダウンロード: 0.04USD/GB
- FTPS
  - 時間料金: 0.3USD/h
  - アップロード: 0.04USD/GB
  - ダウンロード: 0.04USD/GB
- SFTP
  - 時間料金: 0.3USD/h
  - アップロード: 0.04USD/GB
  - ダウンロード: 0.04USD/GB

## AWS Storage Gateway

### 特徴

分類

- 4種類のゲートウェイのタイプが存在
  - ファイルゲートウェイ
  - ボリュームゲートウェイ (2方式)
    - Gateway-Stored Volumes
    - Gateway-Cached Volumes
  - テープゲートウェイ
  - Amazon FSx ファイルゲートウェイ


分類ごとの特徴

- ファイルゲートウェイ
  - プロトコル: NFS
  - 出力先: S3
    - ライフサイクルポリシー、バージョニング、クロ
スリージョンレプリケーション等が利用可能
  - 更新データは非同期で転送
  - S3をバックエンドストレージとして利用
- ボリュームゲートウェイ
  - プロトコル: iSCSIブロックストレージ
  - 出力先: S3
  - アクセス頻度の高いデータは、キャッシュとしてローカルに保持
  - オンプレミス側のStorage Gatewayへのリストア、もしくはAWS上のEC2 Gatewayへのリストアも可能
  - Gateway-Stored
    - 更新データは非同期で転送
  - Gateway-Cached
    - アクセス頻度の高いデータは、キャッシュとしてローカルに保持
- テープゲートウェイ
  - 物理テープライブラリ(VTL)
  - 出力先: S3
- Amazon FSx ファイルゲートウェイ
  - 4種類 (2022/06時点)
  - Amazon FSx for Windows File Server
  - Amazon FSx for Lustre
  - Amazon FSx for OpenZFS
  - Amazon FSx for NetApp ONTAP



|Type|利用用途|動作環境環境|
|-|-|-|
|ファイルゲートウェイ|NFSを通してオンプレのファイルをAWSへ移行し活用|AWS/オンプレ|
|ボリュームゲートウェイ(Stored)|オンプレからAWSへのDRを目的とし、オンプレの特定ディスクボリュームを自動でAWSに複製|オンプレ|
|ボリュームゲートウェイ(Cached)|1ボリューム最大32TBが実現できるローカルキャッシュスとして利用|オンプレ/AWS|
|テープゲートウェイ|物理テープライブラリの代替として、バックアップSWと組み合わせたクラウドデータバックアップとして利用|オンプレ/AWS|

より詳細な情報は[blackbelt](https://d1.awsstatic.com/webinars/jp/pdf/services/20170125_AWS-BlackBelt-StorageGateway_20170223Update.pdf)を参照ください。


### ユースケース

- データレイクへの格納
- ファイル共有のモダナイズ
- オンプレ→AWSへバックアップ

### 料金

- S3ファイルゲートウェイ
  - リクエスト: 0.01USD/1GB + S3利用料金
  - ストレージ: S3利用料金
- FSx ファイルゲートウェイ
  - ゲートウェイ: 0.69USD/1時間
  - ストレージ: Amazon FSx利用料金
- ボリュームゲートウェイ
  - ボリュームストレージ: 0.025USD/1GB + EBSスナップショット料金
  - リクエスト:  0.01USD/1GB
- テープゲートウェイ
  - ストレージ
    - VTL: 0.025USD
    - VTL(S3 Glacier Flexible Retrieval): 0.0045USD
    - VTL(S3 Glacier Deep Archive ): 0.002USD

[詳細](https://aws.amazon.com/jp/storagegateway/pricing/)


## 参考サイト

- [AWS DataSyncでデータ移行 ～他のサービスと何が違う？～ - サーバーワークスエンジニアブログ](https://blog.serverworks.co.jp/tech/2020/02/14/lets-use-aws-data-sync/)
- [AWS DataSync のよくある質問](https://aws.amazon.com/jp/datasync/faqs/)