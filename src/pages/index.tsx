import Author from 'components/author';
import Badge from 'components/badge';
import Layout from 'components/layout/layout';
import PostsBand from 'components/posts-band';
import Search from 'components/search';
import YearMonthPosts from 'components/yesar-month-posts';
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

const MiddleHeadding = ({ children }: { children: string }) => {
  return (
    <div
      className="
      text-3xl
      text-gray-900 
      font-bold
      p-2
    "
    >
      {children}
    </div>
  );
};

const NewPosts = ({ posts, count }: { posts: Posts[]; count: number }) => {
  const text = [];
  for (let i = 0; i < count; i++) {
    text.push(
      <PostsBand
        posts={posts.slice(postsPerPage * i, postsPerPage * (i + 1))}
      />,
    );
  }
  return (
    <>
      {text.map((e, idx) => {
        return (
          <div key={idx}>
            {e}
            <div className="p-8"></div>
          </div>
        );
      })}
    </>
  );
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
      <div>
        <div className="p-6"></div>
        <div className="container mx-auto">
          <div>
            <Search onClick={searchEventHandler} />
          </div>
          <MiddleHeadding>New Posts</MiddleHeadding>
          <NewPosts posts={allPosts} count={count} />
          <div className="flex justify-center p-8">
            <div>
              <button
                onClick={() => setCount(count + 1)}
                className="bg-blue-500 w-96 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
              >
                Show more... {count} / {maxPage}
              </button>
            </div>
          </div>
        </div>
        <div className="p-8"></div>
      </div>
      <div className="bg-white">
        <div className="p-8"></div>
        <div className="container mx-auto bg-white">
          <MiddleHeadding>Hot posts!</MiddleHeadding>
          <PostsBand posts={popular} />
        </div>
        <div className="p-8"></div>
      </div>
      <div className="">
        <div className="p-8"></div>
        <div className="container mx-auto">
          <div className="flex flex-wrap flex-row">
            <div className="w-1/3">
              <MiddleHeadding>Date</MiddleHeadding>
              <YearMonthPosts items={dates} />
            </div>
            <div className="w-2/3">
              <MiddleHeadding>Tags</MiddleHeadding>
              <div className="flex flex-wrap">
                {tags.map((el, idx) => {
                  return (
                    <Link href={`/tags/${el.name}/1`} passHref key={idx}>
                      <div className="flex rounded-lg bg-slate-300 m-1 p-1">
                        <Badge keyword={el.name} />({el.counts})
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="p-8"></div>
      </div>
      <div className="bg-white">
        <div className="p-8"></div>
        <div className="container mx-auto">
          <MiddleHeadding>Author</MiddleHeadding>
          <Author />
        </div>
        <div className="p-8"></div>
      </div>
    </Layout>
  );
};

export default Home;
