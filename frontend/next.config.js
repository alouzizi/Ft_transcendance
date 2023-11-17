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
<<<<<<< HEAD
};

=======

  images: {
    domains: ['cdn.intra.42.fr'],
  },
};

// Export the combined configuration
>>>>>>> origin/lhoussin
module.exports = nextConfig;
