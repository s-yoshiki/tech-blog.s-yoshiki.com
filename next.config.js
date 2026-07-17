const basePath = '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  assetPrefix: basePath,
  basePath,
  reactStrictMode: true,
  trailingSlash: true,
};

module.exports = nextConfig;
