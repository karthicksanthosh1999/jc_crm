import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://res.cloudinary.com/dlw7crog0/**")],
  },
};

export default nextConfig;
