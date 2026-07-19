import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import type { Posts } from 'types/entry.interface';

const listFiles = (directory: string): string[] =>
  fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const filepath = path.join(directory, entry.name);
    return entry.isFile() ? [filepath] : listFiles(filepath);
  });

export class PostFileRepository {
  public constructor(private readonly directory: string) {}

  public findAll(): Posts[] {
    return listFiles(this.directory)
      .filter((filepath) => filepath.endsWith(`${path.sep}index.md`))
      .map((filepath) => {
        const fileContents = fs.readFileSync(filepath, 'utf8');
        const { data } = matter(fileContents);
        return { ...data, filepath } as Posts;
      });
  }
}
