import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "media-cdn.tripadvisor.com",
      },
      {
        protocol: "https",
        hostname: "api.flightstravel.co.uk",
      },
      {
        protocol: "https",
        hostname: "www.flightstravel.co.uk",
      },
      {
        protocol: "https",
        hostname: "api-stage.flightstravel.co.uk",
      },
    ],
  },
};

export default nextConfig;
