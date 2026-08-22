import { defineLive } from "next-sanity/live";

import { client } from "./client";

/**
 * SERVER-SIDE ONLY, like `client.ts` — this module carries the read token.
 *
 * `sanityFetch` is what makes an already-open page update when an editor
 * publishes. `revalidateTag` alone cannot do that: it drops the server cache,
 * but a browser that is already showing the page has no reason to ask again.
 * `<SanityLive />` is the missing half — it holds an SSE connection to the
 * Live Content API, and every read done through `sanityFetch` is stored under
 * the sync tags Sanity returns for it, so a change event names exactly the
 * cache entries to expire before the router refreshes.
 *
 * Both tokens are `false` on purpose:
 *
 * - `serverToken` only exists to read *drafts*. Nothing here previews drafts
 *   yet, and leaving it unset would make `sanityFetch` call `draftMode()`,
 *   which opts every route into dynamic rendering. Published reads still
 *   authenticate with the client's own token — the dataset is private, and
 *   verified: `defineLive` passes `token: undefined` per-fetch, which does not
 *   clear the token configured on the client.
 *
 * - `browserToken` is only needed for `includeDrafts`. The published event
 *   stream is readable without credentials, so the browser subscribes with no
 *   token at all and the read token stays on the server.
 *
 * Note that `defineLive` reconfigures the client with `useCdn: true`,
 * overriding the setting in `client.ts`. That is safe here in a way it was not
 * before: it also sends `cacheMode: "noStale"`, and every entry it writes is
 * expired by name on the next live event. The failure documented in
 * `client.ts` — a stale CDN response frozen into an indefinite cache — needed
 * an entry that nothing could invalidate, which is no longer the case.
 */
export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: false,
  browserToken: false,
});
