import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  // Dev serves at "/" so /images/... and internal links resolve without a prefix;
  // the export build keeps the gh-pages subpath and is prefixed post-build.
  basePath: process.env.NODE_ENV === "development" ? "" : "/albion-mockups/site",
  images: {
    unoptimized: true,
    // Next 16 requires an explicit allowlist of qualities.
    qualities: [70, 80],
  },
};

export default nextConfig;
