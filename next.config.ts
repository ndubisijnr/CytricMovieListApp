import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "res.cloudinary.com",
        protocol: "https",
      },
      {
        hostname: "i.pinimg.com",
        protocol: "https",
      },
    ],
  },
  experiment: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;
