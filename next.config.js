/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  basePath: '/home',
  assetPrefix: '/home/',
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'radiodb.famcast.co.za',
        port: '',
        pathname: '/mohodi/**',
      },
    ],
  }, // Recommended for the `pages` directory, default in `app`.
};

module.exports = nextConfig;
