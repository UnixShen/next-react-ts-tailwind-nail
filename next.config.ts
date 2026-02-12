/** @type {import('next').NextConfig} */

const nextConfig = {
  /* config options here */
  reactCompiler: true,
  transpilePackages: ['antd-mobile'],
  images: {
    unoptimized: true,
  }
};
module.exports = nextConfig;

