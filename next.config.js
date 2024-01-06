/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // unoptimized: true,
    remotePatterns: [
      {
        hostname: "api.ivanpeklin-racing.com",
      },
    ],
  },
};

module.exports = nextConfig;
