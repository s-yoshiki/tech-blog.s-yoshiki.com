import PostsManager from 'utils/posts-manager';

export const POSTS_PER_PAGE = 20;

export const getHomePageData = () => ({
  posts: PostsManager.getData(),
  tags: PostsManager.getCountsGroupByTags().slice(0, 50),
  dates: PostsManager.getCountsGroupYearMonth(),
  popular: PostsManager.getPopularPosts().slice(0, 10),
});

export const getArticlePageData = (id: string) => {
  const post = PostsManager.findByPath(`/entry/${id}`);
  if (!post.path) return null;
  return {
    post,
    latest: PostsManager.getData().slice(0, 15),
    popular: PostsManager.getPopularPosts().slice(0, 10),
    tags: PostsManager.getCountsGroupByTags().slice(0, 50),
    dates: PostsManager.getCountsGroupYearMonth(),
    recommends: PostsManager.getRecommendsPosts(post.tags, 15).filter(
      (item) => item.path !== post.path,
    ),
  };
};

export const getTagPageData = (tag: string, page: number) => {
  const allPosts = PostsManager.findByTag(tag);
  const pageCount = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  return {
    posts: allPosts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE),
    pageCount,
  };
};

export const getTagParams = () =>
  PostsManager.getAllTagNames().flatMap((tag) => {
    const pageCount = Math.ceil(
      PostsManager.findByTag(tag).length / POSTS_PER_PAGE,
    );
    return Array.from({ length: pageCount }, (_, index) => ({
      tag,
      page: String(index + 1),
    }));
  });

export const getDateParams = () => PostsManager.getCountsGroupYearMonth();
export const getAllPostIds = () =>
  PostsManager.getData().map((post) => ({
    id: post.path.split('/').pop() as string,
  }));
