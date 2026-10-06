import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: "/albion-mockups/green",
  images: {
    unoptimized: true,
    formats: ["image/webp"],
    deviceSizes: [640, 828, 1080, 1280, 1600, 1920],
  },
};

export default nextConfig;
