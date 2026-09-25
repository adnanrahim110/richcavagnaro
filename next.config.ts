import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "standalone",
  trailingSlash: false,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
