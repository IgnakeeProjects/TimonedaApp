import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  //output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      // Permite miniaturas de YouTube
      { protocol: 'https', hostname: 'i.ytimg.com' },
      { protocol: 'https', hostname: 'img.youtube.com' },
    ],
  },
  trailingSlash: true,
};

module.exports = nextConfig;

