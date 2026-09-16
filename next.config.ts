import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "80mb",
    },
    // proxy.ts buffers/clones every request body it sees (matches
    // /admin/:path*) and defaults to a 10MB cap independent of
    // serverActions.bodySizeLimit above — without raising this too,
    // uploads over 10MB (e.g. yearbook PDFs) get silently truncated,
    // which breaks the multipart form parser ("Unexpected end of form").
    proxyClientMaxBodySize: "80mb",
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
