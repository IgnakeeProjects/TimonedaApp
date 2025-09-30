import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  //output: 'export',
  images: {
    unoptimized: true
  },
  // Optimizaciones para reducir el tamaño del bundle
  compress: true,
  trailingSlash: true,
  // Configuración para Azure Static Web Apps
  experimental: {
    // Optimizar el warm-up
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
   async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;

