import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // CMS image/video uploads go through the `uploadAsset` server action as
      // FormData. The default Server Action body limit is 1MB, which most photos
      // exceed — raising it stops uploads failing with a masked server error.
      bodySizeLimit: "12mb",
    },
  },
};

export default nextConfig;
