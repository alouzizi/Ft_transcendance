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

  images: {
    domains: ["cdn.intra.42.fr", "localhost", "https://lh3.googleusercontent.com",
      "lh3.googleusercontent.com"],
  },
};

module.exports = nextConfig;

