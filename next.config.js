/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: '/api/:path*',
        destination:
          process.env.NODE_ENV === 'development'
            ? 'http://127.0.0.1:5328/api/:path*'
            : '/api/',
      },
    ]
  },
  webpack: (config) => {
    config.externals.push('encoding', /* add any other modules that might be causing the error */);
    return config;
  },
}

module.exports = nextConfig
