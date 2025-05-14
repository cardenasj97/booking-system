/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable images from any domains
  images: {
    domains: ["localhost"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  // For debugging
  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  // Configure headers to prevent errors in development
  async headers() {
    return [
      {
        source: "/json/:path*",
        headers: [
          {
            key: "Content-Type",
            value: "application/json",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
