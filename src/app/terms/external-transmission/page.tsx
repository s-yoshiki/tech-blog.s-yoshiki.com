import type { Metadata } from 'next';

export const metadata: Metadata = { title: '外部送信に関する公表事項' };

const services = [
  { name: 'Google Analytics', purpose: 'サイトへのアクセス状況の把握' },
  { name: 'Google Adsense', purpose: '広告の配信' },
];
const collected = [
  'Webサイトへのアクセス状況',
  '利用デバイスの特徴を示す情報（ブラウザの種類やOS情報など）',
  'IPアドレス（アクセス元のロケーション）',
];

export default function Page() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <header className="border-border border-b pb-8">
        <h1 className="font-bold text-2xl tracking-tight sm:text-3xl">
          外部送信に関する公表事項
        </h1>
        <time
          dateTime="2023-06-20"
          className="mt-3 block text-muted-foreground text-sm"
        >
          2023-06-20
        </time>
      </header>
      <div className="markdown-body">
        <h2>概要</h2>
        <p>
          当サイトは、サービス利用者に関する情報を収集し、外部事業者に送信しています。送信内容と利用目的は以下の通りです。
        </p>
        {services.map((service) => (
          <section key={service.name}>
            <h2>{service.name}</h2>
            <p>
              <strong>事業者名:</strong> Google LLC
            </p>
            <h3>送信される情報</h3>
            <ol>
              {collected.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
            <h3>利用目的</h3>
            <p>{service.purpose}</p>
            <h3>事業者情報</h3>
            <ul>
              <li>
                <a href="https://policies.google.com/privacy">
                  プライバシーポリシー
                </a>
              </li>
              <li>
                <a href="https://tools.google.com/dlpage/gaoptout/">
                  オプトアウト
                </a>
              </li>
            </ul>
          </section>
        ))}
      </div>
    </article>
  );
}
