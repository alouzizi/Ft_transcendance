/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/mpublic/HomePage",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
