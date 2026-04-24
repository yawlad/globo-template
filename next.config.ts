import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "localhost",
    "127.0.0.1",
    "192.168.0.136",
    "192.168.1.6",
    "26.3.8.66",
  ],
};

export default nextConfig;
