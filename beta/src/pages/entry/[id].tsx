import { NextPage, InferGetStaticPropsType } from 'next';
import PostsManager from 'utils/posts-manager';
import markdownToHtml from 'utils/md';
import Layout from 'components/layout/layout'
import Badge from 'components/badge';
import { search as searchEventHandler } from 'lib/inner-search'
import Search from 'components/search'
import PostsBand from "components/posts-band"
import Link from "next/link"
import YearMonthPosts from 'components/yesar-month-posts';
import Author from 'components/author';
import SidebarAds from 'components/ads/sidebar-ads';
import RelationAds from 'components/ads/relations-ads'

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticPaths = async () => {
  const posts = PostsManager.getData()
  const result = {
    paths: posts.map((post: any) => {
      return {
        params: {
          id: post.path.split('/').pop(),
        },
      };
    }),
    fallback: false,
  };
  return result
};

export const getStaticProps = async ({ params }: any) => {
  const allPosts = PostsManager.getData().slice(0, 15)
  const tags = PostsManager.getCountsGroupByTags().slice(0, 50)
  const dates = PostsManager.getCountsGroupYearMonth()
  const popular = PostsManager.getPopularPosts().slice(0, 10)
  const post = PostsManager.findByPath(`/entry/${params.id}`)
  const contentObj = await markdownToHtml({
    filepath: post.filepath,
    baseImagePath: post.path,
  });
  const recommends = PostsManager.getRecommendsPosts(post.tags, 15)
  return {
    props: {
      post: {
        ...post,
        content: contentObj.html,
        toc: contentObj.toc,
      },
      allPosts,
      popular,
      tags,
      dates,
      recommends,
    },
  };
};

const DateFormat = ({ value }: { value: string }) => {
  return (
    <>{value.split(' ')[0]}</>
  )
}

const EstimatedReading = ({ value }: { value: string }) => {
  const min = Math.ceil(value.length / 2000)
  return (
    <span>{min} min read</span>
  )
}

const MiddleHeadding = ({ children }: { children: string }) => {
  return (
    <div className='
      text-3xl
      text-gray-900 
      font-bold
      p-2
    '>{children}</div>
  )
}



const Post: NextPage<Props> = ({ post, allPosts, tags, dates, popular, recommends }) => {
  return (
    <Layout
      title={post.title}
      image={post.coverImage}
      description={post.title}
    >
      <div className="">
        <div className=" mx-auto">
          <div className="justify-center text-center">
            <div className='p-6 text-7xl flex justify-center'>
              <img
                className='rounded-lg'
                alt={post.title}
                src={post.coverImage}
                width={580}
                height={300}
                style={{ objectFit: 'cover' }}
              />
            </div>
            <h1 className="text-3xl font-semibold" style={{ color: "#24292f" }}>{post.title}</h1>
            <div className='m-6'></div>
            <div className='m-6'>
              <span>
                <DateFormat value={post.date} />
              </span>
              <span className="ml-6">
                <EstimatedReading value={post.content} />
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
            md:grid-cols-3
            lg:grid-cols-9
            xl:grid-cols-9
            gap-5
            justify-end
            '
          >
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
              <div className='w-full'>
                <div className='sticky top-0'>
                  <div className='container justify-center mx-auto  markdown-body rounded-lg shadow p-4'>
                    <h3>Tags</h3>
                    <div className='flex flex-wrap'>
                      {post.tags?.map((tag: string, idx: number) => (
                        <a href={`/tags/${tag}/1`} key={idx}>
                          <Badge keyword={tag} />
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className='pt-6 h-96 h-fit'>
                    <SidebarAds />
                  </div>
                </div>
              </div>
            </div>
            <div className='
              grid-cols-3
              md:col-span-5
              lg:col-span-5
              xl:col-span-5'>
              <article className='markdown-body rounded-lg p-6 gap-4 shadow'>
                <section className=''>
                  <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
                </section>
              </article>
              <div className='pt-6'>
                <RelationAds />
              </div>
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
              <div className='w-full'>
                <div className='sticky top-0'>
                  <div className='container justify-center mx-auto  markdown-body rounded-lg shadow p-4'>
                    <h3>目次</h3>
                    <div className='flex flex-wrap'>
                      <ol>
                        {post.toc?.map((toc: string, idx: number) => (
                          <li key={idx}>
                            <a href={`#${toc}`} >
                              {toc}
                            </a>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                  <div className='pt-6 h-96 h-fit'>
                    <SidebarAds />
                  </div>
                </div>
              </div>

            </div>
          </div>
          <div className='p-6'>
          </div>
        </div>

        <div className="bg-white">
          <div className='p-6'></div>
          <div className='container mx-auto'>
            <div>
              <Search onClick={searchEventHandler} />
            </div>
            <MiddleHeadding>Recommends</MiddleHeadding>
            <PostsBand posts={recommends} />
          </div>
          <div className='p-8'></div>
        </div>
        <div>
          <div className='p-6'></div>
          <div className='container mx-auto'>
            <MiddleHeadding>New Posts</MiddleHeadding>
            <PostsBand posts={allPosts} />
          </div>
          <div className='p-8'></div>
        </div>
        <div className='bg-white'>
          <div className='p-8'></div>
          <div className='container mx-auto bg-white'>
            <MiddleHeadding>Hot posts!</MiddleHeadding>
            <PostsBand posts={popular} />
          </div>
          <div className='p-8'></div>
        </div>
        <div className=''>
          <div className='p-8'></div>
          <div className='container mx-auto'>
            <div className='flex flex-wrap flex-row'>
              <div className='w-1/3'>
                <MiddleHeadding>Date</MiddleHeadding>
                <YearMonthPosts items={dates} />
              </div>
              <div className='w-2/3'>
                <MiddleHeadding>Tags</MiddleHeadding>
                <div className='flex flex-wrap'>
                  {tags.map((el, idx) => {
                    return (
                      <Link href={`/tags/${el.name}/1`} passHref key={idx}>
                        <div className='flex rounded-lg bg-slate-300 m-1 p-1'>
                          <Badge keyword={el.name} />
                          ({el.counts})
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className='p-8'></div>
        </div>
        <div className="bg-white">
          <div className='p-8'></div>
          <div className='container mx-auto'>
            <MiddleHeadding>Author</MiddleHeadding>
            <Author />
          </div>
          <div className='p-8'></div>
        </div>
      </div>
    </Layout>
  )
}


export default Post;