import { POPULAR_POST_PATHS } from './posts/popular-post-paths';
import { PostFileRepository } from './posts/post-file-repository';
import { PostIndex } from './posts/post-index';
import { getPostId, normalizePost } from './posts/post-normalizer';
import { selectRecommendedPosts } from './posts/post-selectors';
import type { IGroupByItems, IGroupByYearMonthItems, Posts } from './types/entry.interface';
import { type PostPath, type YearKey, type YearMonthKey, toYearMonthKey } from './types/primitives';

export interface PostsManagerOptions {
  basePath: string;
  postsDirectory: string;
  publicThumbnailDirectory: string;
  postSampleSize?: number;
  popularPostPaths?: readonly PostPath[];
}

export class PostsManager {
  private readonly data: Posts[];
  private readonly index: PostIndex;

  public constructor(private readonly options: PostsManagerOptions) {
    const repository = new PostFileRepository(options.postsDirectory);
    const posts = repository
      .findAll(options.postSampleSize)
      .map((post) => normalizePost(post, options));
    this.index = new PostIndex(posts);
    this.data = posts.sort((left, right) => getPostId(right) - getPostId(left));
  }

  public getData(): Posts[] {
    return this.data;
  }

  public findByPath(path: PostPath): Posts | undefined {
    return this.index.findByPath(path);
  }

  public findByTag(tag: string): Posts[] {
    return this.index.findByTag(tag);
  }

  public getAllGroupByTags(): Map<string, Posts[]> {
    return this.index.getByTag();
  }

  public getCountsGroupByTags(sort: 'desc' | 'asc' = 'desc'): IGroupByItems[] {
    const counts = this.index.getTagNames().map((name) => ({
      name,
      counts: this.findByTag(name).length,
    }));
    const direction = sort === 'asc' ? 1 : -1;
    return counts.sort((left, right) => direction * (left.counts - right.counts));
  }

  public getAllTagNames(): string[] {
    return this.index.getTagNames();
  }

  public findByYearMonth(key: YearMonthKey): Posts[] {
    return this.index.findByYearMonth(key);
  }

  public findByYear(year: YearKey): Posts[] {
    return this.index.findByYear(year);
  }

  public getCountsGroupYearMonth(): IGroupByYearMonthItems[] {
    const dates: IGroupByYearMonthItems[] = [];
    for (let year = this.getPostsStartYear(); year <= new Date().getFullYear(); year++) {
      const months = Array.from({ length: 12 }, (_, index) => index + 1)
        .map((month) => ({
          name: toYearMonthKey(year, month),
          counts: this.findByYearMonth(toYearMonthKey(year, month)).length,
        }))
        .filter(({ counts }) => counts > 0)
        .reverse();
      dates.unshift({
        name: String(year) as YearKey,
        counts: this.findByYear(String(year) as YearKey).length,
        months,
      });
    }
    return dates;
  }

  public getAllGroupByYear(): Map<YearKey, Posts[]> {
    return this.index.getByYear();
  }

  public getAllGroupByYearMonth(): Map<YearMonthKey, Posts[]> {
    return this.index.getByYearMonth();
  }

  public getPostsStartYear(): number {
    return this.index.getOldestYear();
  }

  public getPopularPosts(): Posts[] {
    const paths = this.options.popularPostPaths ?? POPULAR_POST_PATHS;
    return paths.flatMap((postPath) => this.findByPath(postPath) ?? []);
  }

  public getRecommendsPosts(tags: string[], maxCount = 12): Posts[] {
    return selectRecommendedPosts(this.data, tags, maxCount);
  }
}
