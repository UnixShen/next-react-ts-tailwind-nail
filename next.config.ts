import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['antd-mobile'],
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};
export default nextConfig;

