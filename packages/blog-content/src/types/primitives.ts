/**
 * Domain primitives. Each is a template-literal type over `string`, so values
 * stay ordinary strings at runtime but cannot be mixed up at compile time.
 * Strings from the outside world (front matter, route params) enter through
 * the `parse*` functions, which validate and narrow them.
 */

/** `/entry/303` */
export type PostPath = `/entry/${number}`;
/** `2024-05-01` */
export type DateString = `${number}-${number}-${number}`;
/** Front-matter date: either a plain day or a day with a time (`2024-05-01 19:30:34`). */
export type PostDate = DateString | `${DateString} ${string}`;
/** `2024` */
export type YearKey = `${number}`;
/** `2024-05` */
export type YearMonthKey = `${YearKey}-${number}`;

const POST_PATH = /^\/entry\/\d+$/;
const POST_DATE = /^\d{4}-\d{2}-\d{2}(?: .+)?$/;
const YEAR = /^\d{4}$/;
const MONTH = /^(?:0[1-9]|1[0-2])$/;

export const isPostPath = (value: string): value is PostPath => POST_PATH.test(value);
export const isPostDate = (value: string): value is PostDate => POST_DATE.test(value);

/** `303` → `/entry/303`; `undefined` when `id` is not a numeric post id. */
export const parsePostPath = (id: string): PostPath | undefined => {
  const path = `/entry/${id}`;
  return isPostPath(path) ? path : undefined;
};

export const parseYear = (value: string): YearKey | undefined =>
  YEAR.test(value) ? (value as YearKey) : undefined;

/** Validates route params such as `("2024", "05")`. */
export const parseYearMonth = (year: string, month: string): YearMonthKey | undefined =>
  YEAR.test(year) && MONTH.test(month) ? (`${year}-${month}` as YearMonthKey) : undefined;

export const toYearMonthKey = (year: number, month: number): YearMonthKey =>
  `${year}-${String(month).padStart(2, '0')}` as YearMonthKey;

/** The numeric id of a post, e.g. `/entry/303` → `303`. */
export const getPostIdFromPath = (path: PostPath): number => Number(path.slice('/entry/'.length));

/** Drops the time part: `2024-05-01 19:30:34` → `2024-05-01`. */
export const toDateString = (date: PostDate): DateString => date.slice(0, 10) as DateString;

export const getYearKey = (date: PostDate): YearKey => date.slice(0, 4) as YearKey;

export const getYearMonthKey = (date: PostDate): YearMonthKey => date.slice(0, 7) as YearMonthKey;

export const splitYearMonth = (key: YearMonthKey): { year: YearKey; month: string } => ({
  year: key.slice(0, 4) as YearKey,
  month: key.slice(5),
});
