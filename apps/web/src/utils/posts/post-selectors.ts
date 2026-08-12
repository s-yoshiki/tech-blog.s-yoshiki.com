import type { Posts } from 'types/entry.interface';

interface ScoredPost {
  post: Posts;
  score: number;
}

export const selectRecommendedPosts = (
  posts: Posts[],
  tags: string[],
  maxCount: number,
): Posts[] => {
  const scoredPosts: ScoredPost[] = posts.flatMap((post) => {
    const score = tags.filter((tag) => post.tags.includes(tag)).length;
    return score > 0 ? [{ post, score }] : [];
  });

  return scoredPosts
    .sort((left, right) => right.score - left.score)
    .slice(0, maxCount)
    .map(({ post }) => post);
};
