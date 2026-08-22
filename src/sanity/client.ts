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
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "production",
  perspective: "published",
  token: process.env.SANITY_API_READ_TOKEN,
});

/**
 * Same client, guaranteed fresh.
 *
 * `generateStaticParams` must never read through the Sanity CDN: right after a
 * publish the CDN can still serve the previous result, and a build that reads
 * a stale empty list silently ships a site with zero prerendered pages. That
 * happened during the initial migration, so this is not hypothetical.
 */
export const freshClient = client.withConfig({ useCdn: false });
