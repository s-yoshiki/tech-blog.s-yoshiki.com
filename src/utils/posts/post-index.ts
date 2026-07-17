import type { Posts } from 'types/entry.interface';
import { getYearKey, getYearMonthKey } from './post-normalizer';

const addToGroup = (
  groups: Map<string, Posts[]>,
  key: string,
  post: Posts,
  prepend = false,
) => {
  const posts = groups.get(key) ?? [];
  prepend ? posts.unshift(post) : posts.push(post);
  groups.set(key, posts);
};

export class PostIndex {
  private readonly byPath = new Map<string, Posts>();
  private readonly byTag = new Map<string, Posts[]>();
  private readonly byYear = new Map<string, Posts[]>();
  private readonly byYearMonth = new Map<string, Posts[]>();
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

  public findByPath(path: string): Posts | undefined {
    return this.byPath.get(path);
  }

  public findByTag(tag: string): Posts[] {
    return this.byTag.get(tag) ?? [];
  }

  public findByYear(year: string | number): Posts[] {
    return this.byYear.get(String(year)) ?? [];
  }

  public findByYearMonth(
    year: string | number,
    month: string | number,
  ): Posts[] {
    const monthKey = String(Number(month)).padStart(2, '0');
    return this.byYearMonth.get(`${year}-${monthKey}`) ?? [];
  }

  public getByTag(): Map<string, Posts[]> {
    return this.byTag;
  }

  public getByYear(): Map<string, Posts[]> {
    return this.byYear;
  }

  public getByYearMonth(): Map<string, Posts[]> {
    return this.byYearMonth;
  }

  public getTagNames(): string[] {
    return [...this.tagNames];
  }

  public getOldestYear(): number {
    return this.oldestYear;
  }
}
