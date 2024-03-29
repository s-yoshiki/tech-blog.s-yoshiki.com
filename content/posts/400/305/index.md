---
title: "[turborepo]monorepo管理のNext.jsアプリをvercelにデプロイ"
path: "/entry/305"
date: "2023-02-23 16:40"
coverImage: "../../../images/thumbnail/react-logo.png"
author: "s-yoshiki"
tags: ["vercel", "turborepo", "next.js", "react", "typescript"]
---

## はじめに

turborepoでmonorepo構成のリポジトリのdeployを行った際の備忘録です。

## turborepo で monorepo プロジェクトの作成

まずは以下のコマンドでプロジェクトのたたき台を作成します。

```sh
npx create-turbo@latest
```

ここで、パッケージマネージャの選択を求められたので `pnpm` を選択しました。

ここからはプロジェクトにサンプルで入っている `apps/web` を利用していきます。

SSGで動作させたいので、`apps/web/packages.json`を編集し`scripts`の`build`を
`"build": "next build && next export"`として書き換えます。

`pnpm run dev` で動作することを確認した後、GitHubにリポジトリをpushします。


## vercel でホスティング

続いてvercel側を設定します。

`Add new...`から`Project`を選択します。

`Configure Project`のフォームが表示されるので、

- Framework Preset: Next.js
- Root Directory: apps/web

を設定しdeployします。

他の項目はデフォルトのままとしました。

実行時には以下のようなログが出ました。

<details>
<summary>LOG</summary>

