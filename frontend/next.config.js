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
    domains: ['cdn.intra.42.fr', 'localhost:4000'],
  },
};

// Export the combined configuration
module.exports = nextConfig;
