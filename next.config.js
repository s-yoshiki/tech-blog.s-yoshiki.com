const siteMetaData = {
  title: `404 motivation not found`,
  description: `結果にコミットする`,
  siteUrl: `https://tech-blog.s-yoshiki.com`,
  copyrights: '',
  author: `@s-yoshiki`,
  logoText: '404 motivation not found',
  gtag: 'G-PJBP94L671',
};

const basePath = '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  assetPrefix: basePath,
  basePath,
  publicRuntimeConfig: {
    basePath,
    siteMetaData,
  },
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    loader: 'custom',
    domains: ['img.shields.io'],
  },
};

module.exports = nextConfig;
