/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: isProd ? 'export' : undefined,

  ...(isProd && {
    basePath: '/SMART',
    assetPrefix: '/SMART/',
  }),
};

module.exports = nextConfig;