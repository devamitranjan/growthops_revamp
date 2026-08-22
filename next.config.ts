import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },

  // Dev-only. Sanity reads are `no-store` in development (see
  // `src/sanity/tags.ts`), but the HMR cache replays *every* fetch across an
  // HMR refresh — `no-store` included — so a Studio edit would still not show
  // up until a full reload. Correctness beats the saved round trip locally.
  experimental: {
    serverComponentsHmrCache: false,
  },

  // Prints CACHE HIT / MISS per fetch in `next dev`. This is how you tell
  // "the CMS did not update" from "the cache did not drop".
  logging: {
    fetches: { fullUrl: true },
  },
};

export default nextConfig;
