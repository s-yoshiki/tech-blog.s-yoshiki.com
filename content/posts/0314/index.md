---
title: "ChatGPT API でレスポンスをJSONとして受け取る"
path: "/entry/314"
date: "2023-06-18 16:30"
coverImage: "../../../images/thumbnail/chatgpt-logo.png"
author: "s-yoshiki"
tags: ["chatgpt", "openai", "node.js", "javascript"]
---

## 概要

ChatGPT の API について、レスポンスをJSONで受け取る方法を思いついたので記載します。

## 課題

ChatGPT を組み込んだアプリケーションの開発でレスポンスをJSONで受け取りパースさせるために、
次のようなプロンプトを作成していました。

```
地理に関する雑学の4択問題を作成してください。
出力形式は下記のようなJSONで出力してください。

--- 出力例:開始 ---
{
 "question": "日本で一番大きい山は？", // 問題文
 "choices":[{ // 選択肢
  "text": "高尾山"
}, {
  "text": "富士山"
}, {
  "text": "阿蘇山"
},{
  "text": "浅間山"
 }],
}
--- 出力例:終了 ---
```

この方式でもある程度生成はできていたのですが、

- JSONのパラメータが勝手に置き換えられていた
- JSONの中にコメントが入っていた
- カンマがなかった

これらの事象が度々発生しJSONのパースに失敗することが時々発生していました。

体感でChatGPT v3 で 20%〜10%、 v4 で 5%くらいの確率で発生していたような気がしました。

## JSON形式での出力

[ChatGPTのAPIに関数呼び出し機能が追加 - PC Watch](https://pc.watch.impress.co.jp/docs/news/1508734.html)

そんな中 2023/06/14に追加された`function call`機能が追加され
これを活用して、ほとんど失敗せずJSONのパースができるようになりました。

具体的な方法としては、
`function call` には引数を定義する仕組みがあり、JSONのスキーマを定義することができますが、
これを出力に利用してしまうという本来の目的から逸れた方法ではありますが、JSONでの出力を実現することができました。

サンプルコードは以下となります。

**ソース**

```ts
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";

const apiKey = `<OPEN_AI_API_KEY>`;
const configuration = new Configuration({
  apiKey,
});
const openai = new OpenAIApi(configuration);

const main = async () => {
  const res = await openai.createChatCompletion({
    // model: "gpt-4-0613",
    model: "gpt-3.5-turbo-0613",
    messages: [
      {
        role: "user",
        content: "地理の雑学に関する4択問題を作成してください",
      },
    ],
    functions: [
      {
        name: "createQuestion",
        description: "4択問題を作成する",
        parameters: {
          type: "object",
          properties: {
            question: {
              type: "string",
              description: "問題の本文",
            },
            choices: {
              type: "array",
              description: "問題の選択肢。選択肢は4つ存在する。正しい解答は1つのみ存在する。",
              uniqueItems: true,
              items: {
                type: "object",
                properties: {
                  text: {
                    type: 'string',
                    description: "問題の選択肢の文",
                  },
                  isCorrect: {
                    type: 'boolean',
                    description: "正答の場合 true, 不正の場合 false, trueは1つだけ存在する",
                  }
                }
              },
              minItems: 4,
              maxItems: 4,
            },
          },
          required: ["question", "choices"],
        },
      },
    ],
  });

  const message = res.data.choices[0].message;
  console.log("message", message);
};

main();
```

**出力**

```js
message {
  role: 'assistant',
  content: null,
  function_call: {
    name: 'createQuestion',
    arguments: '{\n' +
      '  "question": "アフリカ大陸で最も高い山は次のうちどれ？",\n' +
      '  "choices": [\n' +
      '    {\n' +
      '      "text": "エベレスト",\n' +
      '      "isCorrect": false\n' +
      '    },\n' +
      '    {\n' +
      '      "text": "キリマンジャロ",\n' +
      '      "isCorrect": true\n' +
      '    },\n' +
      '    {\n' +
      '      "text": "コンゴ山",\n' +
      '      "isCorrect": false\n' +
      '    },\n' +
      '    {\n' +
      '      "text": "アルプス山脈",\n' +
      '      "isCorrect": false\n' +
      '    }\n' +
      '  ]\n' +
      '}'
  }
}
```

**JSONパース後**

```js
{
  question: 'アフリカ大陸で最も高い山は次のうちどれ？',
  choices: [
    { text: 'エベレスト', isCorrect: false },
    { text: 'キリマンジャロ', isCorrect: true },
    { text: 'コンゴ山', isCorrect: false },
    { text: 'アルプス山脈', isCorrect: false }
  ]
}
```

問題なくパースすることができました。