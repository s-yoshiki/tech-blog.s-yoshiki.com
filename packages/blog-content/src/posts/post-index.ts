import type { Posts } from '../types/entry.interface';
import { getYearKey, getYearMonthKey, type YearKey, type YearMonthKey } from '../types/primitives';
import type { PostPath } from '../types/primitives';

const addToGroup = <Key extends string>(
  groups: Map<Key, Posts[]>,
  key: Key,
  post: Posts,
  prepend = false,
) => {
  const posts = groups.get(key) ?? [];
  if (prepend) {
    posts.unshift(post);
  } else {
    posts.push(post);
  }
  groups.set(key, posts);
};

export class PostIndex {
  private readonly byPath = new Map<PostPath, Posts>();
  private readonly byTag = new Map<string, Posts[]>();
  private readonly byYear = new Map<YearKey, Posts[]>();
  private readonly byYearMonth = new Map<YearMonthKey, Posts[]>();
  private readonly tagNames = new Set<string>();
  private oldestYear = new Date().getFullYear();

  public constructor(posts: Posts[]) {
    for (const post of posts) {
      this.byPath.set(post.path, post);
      this.indexTags(post);
      this.indexDate(post);
    }
  }

  private indexTags(post: Posts): void {
    for (const tag of post.tags) {
      this.tagNames.add(tag);
      addToGroup(this.byTag, tag, post, true);
    }
  }

  private indexDate(post: Posts): void {
    const year = getYearKey(post.date);
    addToGroup(this.byYear, year, post);
    addToGroup(this.byYearMonth, getYearMonthKey(post.date), post);
    this.oldestYear = Math.min(this.oldestYear, Number(year));
  }

  public findByPath(path: PostPath): Posts | undefined {
    return this.byPath.get(path);
  }

  public findByTag(tag: string): Posts[] {
    return this.byTag.get(tag) ?? [];
  }

  public findByYear(year: YearKey): Posts[] {
    return this.byYear.get(year) ?? [];
  }

  public findByYearMonth(key: YearMonthKey): Posts[] {
    return this.byYearMonth.get(key) ?? [];
  }

  public getByTag(): Map<string, Posts[]> {
    return this.byTag;
  }

  public getByYear(): Map<YearKey, Posts[]> {
    return this.byYear;
  }

  public getByYearMonth(): Map<YearMonthKey, Posts[]> {
    return this.byYearMonth;
  }

  public getTagNames(): string[] {
    return [...this.tagNames];
  }

  public getOldestYear(): number {
    return this.oldestYear;
  }
}
