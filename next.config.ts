import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', 
  images: {
    unoptimized: true, 
  },
  basePath: '/habit-tracker_Next_TS/',
  assetPrefix: '/habit-tracker_Next_TS/',
};

export default nextConfig;
