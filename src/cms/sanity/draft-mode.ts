import { defineEnableDraftMode } from "next-sanity/draft-mode";

import { client } from "./client";
import { readToken } from "./token";

/**
 * The route handler that turns Next's draft mode on, configured for Sanity.
 *
 * SERVER-SIDE ONLY — it carries the read token, and it is the one endpoint on
 * the site that will hand a visitor a cookie which makes every subsequent read
 * resolve unpublished content. That is why it is not a bare
 * `draftMode().enable()`: `defineEnableDraftMode` first verifies the
 * single-use secret Presentation appends to the preview URL, by reading the
 * matching `sanity.previewUrlSecret` document. A request without a valid
 * secret gets a 401 and no cookie, so /api/draft-mode/enable is safe to leave
 * open — which it has to be, since the Studio opens it in an iframe.
 *
 * The token is passed explicitly rather than relied on from `client`, because
 * the secret lives in a draft document: this read needs draft access whether
 * or not the client happens to be configured with it.
 *
 * Bound to the app in `src/content/draft-mode.ts` — the route file under
 * `src/app` may not import `@/cms`.
 */
export const { GET: enableDraftMode } = defineEnableDraftMode({
  client: client.withConfig({ token: readToken }),
});
