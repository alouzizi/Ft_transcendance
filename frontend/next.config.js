/** @type {import('next').NextConfig} */

require("dotenv").config();

const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/public/HomePage",
        permanent: true,
      },
    ];
  },

  images: {
    domains: ["cdn.intra.42.fr", "localhost", 'drive.google.com', 'gravatar.com'],
  },
};

module.exports = nextConfig;
