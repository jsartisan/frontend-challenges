import { type NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  serverExternalPackages: ["@mastra/*"],
};

export default nextConfig;
