import { enableContentDraftMode } from "@/content/draft-mode";

/**
 * Turns draft mode on, so the rest of the site resolves unpublished content.
 *
 * The Studio's Presentation tool loads this in the preview iframe with a
 * single-use secret appended; the handler verifies it before setting the
 * cookie, and answers 401 without one. All of that is the CMS's business, so
 * none of it is here — see `src/content/draft-mode.ts`.
 *
 * `GET` because the caller is an iframe navigation, which is the shape every
 * CMS preview integration has.
 */
export const GET = enableContentDraftMode;
