
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  experimental: {
      serverActions: {},
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
  // Add the following line to allow cross-origin requests from the specified domain.
  // This is often needed in development environments like cloud workstations.
  ...(process.env.NODE_ENV !== 'production' && { allowedDevOrigins: ["*.cloudworkstations.dev"] }),
};

export default nextConfig;
