import type { NextConfig } from "next";

import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();

const nextConfig: NextConfig = {
  transpilePackages: ['antd-mobile'],
  images: {
    unoptimized: true,
  },
  // https://nextjs.org/docs/api-reference/next.config.js/rewrites
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};
export default nextConfig;

