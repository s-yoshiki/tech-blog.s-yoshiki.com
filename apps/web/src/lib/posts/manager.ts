import { PostsManager } from '@repo/blog-content';
import { publicRuntimeConfig } from 'config/site-config';
import { postsDirectory, publicThumbnailDirectory } from './paths';

const DEVELOPMENT_POST_SAMPLE_SIZE = 20;

const postsManager = new PostsManager({
  basePath: publicRuntimeConfig.basePath,
  postsDirectory,
  publicThumbnailDirectory,
  postSampleSize: process.env.NODE_ENV === 'development' ? DEVELOPMENT_POST_SAMPLE_SIZE : undefined,
});

export { postsDirectory, publicThumbnailDirectory };
export default postsManager;
