import { defineLive } from "next-sanity/live";

import { client } from "./client";
import { readToken } from "./token";

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
 * Both tokens used to be `false`, because nothing previewed drafts. Presentation
 * does, so both are now the read token:
 *
 * - `serverToken` is what lets a read resolve drafts. With it set,
 *   `sanityFetch` resolves an unspecified `perspective` from the preview
 *   cookies *when draft mode is on*, and sends the token with that read.
 *   Published traffic is unchanged: draft mode is off, the perspective stays
 *   `undefined`, and the fetch falls through to the `published` perspective
 *   configured on the client, authenticated by the client's own token.
 *
 * - `browserToken` is only used for `includeDrafts`. `defineLive` puts it in
 *   the `<SanityLive />` payload only while `includeDrafts` is on, and that in
 *   turn is only on while draft mode is enabled — so on public traffic the
 *   browser still subscribes with no credentials at all. It is the same
 *   Viewer-scoped token, which is the reason `SANITY_API_READ_TOKEN` must not
 *   be given write rights.
 *
 * The comment this replaces claimed a `serverToken` would opt every route into
 * dynamic rendering, because `sanityFetch` would have to call `draftMode()`.
 * That is not true on Next 16.3.4, and it is worth saying why rather than
 * leaving it to be rediscovered. In
 * `next/dist/server/request/draft-mode.js`, only `enable()` and `disable()`
 * call `trackDynamicDraftMode`; reading `isEnabled` does not. During a
 * prerender the store hands back a `DraftMode(null)` whose `isEnabled` is a
 * plain `false`, with nothing marked dynamic. `cookies()` — which *is*
 * dynamic — is reached only from inside the `isEnabled` branch in
 * `next-sanity`'s resolver, so a prerender never gets there. The build output
 * confirms it: the public routes still prerender.
 *
 * Note that `defineLive` reconfigures the client with `useCdn: true`,
 * overriding the setting in `client.ts`. That is safe here in a way it was not
 * before: it also sends `cacheMode: "noStale"`, and every entry it writes is
 * expired by name on the next live event. The failure documented in
 * `client.ts` — a stale CDN response frozen into an indefinite cache — needed
 * an entry that nothing could invalidate, which is no longer the case. Draft
 * reads bypass the CDN regardless: a non-`published` perspective sets
 * `useCdn: false` for that fetch.
 *
 * `readToken` is `undefined` when the env var is unset, and `defineLive` wants
 * an explicit `false` to mean "no token" rather than warn about a missing one.
 */
export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: readToken ?? false,
  browserToken: readToken ?? false,
});
