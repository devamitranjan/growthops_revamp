import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "./env";

/**
 * Read client for the site.
 *
 * SERVER-SIDE ONLY. This project returns an empty result set to
 * unauthenticated callers, so every read needs `SANITY_API_READ_TOKEN`, and
 * that token must never reach the browser.
 *
 * There is no build-time guard on this — keep it that way by construction:
 * nothing outside `src/sanity` imports this file, and the only callers are
 * `repositories/*`, which are reached from Server Components and route
 * handlers. Never import a repository from a "use client" component.
 *
 * `useCdn: false` is deliberate and load-bearing. Caching is Next's job here:
 * every read in `repositories/*` goes through `tagged()`, lands in the data
 * cache, and is dropped by the `/api/revalidate` webhook. Reading through
 * apicdn.sanity.io on top of that stacks a second cache that the webhook
 * cannot reach — and because a tagged read is stored with no expiry, a stale
 * CDN response (they are served with `s-maxage=3600`) gets frozen into the
 * data cache indefinitely. That is not theoretical: entries in
 * `.next/cache/fetch-cache` came back with `x-sanity-age: 3078`, i.e. content
 * that was already 51 minutes old at the moment it was cached "forever".
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: "published",
  token: process.env.SANITY_API_READ_TOKEN,
});
