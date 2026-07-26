import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    serverActions: {
      bodySizeLimit: process.env.NODE_ENV === "development" ? '100mb' : '1mb',
    },
  },
};

export default nextConfig;
