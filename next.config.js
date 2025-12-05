/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ignores ESLint during `next build`
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      }
    ]
  }
};

module.exports = nextConfig;
