/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // unoptimized: true,
    remotePatterns: [
      {
        hostname: "164.90.230.225",
      },
    ],
  },
};

module.exports = nextConfig;
