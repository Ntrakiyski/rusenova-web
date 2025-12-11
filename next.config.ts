import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '*.unsplash.com',
      },
    ],
  },
  // Disable source maps to avoid the warnings
  productionBrowserSourceMaps: false,
  // Enable standalone output for Docker deployment
  output: 'standalone',
};

export default nextConfig;
