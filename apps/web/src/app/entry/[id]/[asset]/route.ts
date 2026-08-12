import fs from 'node:fs';
import { findPostAsset, getAllPostAssets } from '@repo/blog-content';
import { postsDirectory } from 'lib/posts/paths';

export const dynamic = 'force-static';
export const dynamicParams = false;

export const generateStaticParams = () =>
  getAllPostAssets(postsDirectory).map(({ asset, id }) => ({ asset, id }));

type Context = {
  params: Promise<{ asset: string; id: string }>;
};

export async function GET(_request: Request, { params }: Context) {
  const { asset, id } = await params;
  const postAsset = findPostAsset(id, asset, postsDirectory);
  if (!postAsset) return new Response(null, { status: 404 });

  const contents = fs.readFileSync(postAsset.filepath);
  return new Response(new Uint8Array(contents), {
    headers: {
      'Content-Length': String(contents.byteLength),
      'Content-Type': postAsset.contentType,
    },
  });
}
