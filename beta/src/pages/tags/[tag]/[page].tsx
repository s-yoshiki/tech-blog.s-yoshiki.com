import { NextPage, InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import { useRouter } from "next/router";
import PostsManager from '../../../utils/posts-manager';
import Layout from "components/layout"
import PostsBand from "components/posts-band"
import Badge from "components/badge"


type Props = InferGetStaticPropsType<typeof getStaticProps>;
const perPage = 20

export const getStaticPaths = async () => {
  const allPosts = PostsManager.getAllGroupByTags()
  const perPagePosts = []
  for (let key of PostsManager.getAllTagNames()) {
    const posts = allPosts.get(key)
    if (!posts) continue
    for (let i = 1; i <= Math.ceil(posts.length / perPage); i++) {
      perPagePosts.push({
        params: {
          tag: key,
          page: String(i),
        }
      })
    }
  }
  return {
    paths: perPagePosts,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: any) => {
  const allPosts = PostsManager.findByTag(params.tag)
  const pageIdx = params.page
  const pageMax = Math.ceil(allPosts.length / perPage)
  let posts: any = []
  if (pageIdx <= pageMax) {
    posts = allPosts.slice(
      (pageIdx - 1) * perPage,
      pageIdx * perPage
    )
  }
  return {
    props: {
      pageMax,
      posts
    },
  };
};

const PageIndex = ({ basePath, pageIdx, pageMax }: { basePath: string, pageIdx: number, pageMax: number }) => {
  let prev = <></>
  let next = <></>
  if (pageIdx > 1) {
    prev = (
      <Link href={`${basePath}/${pageIdx - 1}`} passHref>
        <button className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
          Prev
        </button>
      </Link>
    )
  }
  if (pageIdx < pageMax) {
    next = (
      <Link href={`${basePath}/${pageIdx + 1}`} passHref>
        <button className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
          Next
        </button>
      </Link>
    )
  }
  return (
    <div className='flex flex-wrap p-2'>
      <div className='w-20'>
        {prev}
      </div>
      <div className='m-2 w-20 text-center font-semibold'>{pageIdx} / {pageMax}</div>
      <div className='w-20'>
        {next}
      </div>
    </div>
  )
}

const Home: NextPage<Props> = ({ posts, pageMax }) => {
  const router = useRouter();
  const { tag, page } = router.query

  return (
    <Layout>
      <div className='container mx-auto'>
        <div className="">
          <div className='
            text-2xl
            text-gray-900 
            font-semibold
            p-2
            flex
          '>
            Posts with tag: <Badge classNmae="m-2" keyword={String(tag)} />
          </div>
          <div className='flex justify-center m-2'>
            <PageIndex
              basePath={`/tags/${tag}/1`}
              pageIdx={Number(page)}
              pageMax={pageMax}
            />
          </div>
          <PostsBand posts={posts} />
          <div className='flex justify-center m-2'>
            <PageIndex
              basePath={`/tags/${tag}/1`}
              pageIdx={Number(page)}
              pageMax={pageMax}
            />
          </div>
        </div>
      </div>
    </Layout>
  )
};

export default Home;