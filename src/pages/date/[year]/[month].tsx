import Layout from 'components/layout/layout';
import PostsBand from 'components/posts-band';
import { InferGetStaticPropsType, NextPage } from 'next';
import { useRouter } from 'next/router';
import PostsManager from 'utils/posts-manager';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticPaths = async () => {
  const posts = PostsManager.getCountsGroupYearMonth();
  const paths = [];
  for (let i in posts) {
    const year = posts[i];
    for (let j in year.months) {
      paths.push({
        params: {
          year: year.name,
          month: year.months[j].name.split('-')[1],
        },
      });
    }
  }
  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: any) => {
  const posts = PostsManager.findByYearMonth(
    params.year,
    params.month,
  );
  return {
    props: {
      posts,
    },
  };
};

const Home: NextPage<Props> = ({ posts }) => {
  const router = useRouter();
  const { year, month } = router.query;

  return (
    <Layout>
      <div className='container mx-auto'>
        <div className=''>
          <div className='
            text-2xl
            text-gray-900 
            font-semibold
            p-2
            flex
          '>
            Posts with date:
            <span>
              # {`${year}-${month}`}
            </span>
          </div>
          <PostsBand posts={posts} />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
