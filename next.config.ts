// import type { NextConfig } from "next";

/**
 * Next.js 16.1.6 适配 Cloudflare Pages 的核心配置
 * 适配 @cloudflare/next-on-pages 最新版 + Edge Runtime + 全栈特性
 */
/** @type {import('next').NextConfig} */

const nextConfig = {
  reactCompiler: true,
  transpilePackages: ['antd-mobile'],
  // ====================== 核心：Cloudflare 适配 ======================
  // 1. 静态导出配置（配合 @cloudflare/next-on-pages 构建产物）
  output: "export",
  // 2. 禁用 Cloudflare 不兼容的 Next.js 内置特性
  images: {
    unoptimized: true, // Cloudflare 暂不兼容 Next.js 16 图片优化新特性，需禁用
  },
  // 3. 构建输出目录（保持默认，避免 next-on-pages 识别异常）
  distDir: ".next",

  // ====================== Next.js 16 全栈特性适配 ======================
  experimental: {
    // 1. 全局指定 Edge Runtime（Cloudflare 仅支持 Edge，不支持 Node.js 运行时）
    runtime: "edge",
    // 2. 支持 Next.js 16 Server Actions（全栈项目常用）
    serverActions: {
      // 允许的域名（替换为你的 Cloudflare Pages 域名，本地预览可加 localhost）
      allowedOrigins: [
        "nail.fontend.dpdns.org", // 你的 Cloudflare 部署域名
        "localhost:3000", // 本地预览域名（wrangler preview 端口）
      ],
      // 可选：启用 Server Actions 日志（调试用）
      logSerialization: true,
    },
    // 3. 兼容 Next.js 16 App Router 特性（如 Partial Prerendering）
    partialPrerendering: true, // 若使用 Next.js 16 部分预渲染，需开启
  },

  // ====================== 可选：额外优化配置 ======================
  // 1. 禁用 source map（减少构建产物体积，部署更快）
  productionBrowserSourceMaps: false,
  // 2. 配置环境变量（若有需要，比如 API 基础地址）
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || "",
  },
  // 3. 跨域配置（若前端需调用外部 API）
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,POST,PUT,DELETE" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;

// export default nextConfig;
