---
title: "Node.js TypeScript で OpenAI"
path: "/entry/312"
date: "2023-03-26 16:30"
coverImage: "../../../images/thumbnail/typescript-logo.png"
author: "s-yoshiki"
tags: ["node.js", "javascript", "typescript", "openai"]
---

## 概要

この記事では、Node.js と TypeScript を用いて OpenAI (ChatGPT)の API を利用してみました。

## 環境構築

まずは、必要なパッケージをインストールします。

```
npm init -y
npm install typescript @types/node ts-node
```

次に、[OpenAI](https://github.com/openai/openai-node) のパッケージをインストールします。

```
npm install openai
```

## アクセストークンの取得

https://platform.openai.com/account/api-keys

からアクセストークンを取得します。

## 試してみる

以下のコードで、世界の大きな山を順番に 5 つ出力する例を試します。

```ts
import {
  Configuration,
  OpenAIApi,
  ChatCompletionRequestMessageRoleEnum,
} from "openai";

const apiKey = `<OPENAI_API_KEY>`;

const configuration = new Configuration({
  apiKey,
});
const openai = new OpenAIApi(configuration);

const models = {
  gpt3_5: "gpt-3.5-turbo-0301",
};

const main = async () => {
  const content = "世界のなかで大きい山を順番に5個出力してください";
  const res = await openai.createChatCompletion({
    model: models.gpt3_5,
    messages: [{ role: ChatCompletionRequestMessageRoleEnum.User, content }],
  });
  console.log(res.data.choices[0].message?.content);
};

main();
```

成功すると、以下のようなレスポンスが返ってきます。

```
1. エベレスト山（ネパール・中国）
2. キリマンジャロ山（タンザニア）
3. アコンカグア山（アルゼンチン）
4. デナリ山（アメリカ・アラスカ州）
5. モンブラン山（フランス・イタリア）
```

## Stream として扱う

[Stream](https://developer.mozilla.org/ja/docs/Web/API/Streams_API) を利用して操作してみます。

ストリームを利用して処理する方法を紹介します。
この方法を使うと、すべてのデータが返されるのを待たずに、1 文字ずつリアルタイムでレスポンスを受け取ることができます。
これにより、OpenAI のチャット画面のようなスムーズな描画が実現できます。

### サンプルコード

```ts
const main = async () => {
  const content = "世界のなかで大きい山を順番に5個出力してください";
  const res = await openai.createChatCompletion(
    {
      model: models.gpt3_5,
      stream: true,
      messages: [{ role: ChatCompletionRequestMessageRoleEnum.User, content }],
    },
    { responseType: "stream" }
  );
  let result = "";
  for await (const chunk of res.data as any) {
    const lines = chunk
      .toString("utf8")
      .split("\n")
      .filter((line) => line.trim().startsWith("data: "));
    // console.log(chunk.toString("utf8")); // 1行ごとデバッグ

    for (const line of lines) {
      const message = line.replace(/^data: /, "");
      if (message === "[DONE]") {
        console.log(result);
        return result;
      }
      const json = JSON.parse(message);
      const token = json.choices[0].delta.content;
      if (token) {
        result += token;
      }
    }
  }
};

main();
```

### パースについて

Stream を用いたレスポンスの 1 レコードは次のような形式です。

```json
data: {"id":"xxxx","object":"chat.completion.chunk","created":1679809115,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":"エ"},"index":0,"finish_reason":null}]}
```

ここから 先頭の `data: `をトリミングした上で JSON デコードし、`choices[n].delta.content` を抽出します。
一番最後の行のみ`[DONE]`となっているので、これを検知したらレスポンスは終了となります。

## express を導入して バインド API を作る

Node.js の Web アプリケーションフレームワークである Express を導入し、API を作成する方法を紹介します。

まず、必要なパッケージをインストールします。

```
npm install express
npm install -D @types/express
```

### サンプルコード

サンプルコードでは、chatStream 関数を定義して、ストリームで受け取ったレスポンスを処理しています。

```ts
import {
  Configuration,
  OpenAIApi,
  ChatCompletionRequestMessageRoleEnum,
} from "openai";
import * as express from "express";
import { Readable } from "stream";
const app = express();

const apiKey = `<OPENAI_API_KEY>`;

const configuration = new Configuration({
  apiKey,
});
const openai = new OpenAIApi(configuration);

const models = {
  gpt3_5: "gpt-3.5-turbo-0301",
};

const chatStream = async (
  content: string,
  stream: Readable,
  res: express.Response
) => {
  const openaiRes = await openai.createChatCompletion(
    {
      model: models.gpt3_5,
      stream: true,
      messages: [{ role: ChatCompletionRequestMessageRoleEnum.User, content }],
    },
    { responseType: "stream" }
  );
  for await (const chunk of openaiRes.data as any) {
    const lines = chunk
      .toString("utf8")
      .split("\n")
      .filter((line) => line.trim().startsWith("data: "));
    try {
      for (const line of lines) {
        const message = line.replace(/^data: /, "");
        if (message.trim() == "[DONE]") {
          stream.push(null);
          res.end();
          return;
        }
        const json = JSON.parse(message);
        const token = json.choices[0].delta.content;
        if (token) {
          stream.push(Buffer.from(token));
          await sleep(100);
        }
      }
    } catch (err) {
      stream.push(null);
      res.end();
    }
  }
};

app.get("/", async (req, res) => {
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Transfer-Encoding", "chunked");
  const stream = new Readable({ read() {}, highWaterMark: 1 });
  stream.pipe(res);
  const q = String(req.query.q);
  chatStream(q, stream, res);
});

app.listen(8080, () => {
  console.log(`Example app listening on port 8080`)
})
```

### リクエスト例

```
http://localhost:8080/?q=世界のなかで大きい山を順番に100個出力してください
```

こんな感じでリクエストしたらレスポンスが逐次描画されます。

## おまけ: fetch の利用

fetch API を利用しても同様の実装は可能です。

```ts
const main = async (content) => {
  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: content,
          },
        ],
        model: "gpt-3.5-turbo",
        max_tokens: 2048,
        stream: true,
      }),
      signal: new AbortController().signal,
    });
    const decoder = new TextDecoder("utf8");
    if (!res.body) {
      throw new Error("error");
    }
    const reader = res.body?.getReader();
    let result = "";
    while (1) {
      const { value, done } = await reader.read();
      const lines = decoder
        .decode(value)
        .toString()
        .split("\n")
        .filter((line) => line.trim().startsWith("data: "));
      // console.log(row)
      for (const line of lines) {
        const message = line.replace(/^data: /, "");
        if (message === "[DONE]") {
          console.log(result);
          return result;
        }
        const json = JSON.parse(message);
        const token = json.choices[0].delta.content;
        if (token) {
          result += token;
        }
      }
    }
  } catch (error) {
    return error;
  }
};

main("世界のなかで大きい山を順番に5個出力してください");
```

## まとめ

この記事では、Node.js と TypeScript を用いて OpenAI の API を利用する方法を紹介しました。
環境構築から、ストリームでの処理、さらには Fetch API の利用方法まで、説明しました。

## 参考にしたサイト

- [[ChatGPT] Open AI API を Node.js x TypeScript で試してみた | DevelopersIO](https://dev.classmethod.jp/articles/tried-hello-openai-api-with-nodejs-x-typescript/)
- [node.js - Stream files in node/express to client - Stack Overflow](https://stackoverflow.com/questions/13106096/stream-files-in-node-express-to-client)
- [highWaterMarkから探るNode.jsのStreamの仕組み - Yahoo! JAPAN Tech Blog](https://techblog.yahoo.co.jp/advent-calendar-2016/node-stream-highwatermark/)