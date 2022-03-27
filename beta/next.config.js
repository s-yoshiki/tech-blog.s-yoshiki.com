// const withPlugins = require("next-compose-plugins");
const withOptimizedImages = require("next-optimized-images");

const basePath = '/beta'

const siteMetaData = {
  title: `404 motivation not found`,
  description: `結果にコミットする`,
  siteUrl: `https://tech-blog.s-yoshiki.com`,
  copyrights: '',
  author: `@s-yoshiki`,
  logoText: '404 motivation not found',
  gtag: 'G-PJBP94L671'
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: basePath,
  basePath,
  publicRuntimeConfig: {
    basePath,
    siteMetaData,
  },
  reactStrictMode: true,
  trailingSlash: true,
  handleImages: ['jpeg', 'png', 'svg'],
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
  images: {
    loader: 'custom',
    domains: ['img.shields.io'],
  }
}

module.exports = withOptimizedImages(nextConfig)
// module.exports = nextConfig
