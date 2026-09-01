/**
 * The read token, in one place.
 *
 * SERVER-SIDE ONLY. Three modules need it and they need it for three
 * different reasons, so it is worth naming once rather than spelling the env
 * var out three times:
 *
 * - `client.ts` authenticates every published read with it, because this
 *   project returns an empty result set to unauthenticated callers.
 * - `live.ts` passes it as `serverToken` (to read drafts) and `browserToken`
 *   (so the browser's live connection can subscribe with `includeDrafts`).
 * - `draft-mode.ts` needs it to validate the preview-URL secret Presentation
 *   sends when it enables draft mode.
 *
 * One token, not two: the same `SANITY_API_READ_TOKEN` covers all three, and
 * it must have Viewer rights and no more — `live.ts` hands it to the browser
 * while draft mode is on, which is the reason to keep it read-only.
 *
 * Deliberately *not* a module that throws when the value is missing. The site
 * already renders as if the CMS were empty without it, which is a clearer
 * signal than a crash at import time in an environment (the Sanity CLI, a
 * client bundle graph walk) that never intended to read content. `live.ts`
 * turns `undefined` into the explicit `false` that `defineLive` wants.
 */
export const readToken = process.env.SANITY_API_READ_TOKEN;
