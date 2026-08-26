import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // cacheComponents: true,
  experimental: {
    serverActions: {
      bodySizeLimit: process.env.NODE_ENV === "development" ? '100mb' : '1mb',
    },
    lightningCssFeatures: {
      exclude: [
        'light-dark'
      ]
    }
  },
  images: {
    remotePatterns: [
      new URL("https://spacedock.info/**")
    ]
  },

}

export default nextConfig


// console.log("How many times is next config run?")
// console.log(process.env)