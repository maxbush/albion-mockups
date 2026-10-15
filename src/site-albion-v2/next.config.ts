import type { NextConfig } from "next";

// Production export is served from a gh-pages subpath; dev serves at "/".
// SITE_BASE_PATH lets a preview build live next to the main one (for example /albion-mockups/albion-v2-tutors-preview).
const BASE = process.env.SITE_BASE_PATH ?? (process.env.NODE_ENV === "development" ? "" : "/albion-mockups/albion-v2");

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
