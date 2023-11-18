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
    domains: ['cdn.intra.42.fr', '10.12.13.5'],
  },
};

// Export the combined configuration
module.exports = nextConfig;
