import { type PostPath, splitYearMonth, type YearKey, type YearMonthKey } from '@repo/blog-content';

/**
 * Every internal URL is built here so path shapes and encoding live in one
 * place. All pages use `trailingSlash`, hence the trailing `/`.
 */
export const routes = {
  home: '/',
  post: (path: PostPath) => `${path}/` as const,
  tagBase: (tag: string) => `/tags/${encodeURIComponent(tag)}` as const,
  tag: (tag: string, page = 1) => `${routes.tagBase(tag)}/${page}/` as const,
  year: (year: YearKey) => `/date/${year}/` as const,
  month: (key: YearMonthKey) => {
    const { year, month } = splitYearMonth(key);
    return `/date/${year}/${month}/` as const;
  },
} as const;
