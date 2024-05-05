/** @type {import('next').NextConfig} */

const nextConfig = {
  webpack: (
    config,
    {buildId, dev, isServer, defaultLoaders, nextRuntime, webpack}
  ) => {
    config.externals.push({canvas: 'commonjs canvas'});
    return config;
  },
  experimental: {
    serverComponentsExternalPackages: ['mysql2']
  }
};

export default nextConfig;