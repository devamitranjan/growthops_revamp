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
  // `src/cms/sanity/tags.ts`), but the HMR cache replays *every* fetch across an
  // HMR refresh — `no-store` included — so a Studio edit would still not show
  // up until a full reload. Correctness beats the saved round trip locally.
  experimental: {
    serverComponentsHmrCache: false,

    // TypeScript is installed side by side: `tsc` is TypeScript 7 (native), and
    // the `typescript` package is `@typescript/typescript6`, which is the 6.0 JS
    // compiler API that typescript-eslint still needs. Next's default CLI
    // checker looks for `typescript/bin/tsc`, which the 6.0 compat package does
    // not ship, so point `next build` at the JS API instead. Both compilers are
    // the same language version; `pnpm typecheck` runs the fast native one.
    useTypeScriptCli: false,
  },

  // Prints CACHE HIT / MISS per fetch in `next dev`. This is how you tell
  // "the CMS did not update" from "the cache did not drop".
  logging: {
    fetches: { fullUrl: true },
  },
};

export default nextConfig;
