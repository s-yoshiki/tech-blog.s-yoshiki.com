import path from 'node:path';

export const postsDirectory = path.join(process.cwd(), 'content/posts');
export const publicThumbnailDirectory = path.join(
  process.cwd(),
  'public/images/thumbnail',
);
