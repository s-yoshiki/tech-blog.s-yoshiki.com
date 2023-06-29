import Layout from 'components/layout/layout';
import { getWindowSize } from 'hooks/useWindowSize';

const DateFormat = ({ value }: { value: string }) => {
  return <>{value.split(' ')[0]}</>;
};

const Content = () => {
  const data = [
    {
      name: 'Google Analytics',
      bussiness: 'Google LLC',
      collection: [
        { name: 'Webサイトへのアクセス状況' },
        { name: '利用デバイスの特徴を示す情報（ブラウザの種類や OS情報など）' },
        { name: 'IPアドレス （アクセス元のロケーション）' }
      ],
      purpose: [
        { name: 'サイトへのアクセス状況の把握' }
      ],
      reference: [
        {
          name: 'プライバシーポリシー',
          link: 'https://policies.google.com/privacy'
        },
        {
          name: 'オプトアウト',
          link: 'https://tools.google.com/dlpage/gaoptout/'
        }
      ]
    },
    {
      name: 'Google Adsense',
      bussiness: 'Google LLC',
      collection: [
        { name: 'Webサイトへのアクセス状況' },
        { name: '利用デバイスの特徴を示す情報（ブラウザの種類や OS情報など）' },
        { name: 'IPアドレス （アクセス元のロケーション）' }
      ],
      purpose: [
        { name: '広告の配信' }
      ],
      reference: [
        {
          name: 'プライバシーポリシー',
          link: 'https://policies.google.com/privacy'
        },
        {
          name: 'オプトアウト',
          link: 'https://tools.google.com/dlpage/gaoptout/'
        }
      ]
    },
  ]
  return <>
    <h2>概要</h2>
    <div>
      当サイトは、サービス利用者に関する情報を収集し、外部事業者に送信しています。
      外部事業者の名称やサービス名、外部事業者に送信される利用者情報の内容、送信される情報の利用目的については、以下をご確認ください。
    </div>
    <div>
      {data.map((row, i) => {
        return (
          <div key={i}>
            <h2>{row.name}</h2>
            <div>事業者名: {row.bussiness}</div>
            <div>送信される情報:
              <ol>
                {row.collection.map((row1, j) => {
                  return (<li key={j}>{row1.name}</li>)
                })}
              </ol>
            </div>
            <div>利用目的:
              <ol>
                {row.purpose.map((row1, j) => {
                  return (<li key={j}>{row1.name}</li>)
                })}
              </ol>
            </div>
            <div>事業者情報:
              <ol>
                {row.reference.map((row1, j) => {
                  return (
                    <li key={j}>
                      <a href={row1.link}>{row1.name}</a>
                    </li>
                  )
                })}
              </ol>
            </div>
          </div>
        )
      })}
    </div>
  </>
};

const Post = () => {
  const post = {
    title: '外部送信に関する公表事項',
    date: '2023-06-20',
    coverImage: './',
  }
  return (
    <Layout
      title={post.title}
      image={post.coverImage}
      description={post.title}
      disableAdsense={true}
    >
      <div className=''>
        <div className=' mx-auto'>
          <div className='justify-center text-center'>
            <h1 className='text-3xl font-semibold' style={{ color: '#24292f' }}>
              {post.title}
            </h1>
            <div className='m-6'></div>
            <div className='m-6'>
              <span>
                <DateFormat value={post.date} />
              </span>
            </div>
            <div className='m-6'></div>
          </div>
          <div className='m-8'></div>
          <div className='
            flex
            grid 
            grid-cols-1
            sm:grid-cols-1
            md:grid-cols-5
            lg:grid-cols-9
            xl:grid-cols-9
            gap-5
            justify-end
            '>
            <div className='
              lg:col-span-2
              xl:col-span-2
              lg:visible
              xl:visible
              invisible
              flex
              lg:h-full
              xl:h-full
              h-0
            '>
            </div>
            <div className='
              grid-cols-1
              md:col-span-5
              lg:col-span-5
              xl:col-span-5'>
              <article className='markdown-body rounded-lg p-6 gap-4 shadow'>
                <section className=''>
                  <Content />
                </section>
              </article>
            </div>
            <div className='
              lg:col-span-2
              xl:col-span-2
              lg:visible
              xl:visible
              invisible
              flex
              lg:h-full
              xl:h-full
              h-0
            '>
            </div>
          </div>
          <div className='p-6'></div>
        </div>
      </div>
    </Layout>
  );
};

export default Post;
