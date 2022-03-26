import { NextPage, InferGetStaticPropsType } from 'next';
import PostsManager from 'utils/posts-manager';
import Layout from "components/layout"
import PostsBand from "components/posts-band"
import Search from 'components/search'
import { search as searchEventHandler } from 'lib/inner-search'
import Badge from 'components/badge';
import Author from 'components/author';
import Link from "next/link"
import YearMonthPosts from 'components/yesar-month-posts';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps = async () => {
  const allPosts = PostsManager.getData().slice(0, 15)
  const tags = PostsManager.getCountsGroupByTags().slice(0, 50)
  const dates = PostsManager.getCountsGroupYearMonth()
  const popular = PostsManager.getPopularPosts().slice(0, 10)
  return {
    props: { allPosts, tags, dates, popular },
  };
};

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

const Home: NextPage<Props> = ({ allPosts, tags, dates, popular }) => {
  return (
    <Layout>
      <div>
        <div className='p-6'></div>
        <div className='container mx-auto'>
          <div>
            <Search onClick={searchEventHandler} />
          </div>
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
    </Layout>
  )
};

export default Home;