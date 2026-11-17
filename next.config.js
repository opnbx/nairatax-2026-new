/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Uniform URL rule: every route is canonicalised with a trailing slash.
  trailingSlash: true,
};

module.exports = nextConfig;
