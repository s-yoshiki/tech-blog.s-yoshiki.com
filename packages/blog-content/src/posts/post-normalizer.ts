import fs from 'node:fs';
import path from 'node:path';
import type { Posts } from '../types/entry.interface';

const THUMBNAIL_DIR = 'images/thumbnail';
const FALLBACK_THUMBNAIL = 'no-image.png';

export interface PostNormalizationOptions {
  basePath: string;
  publicThumbnailDirectory: string;
}

/**
 * Front matter points at a repository-relative path; the served asset lives in
 * `public/images/thumbnail`. A handful of posts reference files that were never
 * committed, so the existence check happens here at build time rather than via
 * an `onError` handler in the browser (which would force every card to ship as
 * a client component).
 */
const resolveCoverImage = (
  coverImage: string,
  options: PostNormalizationOptions,
): string => {
  const filename = path.basename(coverImage);
  const exists =
    filename !== '' &&
    fs.existsSync(path.join(options.publicThumbnailDirectory, filename));
  const basePath = options.basePath.replace(/\/$/, '');
  return `${basePath}/${THUMBNAIL_DIR}/${
    exists ? filename : FALLBACK_THUMBNAIL
  }`;
};

export const normalizePost = (
  post: Posts,
  options: PostNormalizationOptions,
): Posts => ({
  ...post,
  coverImage: resolveCoverImage(post.coverImage, options),
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
