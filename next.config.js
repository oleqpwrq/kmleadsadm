/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/kmleadsadm',
  assetPrefix: '/kmleadsadm/',
  trailingSlash: true,
}

module.exports = nextConfig 