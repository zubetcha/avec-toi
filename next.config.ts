import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@tanstack/react-query", "@tanstack/query-core"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pinimg.com",
      },
      {
        protocol: "https",
        hostname: "search.pstatic.net",
      },
    ],
  },
};

export default nextConfig;
