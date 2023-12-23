const join = require('path').join;

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  sassOptions: {
    includePaths: [join(__dirname, 'src', 'scss')],
  },
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          // {
          //   key: 'X-Frame-Options',
          //   value: 'DENY',
          // },
          // {
          //   key: 'X-Content-Type-Options',
          //   value: 'nosniff',
          // },
          // {
          //   key: 'X-XSS-Protection',
          //   value: '1; mode=block',
          // },
          // {
          //   key: 'Referrer-Policy',
          //   value: 'strict-origin-when-cross-origin',
          // },
          {
            key: 'Content-Security-Policy',
            value: `default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google-analytics.com https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https://www.google-analytics.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com; frame-src 'self' https://www.googletagmanager.com`,
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
