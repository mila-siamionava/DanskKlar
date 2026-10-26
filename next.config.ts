import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Tests build into their own folder so they don't replace your normal build
  distDir: process.env.NEXT_DIST_DIR || ".next",

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;