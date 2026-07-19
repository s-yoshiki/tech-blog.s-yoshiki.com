import path from 'node:path';
import type {
  IGroupByItems,
  IGroupByYearMonthItems,
  Posts,
} from 'types/entry.interface';
import { POPULAR_POST_PATHS } from './posts/popular-post-paths';
import { PostFileRepository } from './posts/post-file-repository';
import { PostIndex } from './posts/post-index';
import { getPostId, normalizePost } from './posts/post-normalizer';
import { selectRecommendedPosts } from './posts/post-selectors';

const EMPTY_POST: Posts = {
  title: '',
  path: '',
  date: '',
  coverImage: '',
  tags: [],
  filepath: '',
};

export class PostsManager {
  private readonly data: Posts[];
  private readonly index: PostIndex;

  public constructor(repository: PostFileRepository) {
    const posts = repository.findAll().map(normalizePost);
    this.index = new PostIndex(posts);
    this.data = posts.sort((left, right) => getPostId(right) - getPostId(left));
  }

  public getData(): Posts[] {
    return this.data;
  }

  public findByPath(path: string): Posts {
    return this.index.findByPath(path) ?? { ...EMPTY_POST };
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
    return counts.sort(
      (left, right) => direction * (left.counts - right.counts),
    );
  }

  public getAllTagNames(): string[] {
    return this.index.getTagNames();
  }

  public findByYearMonth(
    year: string | number,
    month: string | number,
  ): Posts[] {
    return this.index.findByYearMonth(year, month);
  }

  public findByYear(year: string | number): Posts[] {
    return this.index.findByYear(year);
  }

  public getCountsGroupYearMonth(): IGroupByYearMonthItems[] {
    const dates: IGroupByYearMonthItems[] = [];
    for (
      let year = this.getPostsStartYear();
      year <= new Date().getFullYear();
      year++
    ) {
      const months = Array.from({ length: 12 }, (_, index) => index + 1)
        .map((month) => ({
          name: `${year}-${String(month).padStart(2, '0')}`,
          counts: this.findByYearMonth(year, month).length,
        }))
        .filter(({ counts }) => counts > 0)
        .reverse();
      dates.unshift({
        name: String(year),
        counts: this.findByYear(year).length,
        months,
      });
    }
    return dates;
  }

  public getAllGroupByYear(): Map<string, Posts[]> {
    return this.index.getByYear();
  }

  public getAllGroupByYearMonth(): Map<string, Posts[]> {
    return this.index.getByYearMonth();
  }

  public getPostsStartYear(): number {
    return this.index.getOldestYear();
  }

  public getPopularPosts(): Posts[] {
    return POPULAR_POST_PATHS.map((postPath) => this.findByPath(postPath));
  }

  public getRecommendsPosts(tags: string[], maxCount = 12): Posts[] {
    return selectRecommendedPosts(this.data, tags, maxCount);
  }
}

const postsDirectory = path.join(process.cwd(), 'content/posts');
const postsManager = new PostsManager(new PostFileRepository(postsDirectory));

export default postsManager;
