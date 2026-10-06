import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: "/albion-mockups/blue-b",
  images: {
    unoptimized: true,
    // Next 16 requires an explicit allowlist of qualities.
    qualities: [70, 80],
  },
};

export default nextConfig;
