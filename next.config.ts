import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "80mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: `${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com`,
      },
    ],
  },
};

export default nextConfig;
