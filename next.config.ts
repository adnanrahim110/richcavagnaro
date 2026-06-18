import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "export",
  distDir: "out",
  trailingSlash: false,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
