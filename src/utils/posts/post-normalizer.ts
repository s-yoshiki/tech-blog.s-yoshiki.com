import path from 'node:path';
import { publicRuntimeConfig } from 'config/site-config';
import type { Posts } from 'types/entry.interface';

const resolveCoverImage = (coverImage: string): string =>
  `${publicRuntimeConfig.basePath}/images/thumbnail/${path.basename(coverImage)}`;

export const normalizePost = (post: Posts): Posts => ({
  ...post,
  coverImage: resolveCoverImage(post.coverImage),
  tags: [...new Set(post.tags)],
});

export const getPostId = (post: Posts): number =>
  Number(post.path.split('/').pop());

export const getYearKey = (date: string): string =>
  String(new Date(date).getFullYear());

export const getYearMonthKey = (date: string): string => {
  const value = new Date(date);
  return `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, '0')}`;
};
