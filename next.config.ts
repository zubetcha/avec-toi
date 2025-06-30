import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@tanstack/react-query", "@tanstack/query-core"],
};

export default nextConfig;