```sh
[16:59:25.598] Running build in San Francisco, USA (West) – sfo1
[16:59:25.648] Cloning github.com/xxx/yyy (Branch: main, Commit: 6a13db3)
[16:59:25.787] Previous build cache not available
[16:59:26.275] Cloning completed: 626.631ms
[16:59:26.433] Running "vercel build"
[16:59:26.871] Vercel CLI 28.16.5
[16:59:26.999] > Automatically detected Turbo monorepo manager. Attempting to assign default settings.
[16:59:27.149] Detected `pnpm-lock.yaml` generated by pnpm 7...
[16:59:27.153] Running "install" command: `pnpm install`...
[16:59:27.690] Scope: all 5 workspace projects
[16:59:27.762] ../..                                    | Progress: resolved 1, reused 0, downloaded 0, added 0
[16:59:27.832] ../..                                    | +315 ++++++++++++++++++++++++++++++++
[16:59:28.291] Packages are hard linked from the content-addressable store to the virtual store.
[16:59:28.291]   Content-addressable store is at: /vercel/.local/share/pnpm/store/v3
[16:59:28.291]   Virtual store is at:             ../../node_modules/.pnpm
[16:59:28.763] ../..                                    | Progress: resolved 315, reused 0, downloaded 45, added 40
[16:59:29.767] ../..                                    | Progress: resolved 315, reused 0, downloaded 94, added 90
[16:59:30.767] ../..                                    | Progress: resolved 315, reused 0, downloaded 198, added 193
[16:59:31.771] ../..                                    | Progress: resolved 315, reused 0, downloaded 286, added 283
[16:59:32.772] ../..                                    | Progress: resolved 315, reused 0, downloaded 310, added 310
[16:59:33.771] ../..                                    | Progress: resolved 315, reused 0, downloaded 311, added 310
[16:59:34.772] ../..                                    | Progress: resolved 315, reused 0, downloaded 313, added 313
[16:59:35.773] ../..                                    | Progress: resolved 315, reused 0, downloaded 315, added 314
[16:59:36.019] .../.pnpm/turbo@1.8.2/node_modules/turbo postinstall$ node install.js
[16:59:36.110] .../.pnpm/turbo@1.8.2/node_modules/turbo postinstall: Done
[16:59:36.600] 
[16:59:36.601] dependencies:
[16:59:36.601] + next 13.1.6
[16:59:36.601] + react 18.2.0
[16:59:36.601] + react-dom 18.2.0
[16:59:36.601] + ui 0.0.0 <- ../../packages/ui
[16:59:36.601] 
[16:59:36.601] devDependencies:
[16:59:36.601] + @babel/core 7.21.0
[16:59:36.601] + @types/node 17.0.45
[16:59:36.601] + @types/react 18.0.28
[16:59:36.602] + @types/react-dom 18.0.11
[16:59:36.602] + eslint 7.32.0
[16:59:36.602] + eslint-config-custom 0.0.0 <- ../../packages/eslint-config-custom
[16:59:36.602] + tsconfig 0.0.0 <- ../../packages/tsconfig
[16:59:36.602] + typescript 4.9.5
[16:59:36.602] 
[16:59:36.603] Done in 9.3s
[16:59:36.773] ../..                                    | Progress: resolved 315, reused 0, downloaded 315, added 315, done
[16:59:36.797] Detected Next.js version: 13.1.6
[16:59:36.805] Running "cd ../.. && npx turbo run build --filter={apps/web}..."
[16:59:37.322] • Packages in scope: eslint-config-custom, tsconfig, ui, web
[16:59:37.323] • Running build in 4 packages
[16:59:37.323] • Remote caching enabled
[16:59:38.842] web:build: cache miss, executing 38d9dde94c84d82d
[16:59:39.348] web:build: 
[16:59:39.348] web:build: > web@0.0.0 build /vercel/path0/apps/web
[16:59:39.348] web:build: > next build && next export
[16:59:39.348] web:build: 
[16:59:39.790] web:build: Attention: Next.js now collects completely anonymous telemetry regarding usage.
[16:59:39.790] web:build: This information is used to shape Next.js' roadmap and prioritize features.
[16:59:39.790] web:build: You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:
[16:59:39.791] web:build: https://nextjs.org/telemetry
[16:59:39.791] web:build: 
[16:59:39.918] web:build: info  - Linting and checking validity of types...
[16:59:42.186] web:build: info  - Creating an optimized production build...
[16:59:45.425] web:build: info  - Compiled successfully
[16:59:45.425] web:build: info  - Collecting page data...
[16:59:50.900] web:build: info  - Generating static pages (0/3)
[16:59:51.021] web:build: info  - Generating static pages (3/3)
[16:59:51.029] web:build: info  - Finalizing page optimization...
[16:59:51.032] web:build: 
[16:59:51.050] web:build: Route (pages)                              Size     First Load JS
[16:59:51.051] web:build: ┌ ○ /                                      300 B          73.3 kB
[16:59:51.051] web:build: └ ○ /404                                   182 B          73.1 kB
[16:59:51.051] web:build: + First Load JS shared by all              73 kB
[16:59:51.051] web:build:   ├ chunks/framework-ffffd4e8198d9762.js   45.2 kB
[16:59:51.051] web:build:   ├ chunks/main-3e44f43bb68ee85d.js        26.8 kB
[16:59:51.051] web:build:   ├ chunks/pages/_app-19bba4e42c888aa2.js  196 B
[16:59:51.051] web:build:   └ chunks/webpack-4e7214a60fad8e88.js     712 B
[16:59:51.051] web:build: 
[16:59:51.051] web:build: ○  (Static)  automatically rendered as static HTML (uses no initial props)
[16:59:51.051] web:build: 
[16:59:51.674] web:build: info  - using build directory: /vercel/path0/apps/web/.next
[16:59:51.677] web:build: info  - Copying "static build" directory
[16:59:51.680] web:build: info  - No "exportPathMap" found in "/vercel/path0/apps/web/next.config.js". Generating map from "./pages"
[16:59:51.681] web:build: info  - Launching 3 workers
[16:59:51.682] web:build: info  - Exporting (0/3)
[16:59:51.909] web:build: info  - Exporting (3/3)
[16:59:51.916] web:build: Export successful. Files written to /vercel/path0/apps/web/out
[16:59:51.931] 
[16:59:51.931]  Tasks:    1 successful, 1 total
[16:59:51.931] Cached:    0 cached, 1 total
[16:59:51.931]   Time:    14.701s 
[16:59:51.931] 
[16:59:52.890] Notice: detected `next export`, this de-opts some Next.js features
[16:59:52.890] See more info: https://nextjs.org/docs/advanced-features/static-html-export
[16:59:52.916] Build Completed in /vercel/output [26s]
[16:59:53.711] Generated build outputs:
[16:59:53.712]  - Static files: 13
[16:59:53.712]  - Prerenders: 0
[16:59:53.712]  - Serverless Functions: 0
[16:59:53.712]  - Edge Functions: 0
[16:59:53.712] Deployed outputs in 1s
[16:59:54.130] Build completed. Populating build cache...
[17:00:00.051] Uploading build cache [78.04 MB]...
[17:00:01.775] Build cache uploaded: 1.724s
```

</details>

この後、deployが実行された旨のメッセージが表示されたら成功です。
