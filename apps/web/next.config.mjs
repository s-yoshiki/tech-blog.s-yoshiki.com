import createMDX from '@next/mdx';

const basePath = '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  assetPrefix: basePath,
  basePath,
  reactStrictMode: true,
  trailingSlash: true,
  transpilePackages: ['@repo/blog-content', '@repo/ui'],
};

const withMDX = createMDX({
  options: {
    remarkPlugins: ['remark-frontmatter', 'remark-gfm'],
    rehypePlugins: [
      'rehype-slug',
      [
        '@shikijs/rehype',
        {
          themes: {
            light: 'github-light',
            dark: 'github-dark',
          },
          defaultColor: 'light',
        },
      ],
    ],
  },
});

export default withMDX(nextConfig);
