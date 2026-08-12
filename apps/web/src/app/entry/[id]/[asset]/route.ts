import fs from 'node:fs';
import { findPostAsset, getAllPostAssets } from 'utils/posts/post-assets';

export const dynamic = 'force-static';
export const dynamicParams = false;

export const generateStaticParams = () =>
  getAllPostAssets().map(({ asset, id }) => ({ asset, id }));

type Context = {
  params: Promise<{ asset: string; id: string }>;
};

export async function GET(_request: Request, { params }: Context) {
  const { asset, id } = await params;
  const postAsset = findPostAsset(id, asset);
  if (!postAsset) return new Response(null, { status: 404 });

  const contents = fs.readFileSync(postAsset.filepath);
  return new Response(new Uint8Array(contents), {
    headers: {
      'Content-Length': String(contents.byteLength),
      'Content-Type': postAsset.contentType,
    },
  });
}
