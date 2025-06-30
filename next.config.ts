import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // Optimize bundle size and loading speed
    optimizePackageImports: ['lucide-react', '@radix-ui/react-avatar', '@radix-ui/react-checkbox'],
  },
  // Enable SWC minification for better performance
  swcMinify: true,
  // Enable compression
  compress: true,
  // Optimize images
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placeholder.svg',
      },
    ],
  },
  // Preload key routes
  async rewrites() {
    return [
      // Add any custom rewrites if needed
    ];
  },
};

export default nextConfig;
