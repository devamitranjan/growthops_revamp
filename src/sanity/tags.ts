/**
 * Cache tags for on-demand revalidation.
 *
 * Every read in `repositories/*` goes through `sanityFetch` (see `live.ts`)
 * and is stored under two sets of tags. Sanity's own *sync* tags come back
 * with the query result and are expired by `<SanityLive />` the instant an
 * editor publishes, which is what refreshes a page someone already has open.
 * The type tags in this file are the second set: the Sanity webhook at
 * `/api/revalidate` calls `revalidateTag` with the tag for the published
 * document's `_type`, and unlike a live event that needs a connected browser,
 * the webhook fires whether or not anyone is on the site. Tags are derived
 * straight from the Sanity type names — the webhook does no mapping of its
 * own, so wiring a new document type up is just a matter of listing it here
 * and tagging its reads.
 *
 * Granularity is per type, not per document: publishing one report drops the
 * cache for every page that reads reports. That is deliberate. Slug-level tags
 * would need the webhook projection to carry a slug, and this site has few
 * enough documents that the extra regeneration is not worth the coupling.
 */

/** The document types in `schema-types/index.ts` that the site reads. */
export const DOCUMENT_TYPES = [
  "page",
  "article",
  "report",
  "newsroomArticle",
  "testimonialsSection",
  "siteSettings",
] as const;

export type DocumentType = (typeof DOCUMENT_TYPES)[number];

/** Namespaced so a tag can never collide with a Next-internal or route tag. */
export function documentTag(type: DocumentType): string {
  return `sanity:${type}`;
}

export function isDocumentType(type: string): type is DocumentType {
  return (DOCUMENT_TYPES as readonly string[]).includes(type);
}

/**
 * The document-type tags for a read, as the plain list `sanityFetch` wants.
 *
 * Passing these alongside the sync tags Sanity generates is not redundant, and
 * the two invalidate on different events. `<SanityLive />` only expires a
 * cache entry when a *connected browser* receives the change event, so with no
 * one on the site nothing fires and the entry — written with `revalidate:
 * false` — would outlive the edit and serve the next visitor stale content.
 * The webhook has no such dependency: it reaches `/api/revalidate` whether or
 * not anyone is looking. Sync tags refresh the open page, these tags keep the
 * cache honest for the next arrival.
 */
export function documentTags(...types: DocumentType[]): string[] {
  return types.map(documentTag);
}

/**
 * An explicitly uncached read, for the `generateStaticParams` queries.
 *
 * Those run at build time, where a `.next/cache` restored by CI could
 * otherwise hand back a slug list from a previous build — and a build that
 * reads a stale empty list silently ships a site with zero prerendered pages.
 * That happened during the initial migration, so this is not hypothetical.
 */
export function uncached(): { cache: "no-store" } {
  return { cache: "no-store" };
}
