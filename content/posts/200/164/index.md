---
title: "AWS BlackBeltを写経する EC2編"
path: "/entry/164"
date: "2019-12-21 19:26:39"
coverImage: "../../../images/thumbnail/aws-logo.png"
author: "s-yoshiki"
tags: ["amazon-aws","ec2","awsソリューションアーキテクト"]
---

## 概要

**AWSサービス別資料**

<a href="https://aws.amazon.com/jp/aws-jp-introduction/aws-jp-webinar-service-cut/">https://aws.amazon.com/jp/aws-jp-introduction/aws-jp-webinar-service-cut/</a>

## 問われやすいサービス

<!-- wp:heading {"level":3} -->

### EC2

<!-- wp:list -->
<ul>
    <li>EC2とは?<ul>
            <li>1時間または秒単位の従量課金で利用可能なAWSクラウド上の仮想サーバー</li>
            <li>追加・削除、マシンスペック変更も数分で可能</li>
            <li>20のリージョンにある61のアベイラビリティーゾーン(AZ)で運用</li>
            <li>プロセッサとアーキテクチャ<ul>
                    <li>Intel(x86_64 arch)、 AMD(x86_64 arch0)、 AWS Graviton Processor(64-bit Arm arch)</li>
                </ul>
            </li>
        </ul>
    </li>
    <li>インスタンスタイプ<ul>
            <li>命名規則: c5d.xlarge == ${インスタンスファミリー}${世代}${機能}.${インスタンスサイズ}<ul>
                    <li>インスタンスファミリー[必須]: メモリ・I/O・CPUクロック・GPU・汎用性などの種別<ul>
                            <li>汎用:<ul>
                                    <li>A, T: 開発環境, Web,</li>
                                    <li>M: DB、キャッシュサーバ</li>
                                </ul>
                            </li>
                            <li>コンピューティング最適化:<ul>
                                    <li>C: バッチ、動画像処理、エンコーディング</li>
                                </ul>
                            </li>
                            <li>ストレージ最適化:<ul>
                                    <li>H: BigData、分散型ファイルシステム</li>
                                    <li>I: NoSQLデータベース </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li>世代[必須]: 数字が大きい方が新しい</li>
                    <li>機能[任意]: インスタンスストア付加、ネットワーク強化、メモリ強化、等</li>
                </ul>
            </li>
            <li>EC2 Bare Metal: ハードウェアへのダイレクトアクセスを提供する</li>
            <li>バースト: 負荷に応じて高いレベルまでCPU性能がバーストする機能<ul>
                    <li>T2, T3のみ</li>
                </ul>
            </li>
        </ul>
    </li>
    <li>通信とセキュリティ<ul>
            <li>キーペア: AWSは公開鍵のみを保持、秘密鍵はユーザが管理</li>
            <li>セキュリティグループ: ファイアウォール機能のこと<ul>
                    <li>デフォルトでは全トラフィックが閉じている</li>
                    <li>必要な通信のみ定義する: TCP/UDP、ポート、アクセス元IP</li>
                </ul>
            </li>
            <li>IPの種類 (VPCを利用した場合)<ul>
                    <li>Private IP: <ul>
                            <li>必ず割り当てられる</li>
                            <li>起動/停止した時 IPは変わらない</li>
                        </ul>
                    </li>
                    <li>Public IP<ul>
                            <li>ランダムに割り当てられる</li>
                            <li>起動/停止した時 IPは変わる</li>
                        </ul>
                    </li>
                    <li>Elastic IP<ul>
                            <li>静的なIP</li>
                            <li>起動/停止した時 IPは変わらない</li>
                            <li>アタッチしたインスタンスを起動していない場合、課金発生</li>
                        </ul>
                    </li>
                </ul>
            </li>
            <li>ENI: ネットワークインタフェース<ul>
                    <li>紐つけ対象: Private IP、Elastic IP、MACアドレス、セキュリティグループ</li>
                    <li>インスタンスによって割り当て可能な数が異なる</li>
                </ul>
            </li>
            <li>拡張ネットワーキング<ul>
                    <li>ixgbevf (Intel 82599VF)</li>
                    <li>ENA (Elastic Network Adapter)</li>
                </ul>
            </li>
        </ul>
    </li>
    <li>ストレージ:<ul>
            <li>インスタンスストア<ul>
                    <li>概要: ホストコンピュータに内蔵されたディスク</li>
                    <li>性能・容量はインスタンスタイプごとに規定</li>
                    <li>費用: 無料</li>
                    <li>Stop/Terminateするとクリアされる</li>
                </ul>
            </li>
            <li>EBS<ul>
                    <li>ネットワークで接続</li>
                    <li>EC2インスタンスとは独立管理</li>
                    <li>Snapshotを取得しS3に保存可能</li>
                    <li>費用: 発生</li>
                    <li>Stop/Terminateしてもクリアされない</li>
                    <li>EBS最適化オプション: 通常のネットワークとは別にEBS専用帯域を確保する<ul>
                            <li>起動時に有効/無効を選択可</li>
                            <li>帯域はインスタンスサイズによって異なる</li>
                            <li>インスタンスタイプによってはデフォルトで有効</li>
                        </ul>
                    </li>
                </ul>
            </li>
        </ul>
    </li>
    <li>AMI: OSイメージ<ul>
            <li>自作可能</li>
            <li>カスタムAMIを元に何台でもインスタンス作成可能</li>
            <li>別リージョンへのコピーも可能</li>
            <li>AMIの分類<ul>
                    <li>アーキテクチャ: x86 or Arm</li>
                    <li>ビット: 32 or 64</li>
                    <li>仮装方式: PV(非推奨) or HVM</li>
                    <li>ブートストレージ: EBS Backed or Instance Store-Baked(S3 Baked)</li>
                </ul>
            </li>
            <li>AMIを探す: コミュニティAMI、マーケットプレイス</li>
        </ul>
    </li>
    <li>プレイスメントグループ: EC2インスタンスの物理的な配置オプション<ul>
            <li>クラスタ<ul>
                    <li>インスタンスを密な場所に配置 => ネットワークパフォーマンスを最適化</li>
                    <li>単一アベイラビリティゾーン</li>
                </ul>
            </li>
            <li>スプレッド<ul>
                    <li>インスタンスを別々のハードウェアに分散して配置 => 障害リスク軽減</li>
                    <li>複数AZへの配置可能かつ最大7つ</li>
                </ul>
            </li>
            <li>パーティション<ul>
                    <li>論理的な区切り(パーティション)に配置 + パーティションが異なるインスタンスを同一のハードウェアを共有しないように分散してインスタンスを配置 => 障害をパーティション単位に抑制</li>
                </ul>
            </li>
        </ul>
    </li>
    <li>ライフサイクル<ul>
            <li>Running(実行中): 課金される、Stopped・Terminatedに遷移</li>
            <li>Stopped(停止中): 課金されない、Runningに遷移</li>
            <li>Terminated(削除済み): Running・Stoppedのどれにも遷移しない</li>
        </ul>
    </li>
    <li>費用<ul>
            <li>オンデマンド: 初期費用なし、従量課金</li>
            <li>リザーブド: 1年間または3年間、常に利用可能なキャパシティ予約により、最大75%の割引<ul>
                    <li>スケジュールされたリザーブドインスタンス: 指定した時間帯のみのキャパシティ予約により、5%-10%の割引</li>
                </ul>
            </li>
            <li>スポット: 使用キャパシティを時価で提供、最大90%の割引</li>
        </ul>
    </li>
    <li>その他キーワード:<ul>
            <li>ユーザデータ: 起動時にスクリプト実行を行う機能</li>
            <li>インスタンスメタデータ: 自インスタンスに関するデータを取得するための方法</li>
            <li>起動テンプレート: EC2起動時に設定すべき項目をテンプレート化</li>
        </ul>
    </li>
</ul>
<!-- /wp:list -->

**Amazon EC2 (2019/03/05)** 

<a href="https://www.slideshare.net/AmazonWebServicesJapan/20190305-aws-black-belt-online-seminar-amazon-ec2">Slideshare</a> 

<a href="https://d1.awsstatic.com/webinars/jp/pdf/services/20190305_AWS-Blackbelt-EC2.pdf">PDF</a> 

<a href="https://youtu.be/P5zX4DdlYOE">YouTube</a>
