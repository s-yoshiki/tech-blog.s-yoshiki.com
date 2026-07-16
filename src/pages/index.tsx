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
import { ArrowDown, BookOpen } from 'lucide-react';
import { Button } from 'components/ui/button';

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
      <section className="bg-background py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col items-center">
            <div className="w-full"><SectionHeading>新着記事</SectionHeading></div>
            <div className="w-full">
              <NewPosts posts={allPosts} count={count} />
            </div>
            {count < maxPage && (
              <div className="mt-8">
                <Button
                  onClick={() => setCount(count + 1)}
                  variant="outline" size="lg"
                >
                  さらに記事を表示 <ArrowDown className="size-4" /> ({count} / {maxPage})
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="border-y bg-card py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading>よく読まれている記事</SectionHeading>
          <PostsBand posts={popular} />
        </div>
      </div>

      <div className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-1/3">
              <SectionHeading>アーカイブ</SectionHeading>
              <div className="rounded-2xl border bg-card p-6 shadow-sm">
                <YearMonthPosts items={dates} />
              </div>
            </div>
            <div className="lg:w-2/3">
              <SectionHeading>タグから探す</SectionHeading>
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

      <div className="border-t bg-card py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <SectionHeading>著者について</SectionHeading>
          <div className="rounded-2xl border bg-background p-8">
            <Author />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
