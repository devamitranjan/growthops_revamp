import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "./env";
import { readToken } from "./token";

/**
 * Read client for the site.
 *
 * SERVER-SIDE ONLY. This project returns an empty result set to
 * unauthenticated callers, so every read needs `SANITY_API_READ_TOKEN` — see
 * `token.ts`, which is where that value is named now that `live.ts` and
 * `draft-mode.ts` need it too. It must never reach the browser from here; the
 * one place it is deliberately shared with the browser is `browserToken` in
 * `live.ts`, and only while draft mode is on.
 *
 * Nothing outside `src/cms/sanity` imports this file. The callers are
 * `live.ts`, `draft-mode.ts`, and the `generateStaticParams` reads in the
 * `.repository` files — all reached from Server Components and route
 * handlers, and every one of those files starts with `import "server-only"`,
 * so a `"use client"` module that reaches this one fails the build rather
 * than shipping the token. The ESLint rules in `eslint.config.mjs` stop the
 * application layer importing it at all.
 *
 * `useCdn: false` still applies to the direct `client.fetch` reads left in
 * the `.repository` files — the `generateStaticParams` slug lists. It no longer
 * describes the page reads: `defineLive` reconfigures this client with
 * `useCdn: true`, and it is allowed to, because it closes the hole this
 * setting was guarding. The original failure needed a cache entry that nothing
 * could invalidate — entries in `.next/cache/fetch-cache` came back with
 * `x-sanity-age: 3078`, content already 51 minutes old at the moment it was
 * cached "forever". Reads through `sanityFetch` are sent with
 * `cacheMode: "noStale"` and are expired by name on the next live event or
 * webhook, so nothing gets frozen. Do not flip this to `true` by hand.
 *
 * `stega.studioUrl` is what a stega'd read needs to build the edit link it
 * encodes into each string — without it `@sanity/client` throws
 * `config.studioUrl must be defined` rather than encoding nothing. It is the
 * relative `/studio` because that is where the Studio is mounted in this same
 * app, which makes it correct on localhost and on the deployed domain alike.
 *
 * Setting it does not turn stega on. Encoding is per fetch, and `defineLive`
 * reconfigures this client with `stega: false`; the two reads that want it say
 * so, and only while draft mode is on. See `stega.ts`.
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: "published",
  token: readToken,
  stega: { studioUrl: "/studio" },
});
