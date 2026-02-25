import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['antd-mobile'],
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};
export default nextConfig;

