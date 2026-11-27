import type { PostDate, PostPath, YearKey, YearMonthKey } from './primitives';

export interface Posts {
  title: string;
  path: PostPath;
  date: PostDate;
  coverImage: string;
  tags: string[];
  aiGenerated: boolean;
  filepath: string;
}

export interface IGroupByItems<Name extends string = string> {
  name: Name;
  counts: number;
}

export interface IGroupByYearMonthItems {
  name: YearKey;
  counts: number;
  months: IGroupByItems<YearMonthKey>[];
}
