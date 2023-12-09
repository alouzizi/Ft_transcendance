/** @type {import('next').NextConfig} */
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

  env: {
    Backend_URL: process.env.BACK_HOST,
    DomainImg: process.env.DMN_IMG,
  },

  images: {
    domains: ["cdn.intra.42.fr", "localhost", process.env.DMN_IMG],
  },
};

module.exports = nextConfig;
