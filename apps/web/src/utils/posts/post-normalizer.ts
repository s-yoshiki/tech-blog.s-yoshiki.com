import fs from 'node:fs';
import path from 'node:path';
import { publicRuntimeConfig } from 'config/site-config';
import type { Posts } from 'types/entry.interface';

const THUMBNAIL_DIR = 'images/thumbnail';
const FALLBACK_THUMBNAIL = 'no-image.png';

const publicThumbnailDir = path.join(process.cwd(), 'public', THUMBNAIL_DIR);

/**
 * Front matter points at a repository-relative path; the served asset lives in
 * `public/images/thumbnail`. A handful of posts reference files that were never
 * committed, so the existence check happens here at build time rather than via
 * an `onError` handler in the browser (which would force every card to ship as
 * a client component).
 */
const resolveCoverImage = (coverImage: string): string => {
  const filename = path.basename(coverImage);
  const exists =
    filename !== '' && fs.existsSync(path.join(publicThumbnailDir, filename));
  return `${publicRuntimeConfig.basePath}/${THUMBNAIL_DIR}/${
    exists ? filename : FALLBACK_THUMBNAIL
  }`;
};

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
