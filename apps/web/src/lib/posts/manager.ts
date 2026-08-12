import { PostsManager } from '@repo/blog-content';
import { publicRuntimeConfig } from 'config/site-config';
import { postsDirectory, publicThumbnailDirectory } from './paths';

const postsManager = new PostsManager({
  basePath: publicRuntimeConfig.basePath,
  postsDirectory,
  publicThumbnailDirectory,
  popularPostPaths: [
    '/entry/303',
    '/entry/177',
    '/entry/76',
    '/entry/233',
    '/entry/84',
    '/entry/316',
    '/entry/234',
    '/entry/93',
    '/entry/276',
    '/entry/250',
    '/entry/317',
    '/entry/294',
  ],
});

export { postsDirectory, publicThumbnailDirectory };
export default postsManager;
