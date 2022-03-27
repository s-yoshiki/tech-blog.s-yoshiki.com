import { NextPage, InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import { useRouter } from "next/router";
import PostsManager from 'utils/posts-manager';
import Layout from "components/layout/layout"
import PostsBand from "components/posts-band"


type Props = InferGetStaticPropsType<typeof getStaticProps>;
const perPage = 20

export const getStaticPaths = async () => {
  const posts = PostsManager.getCountsGroupYearMonth()
  const paths = []
  for (let i in posts) {
    const year = posts[i]
    paths.push({
      params: {
        year: year.name,
      }
    })
  }
  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: any) => {
  const posts = PostsManager.findByYear(
    params.year
  )
  return {
    props: {
      posts
    },
  };
};

const Home: NextPage<Props> = ({ posts }) => {
  const router = useRouter();
  const { year, month } = router.query

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
            Posts with date: 
            <span>
              # {year}
            </span>
          </div>
          <PostsBand posts={posts} />
        </div>
      </div>
    </Layout>
  )
};

export default Home;