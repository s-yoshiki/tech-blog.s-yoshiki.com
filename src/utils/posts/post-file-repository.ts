import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import type { Posts } from 'types/entry.interface';

const POST_DIRECTORY_PATTERN = /^\d{4}$/;
const POST_FILENAMES = ['index.md', 'index.mdx'] as const;

const listPostFiles = (directory: string): string[] =>
  fs
    .readdirSync(directory, { withFileTypes: true })
    .filter(
      (entry) => entry.isDirectory() && POST_DIRECTORY_PATTERN.test(entry.name),
    )
    .flatMap((entry) => {
      const postDirectory = path.join(
        /* turbopackIgnore: true */ directory,
        entry.name,
      );
      const postFiles = POST_FILENAMES.map((filename) =>
        path.join(/* turbopackIgnore: true */ postDirectory, filename),
      ).filter(fs.existsSync);

      if (postFiles.length > 1) {
        throw new Error(`Multiple post documents found in ${postDirectory}`);
      }
      return postFiles;
    });

export class PostFileRepository {
  public constructor(private readonly directory: string) {}

  public findAll(): Posts[] {
    return listPostFiles(this.directory).map((filepath) => {
      const fileContents = fs.readFileSync(filepath, 'utf8');
      const { data } = matter(fileContents);
      return { ...data, filepath } as Posts;
    });
  }
}
