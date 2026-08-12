import fs from 'node:fs';
import path from 'node:path';

const POSTS_DIRECTORY = path.join(process.cwd(), 'content/posts');
const POST_DIRECTORY_PATTERN = /^\d{4}$/;
const POST_DOCUMENT_PATTERN = /^index\.mdx?$/;

const CONTENT_TYPES: Readonly<Record<string, string>> = {
  '.avif': 'image/avif',
  '.gif': 'image/gif',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
};

export interface PostAsset {
  asset: string;
  contentType: string;
  filepath: string;
  id: string;
}

export const getAllPostAssets = (): PostAsset[] =>
  fs
    .readdirSync(POSTS_DIRECTORY, { withFileTypes: true })
    .filter(
      (entry) => entry.isDirectory() && POST_DIRECTORY_PATTERN.test(entry.name),
    )
    .flatMap((directory) => {
      const postDirectory = path.join(POSTS_DIRECTORY, directory.name);
      return fs
        .readdirSync(postDirectory, { withFileTypes: true })
        .filter(
          (entry) => entry.isFile() && !POST_DOCUMENT_PATTERN.test(entry.name),
        )
        .flatMap((entry) => {
          const extension = path.extname(entry.name).toLowerCase();
          const contentType = CONTENT_TYPES[extension];
          if (!contentType) return [];
          return [
            {
              asset: entry.name,
              contentType,
              filepath: path.join(postDirectory, entry.name),
              id: String(Number(directory.name)),
            },
          ];
        });
    });

export const findPostAsset = (
  id: string,
  asset: string,
): PostAsset | undefined =>
  getAllPostAssets().find((item) => item.id === id && item.asset === asset);
