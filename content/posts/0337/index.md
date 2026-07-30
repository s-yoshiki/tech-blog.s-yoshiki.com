---
title: "BE/FEも全てTypeScriptを選択するときの最近の技術選定"
path: "/entry/337"
date: "2026-07-31 12:00"
coverImage: "../../../images/thumbnail/typescipr-logo.png"
author: "s-yoshiki"
tags: ["typescript", "react", "hono", "monorepo", "pnpm", "turborepo", "amazon-aws"]
---

## 概要

小規模なWebサービスで、フロントエンド（FE）とバックエンド（BE）の両方をTypeScriptで
構築するときの技術選定を整理します。

共通部分は
[s-yoshiki/ex-foundry.com](https://github.com/s-yoshiki/ex-foundry.com)、
静的配信は
[s-yoshiki/maker.ex-foundry.com](https://github.com/s-yoshiki/maker.ex-foundry.com)、
SSRは
[s-yoshiki/npb-analysis](https://github.com/s-yoshiki/npb-analysis)
の構成を参照します。同じTypeScript monorepoでも、実行時要件に合わせてホスティング方式は
分けています。

この記事の結論は「すべてを共有する」ではありません。言語と開発体験は揃えつつ、FEとBEの
実装は分離し、共有する価値がある契約・UI・設定だけをworkspace packageへ出します。

## 想定するプロジェクト

次のような条件を想定しています。

- 開発者が少人数で、FE/BEをまたいで作業する
- Web UIとJSON APIがある
- TypeScriptの型検査を設計上の安全網として使いたい
- サービスごとの自由度を残しながら、コマンドと品質基準は揃えたい
- S3 + CloudFront、またはLambda + CloudFrontへAWS CDKでデプロイしたい

大規模組織、CPU負荷の高い処理、データ分析基盤、複雑な分散トランザクションでは、別言語や
別リポジトリの方が適する場合があります。

## 採用した技術スタック

| レイヤー | 選択 |
| --- | --- |
| Runtime / Package Manager | Node.js、pnpm workspaces |
| Monorepo task | Turborepo |
| Language | TypeScript（strict） |
| Frontend | React、Vite、React Router |
| UI | Tailwind CSS、shadcn/ui |
| Backend | Hono |
| Schema / Validation | zod |
| Lint / Format | Biome |
| Test | Vitest、Testing Library |
| Infrastructure | AWS CDK |
| Hosting | S3 + CloudFront（SSG/CSR）またはLambda + CloudFront（SSR） |
| CI/CD | GitHub Actions、GitHub OIDC |

バージョン番号は更新されるため、導入時はリポジトリの`package.json`とlockfileを確認して
ください。重要なのは個々のバージョンより、境界と依存方向を決めていることです。

## pnpm workspaceとTurborepo

リポジトリは次の単位に分けます。

```text
.
├── apps/
│   ├── web/                  # Vite + React
│   └── api/                  # Hono（local / Lambda）
├── packages/
│   ├── api-contract/         # API routeとzodスキーマ
│   └── ui/                   # 共有UI primitive
├── configs/
│   ├── biome/
│   ├── tailwind-config/
│   └── tsconfig/
├── scripts/
│   ├── create-feature/
│   └── infra/                # AWS CDK
└── docs/decisions/           # ADR
```

pnpm workspacesはpackage間の依存を明示し、Turborepoは`build`、`test`、`typecheck`の依存順と
キャッシュを管理します。ルートでは次のコマンドだけ覚えれば全体を検証できます。

```sh
pnpm check
pnpm typecheck
pnpm test
pnpm build
```

monorepoの目的は「何でも共有すること」ではなく、変更を1つのPull Requestで検証し、同じ
コマンドで再現できることです。

## 依存方向を固定する

`ex-foundry.com`では次の向きを基本にしています。

```text
apps/web ──▶ packages/ui ──▶ configs/tailwind-config
    │
    ├──────▶ packages/api-contract ◀────── apps/api
    │
    └──────▶ configs/tsconfig ◀───────────── apps/api
```

ルールは単純です。

- appからpackageをimportしてよい
- packageからappをimportしない
- appから別のappを直接importしない
- UI packageへ業務ロジックやAPI通信を置かない
- 1か所でしか使わない抽象化を、先回りして共有packageにしない

この規則により、WebとAPIは単独でデプロイでき、共有packageはどちらの実装詳細にも
引っ張られません。

## FEはReact＋Vite＋React Router

静的なWebアプリケーションやSPAでは、Viteの構成が小さく、ビルド結果も理解しやすい点を
評価しています。React Routerのframework modeなら、同じルート構成をSSG/CSRとSSRの
どちらにも展開できます。

ただし「将来SSRにするかもしれない」という理由だけでLambdaを常設しません。既知URLの
prerenderで要件を満たせるならS3へ静的ファイルとして配信し、リクエストごとのデータ取得や
サーバー専用処理が必要になった段階でSSRを選びます。

画面はfeature単位に分割します。

```text
src/features/<feature>/
├── components/
├── hooks/
├── functions/
└── types/
```

`functions`を可能な限りReactから独立させると、DOM環境なしで境界値をテストできます。
ルーティングもadapterへ閉じ込め、画面やfeatureがReact Router固有APIへ直接依存しすぎない
ようにします。

## BEはHono

Honoは小さなAPIをNode.jsローカルサーバーとAWS Lambdaの両方で動かしやすく、Web標準の
Request/Responseに近いAPIを持ちます。

```ts
export const app = new Hono()
  .get("/health", (context) => context.json({ status: "ok" }))
  .notFound((context) =>
    context.json(
      { error: { code: "not_found", message: "Route not found." } },
      404,
    ),
  );
```

小規模なうちはroute、validation、error handlerを近くに置き、規模が増えたらhandlerから
domain logicを分離します。最初から多層アーキテクチャを作るより、境界を保ちながら必要な
複雑さだけを追加します。

## FE/BEでAPIコントラクトを共有する

TypeScriptだけでは、ネットワーク越しのJSONが型どおりであることを保証できません。
そこで`packages/api-contract`へzodスキーマとroute定義を置きます。

```ts
export const healthResponseSchema = z.object({
  status: z.literal("ok"),
});

export type HealthResponse = z.infer<typeof healthResponseSchema>;
```

サーバーは同じスキーマで入力を検証し、クライアントはレスポンスを再検証します。

```ts
const parsed = healthResponseSchema.safeParse(await response.json());

if (!parsed.success) {
  return {
    status: "error",
    message: "APIの応答が共有スキーマと一致しません。",
  };
}
```

同じmonorepoでも、デプロイ済みAPIとブラウザのバージョンが常に一致するとは限りません。
「同じ型をimportできるから安全」ではなく、ネットワークを信頼境界として扱います。

## Tailwind CSSとshadcn/ui

共有UIは完成品の巨大コンポーネント集ではなく、Button、Input、Cardのようなprimitiveに
限定します。shadcn/uiはコードを所有できるため、アクセシビリティやデザイントークンを
プロジェクト要件に合わせて変更できます。

ブランド固有画面や業務ロジックまで共有すると、変更理由の異なるapp同士が結合します。
共有するのは見た目の基礎と振る舞いの契約までにします。

## BiomeとVitestでツールを揃える

FEとBEでformatter、linter、test runnerを分けると、設定・CI・エディタ体験も分かれます。
この構成ではBiomeとVitestへ統一しています。

| 対象 | テストの重点 |
| --- | --- |
| 純粋関数 | 分岐、境界値、変換結果 |
| React component | roleやlabelから見たユーザー操作 |
| API | 正常系、不正入力、404、情報漏えい |
| API contract | 受理する値と拒否する値 |
| CDK | 合成したCloudFormation template |

カバレッジ率を目標にするより、信頼境界と失敗時の分岐が未テストになっていないかを見る方が
有効です。

## ホスティングは2つの構成から選ぶ

AWSでのWeb配信は、まず次の2択として考えます。

| 判断軸 | S3 + CloudFront | Lambda + CloudFront |
| --- | --- | --- |
| レンダリング | ビルド時のSSG + ブラウザのCSR | リクエストごとのSSR + hydration |
| 向いている処理 | ブラウザで完結するツール、既知URL、公開コンテンツ | 認証、個別HTML、サーバーデータ参照、動的meta |
| オリジン | 非公開S3 bucket | Lambda Function URL |
| HTML生成コスト | ビルド時だけ | リクエストごと |
| 運用対象 | S3、CloudFront、CDK | 左記に加えてLambda、ログ、cold start |
| キャッシュ | 静的assetを長く保持しやすい | HTMLとassetでcache policyを分ける |

「TypeScriptで統一する」ことと「常にNode.js serverを動かす」ことは別です。実行時サーバーが
不要ならS3、必要ならLambdaという順で選ぶと、構成と費用を小さく保てます。

## SSG/CSR: S3 + CloudFront

`maker.ex-foundry.com`では、React Routerの既知ルートをビルド時にprerenderし、
`apps/web/build/client`をS3へ配置しています。

```text
Browser
   │ HTTPS
   ▼
CloudFront
   │ Origin Access Control
   ▼
private S3 bucket
   └── React Router prerender / Vite assets
```

React Routerの設定では、公開するURLを`prerender`へ列挙します。サーバービルドはHTML生成時に
だけ使い、デプロイ先では実行しません。

```ts
export default {
  prerender: ["/", ...tools.map((tool) => `/tools/${tool.slug}`)],
  ssr: true,
} satisfies Config;
```

CDK側の要点は次のとおりです。

- S3 bucketを非公開にし、CloudFrontのOrigin Access Control経由だけで読む
- CloudFront Functionで`/path`や`/path/`を`/path/index.html`へ変換する
- 未知のURLは`index.html`へfallbackし、クライアントルーターでNot Foundを表示する
- `BucketDeployment`でbuild成果物を同期し、更新したパスをinvalidateする
- ACM証明書はCloudFrontの要件に合わせて`us-east-1`で管理する
- Route 53のA/AAAA AliasをCloudFrontへ向ける

全ルートをprerenderできるならSSG、ログイン後の画面などHTMLを事前生成しない部分はCSRとして
同じ静的配信へ載せられます。ただし403/404を一律200でfallbackする構成では、存在しないURLの
HTTP statusが200になるため、公開コンテンツのSEO要件がある場合は既知ルートのprerenderを
優先します。

## SSR: Lambda + CloudFront

`npb-analysis`では、React Routerの`loader`がサーバー側でSQLiteを読み、リクエストごとに
HTMLを生成するためSSRを選んでいます。

```text
Browser
   │
   ▼
CloudFront
   ├── /assets/* ──▶ SSR Lambda（長期cache）
   ├── /api/* ─────▶ Hono API Lambda
   └── other ──────▶ SSR Lambda（cache無効）
                         └── bundled SQLite
```

Webのproduction bundleはコンテナimageへ格納し、Lambda Web Adapterで通常のNode.js HTTP
serverをLambda上で動かします。既存の`react-router-serve`を大きく書き換えずに利用できる一方、
image build、cold start、メモリ、タイムアウト、ログ保持期間を運用する必要があります。

公開オリジンとしてLambda Function URLを使う場合も、URL自体を匿名公開しません。
IAM認証を有効にし、CloudFrontのOrigin Access Controlとdistribution ARNに限定した
invoke permissionでCloudFront経由だけを許可します。

CloudFrontでは用途ごとにbehaviorを分けます。

- HTMLを返すdefault behaviorは、ユーザーごとの応答が混ざらないようcacheを無効化する
- hash付きの`assets/*`は`CACHING_OPTIMIZED`で長く配信する
- `api/*`を別のHono Lambdaへ向ければ、ブラウザからは同一originの相対URLで呼べる
- originへviewerの`Host`をそのまま渡さず、Function URL向けのorigin request policyを使う
- HTTPS redirectとsecurity headersをCloudFrontで統一する

SSRだから常にWebからAPIをHTTPで呼ぶ必要はありません。`npb-analysis`のloaderは共有domain
packageを直接呼び、同じbundle内のSQLiteへアクセスします。一方、外部向け検索APIはHono Lambda
として`/api/*`へ分けています。内部処理と公開APIを同じ関数へ無理にまとめない設計です。

## SSG/CSRとSSRの選択フロー

次の順に判断すると過剰な構成を避けられます。

1. 公開URLをビルド時に列挙でき、処理がブラウザ内で完結するならSSG
2. HTMLは共通で、ログイン後にAPIから取得すればよいならCSR
3. リクエストごとにHTML、meta、認可結果を変える必要があるならSSR
4. 重いAPI処理だけが必要なら、WebはS3のまま`/api/*`だけLambda
5. SSRが必要でも、静的assetはCloudFrontで積極的にcacheする

APIがあることだけを理由にWebまでSSRへ寄せる必要はありません。S3 + CloudFrontのWebと
Hono Lambdaを同じdistributionのbehaviorで束ねる構成も選択できます。

## AWS CDKとCI/CD

どちらの構成もAWS CDKで`dev`と`prd`を別stackとして合成し、環境名、domain、region、
removal policyを設定として注入します。既定環境を設けず、`-c env=dev`のような明示指定が
ない場合は失敗させると、本番への誤デプロイを防げます。

GitHub Actionsでは次の順に検証します。

```text
install → check → typecheck → test → build → cdk synth → deploy → smoke test
```

AWS認証はGitHub OIDCで環境別IAM roleを引き受け、長期アクセスキーを置きません。本番は
GitHub Environmentの承認や手動実行を挟み、デプロイ後にトップページとhealth endpointを
確認します。

小規模プロジェクトでは同一AWSアカウントに環境を共存させる判断もありますが、IAM上の強い
分離ではありません。扱うデータや人数が増えたら、環境ごとのAWSアカウント分離を再検討
すべきです。

## ADRで「なぜ」を残す

ライブラリ名だけを記録しても、半年後には「なぜ採用したか」が分からなくなります。
`docs/decisions`へ次の項目を残します。

- 背景と制約
- 採用した決定
- 理由
- 検討した代替案
- 引き受けるトレードオフ
- 再検討する条件

判断を変更するときは古いADRを削除せず、新しいADRから置き換えます。技術選定を固定する
ためではなく、変更できる状態を保つための記録です。

## この構成を選ばないケース

- React Server ComponentsやNext.js固有の機能が必要: Next.jsを検討
- 重い数値計算や機械学習が中心: Python、Rust、Go等を適材適所で利用
- 複雑なdomainと大規模チーム: BEを独立リポジトリ・サービスへ分離
- モバイルを含む多数のクライアント: OpenAPI等の言語非依存契約も検討
- 強い環境分離が必要: AWSアカウントをdev/prdで分離

FE/BEをTypeScriptへ統一することは目的ではなく、少人数で変更を安全に届けるための手段です。
チームの経験、運用要件、障害時の切り分けまで含めて選びます。

## まとめ

最近のTypeScript統一構成では、次の点が特に重要だと考えています。

1. pnpm workspaceとTurborepoでコマンドと依存順を揃える
2. app同士を直接依存させず、共有契約をpackageへ置く
3. TypeScriptの型だけでなくzodで実行時にも検証する
4. FE/BEでBiomeとVitestを統一する
5. framework固有コードを境界へ閉じ込める
6. WebはまずS3 + CloudFrontを検討し、実行時サーバーが必要ならLambda + CloudFrontを選ぶ
7. ADRに採用理由と再検討条件を残す

実装例と各判断の詳細は、次のリポジトリを参照してください。

- [s-yoshiki/ex-foundry.com](https://github.com/s-yoshiki/ex-foundry.com):
  monorepo、API contract、共通設定の基準
- [s-yoshiki/maker.ex-foundry.com](https://github.com/s-yoshiki/maker.ex-foundry.com):
  React Router SSG、S3 + CloudFront、CloudFront Function
- [s-yoshiki/npb-analysis](https://github.com/s-yoshiki/npb-analysis):
  React Router SSR、Lambda Web Adapter、CloudFront behavior、Hono API
