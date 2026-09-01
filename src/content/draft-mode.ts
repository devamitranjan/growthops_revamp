import { enableDraftMode } from "@/cms/sanity/draft-mode";

/**
 * The handler behind /api/draft-mode/enable, bound to the CMS that implements
 * it — see `repositories.ts` for the rule this follows.
 *
 * The route file owes Next a `GET` export and nothing else. Which CMS asked
 * for the preview, and how the request proving it is verified, are both behind
 * this binding: a CMS whose preview flow is a shared secret in a query string
 * supplies a different handler and the route does not change.
 *
 * **SERVER ONLY**, guarded one level down: `cms/sanity/draft-mode.ts` reaches
 * the Sanity client, which carries `SANITY_API_READ_TOKEN`.
 */
export const enableContentDraftMode = enableDraftMode;
