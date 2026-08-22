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
 * `live.ts` and the `generateStaticParams` reads in `repositories/*`, both of
 * which are reached from Server Components and route handlers. Never import a
 * repository from a "use client" component.
 *
 * `useCdn: false` still applies to the direct `client.fetch` reads left in
 * `repositories/*` — the `generateStaticParams` slug lists. It no longer
 * describes the page reads: `defineLive` reconfigures this client with
 * `useCdn: true`, and it is allowed to, because it closes the hole this
 * setting was guarding. The original failure needed a cache entry that nothing
 * could invalidate — entries in `.next/cache/fetch-cache` came back with
 * `x-sanity-age: 3078`, content already 51 minutes old at the moment it was
 * cached "forever". Reads through `sanityFetch` are sent with
 * `cacheMode: "noStale"` and are expired by name on the next live event or
 * webhook, so nothing gets frozen. Do not flip this to `true` by hand.
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: "published",
  token: process.env.SANITY_API_READ_TOKEN,
});
