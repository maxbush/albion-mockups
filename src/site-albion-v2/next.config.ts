import type { NextConfig } from "next";

// Production export is served from a gh-pages subpath; dev serves at "/".
const BASE = process.env.NODE_ENV === "development" ? "" : "/albion-mockups/albion-v2";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: BASE,
  env: { NEXT_PUBLIC_BASE_PATH: BASE },
  images: {
    unoptimized: true,
    // Next 16 requires an explicit allowlist of qualities.
    qualities: [70, 80],
  },
};

export default nextConfig;
