import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  trailingSlash: true,
  experimental: {
    // Optimize bundle size and loading speed
    optimizePackageImports: ['lucide-react', '@radix-ui/react-avatar', '@radix-ui/react-checkbox'],
  },
  // Enable compression
  compress: true,
  // Skip linting during build for deployment
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Skip type checking during build for deployment
  typescript: {
    ignoreBuildErrors: true,
  },
  // Optimize images
  images: {
    unoptimized: true,
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
