import Author from 'components/author';
import Badge from 'components/badge';
import Layout from 'components/layout/layout';
import PostsBand from 'components/posts-band';
import Search from 'components/search';
import YearMonthPosts from 'components/yesar-month-posts';
import SectionHeading from 'components/section-heading';
import { search as searchEventHandler } from 'lib/inner-search';
import { InferGetStaticPropsType, NextPage } from 'next';
import Link from 'next/link';
import React, { useState } from 'react';
import { Posts } from 'types/entry.interface';
import PostsManager from 'utils/posts-manager';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const postsPerPage = 15;

export const getStaticProps = async () => {
  const allPosts = PostsManager.getData();
  const tags = PostsManager.getCountsGroupByTags().slice(0, 50);
  const dates = PostsManager.getCountsGroupYearMonth();
  const popular = PostsManager.getPopularPosts().slice(0, 10);
  return {
    props: { allPosts, tags, dates, popular },
  };
};

const NewPosts = ({ posts, count }: { posts: Posts[]; count: number }) => {
  const postBands = [];
  for (let i = 0; i < count; i++) {
    postBands.push(
      <div key={i} className="mb-12">
        <PostsBand
          posts={posts.slice(postsPerPage * i, postsPerPage * (i + 1))}
        />
      </div>,
    );
  }
  return <>{postBands}</>;
};

const Home: NextPage<Props> = ({ allPosts, tags, dates, popular }) => {
  const maxPage = Math.ceil(allPosts.length / postsPerPage);
  const [count, _setCount] = useState(1);
  const setCount = (num: number) => {
    if (num <= maxPage) {
      _setCount(num);
    }
  };
  return (
    <Layout>
      <div className="py-12 bg-white border-b border-slate-100">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto mb-10">
            <Search onClick={searchEventHandler} />
          </div>
          <div className="flex flex-col items-center">
            <SectionHeading>New Posts</SectionHeading>
            <div className="w-full">
              <NewPosts posts={allPosts} count={count} />
            </div>
            {count < maxPage && (
              <div className="mt-8">
                <button
                  onClick={() => setCount(count + 1)}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                >
                  Load More Articles ({count} / {maxPage})
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <SectionHeading>Popular Topics</SectionHeading>
          <PostsBand posts={popular} />
        </div>
      </div>

      <div className="py-16 bg-white border-y border-slate-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-1/3">
              <SectionHeading>Archive</SectionHeading>
              <div className="bg-slate-50 rounded-xl p-6">
                <YearMonthPosts items={dates} />
              </div>
            </div>
            <div className="lg:w-2/3">
              <SectionHeading>Explore Tags</SectionHeading>
              <div className="flex flex-wrap gap-2">
                {tags.map((el, idx) => {
                  return (
                    <Link href={`/tags/${el.name}/1`} passHref key={idx}>
                      <div className="flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1.5 hover:bg-slate-200 transition-colors border border-slate-200">
                        <Badge keyword={el.name} className="h-4" />
                        <span className="text-xs font-semibold text-slate-600">{el.counts}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <SectionHeading>Author</SectionHeading>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
            <Author />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
