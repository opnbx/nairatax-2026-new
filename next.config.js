/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Uniform URL rule: every route is canonicalised with a trailing slash.
  trailingSlash: true,
  async redirects() {
    return [
      // Old calculator URL that Google still has on record; it now lives on the homepage.
      { source: '/tax-calculator', destination: '/', permanent: true },
    ];
  },
};

module.exports = nextConfig;
