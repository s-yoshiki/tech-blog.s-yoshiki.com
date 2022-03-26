// const withPlugins = require("next-compose-plugins");
const withOptimizedImages = require("next-optimized-images");
/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: '/beta',
  basePath: '/beta',
  publicRuntimeConfig: {
    basePath: "/beta",
  },
  reactStrictMode: true,
  trailingSlash: true,
  handleImages: ['jpeg', 'png', 'svg'],
  // webpack: function (config) {
  //   config.module.rules.push({
  //     test: /\.md$/,
  //     use: "raw-loader",
  //   });
  //   return config;
  // },
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
  images: {
    loader: 'custom',
    domains: ['img.shields.io'],
  },
}

module.exports = withOptimizedImages(nextConfig)
// module.exports = nextConfig
