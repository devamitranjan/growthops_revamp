/**
 * Cache tags for on-demand revalidation.
 *
 * Every read in `repositories/*` is tagged with the document types it can be
 * affected by, and the Sanity webhook at `/api/revalidate` calls
 * `revalidateTag` with the tag for the published document's `_type`. Tags are
 * therefore derived straight from the Sanity type names — the webhook does no
 * mapping of its own, so wiring a new document type up is just a matter of
 * listing it here and tagging its reads.
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
 * The data cache is only correct as long as something invalidates it, and the
 * only thing that does is a Sanity webhook posting to `/api/revalidate`.
 * Sanity cannot reach `localhost`, so in development a tagged read would be
 * stored with no expiry and never dropped: `.next/cache/fetch-cache` survives
 * restarts, so an edit made in the local Studio would stay invisible until
 * someone deleted `.next`. Skip the cache entirely there — dev traffic is one
 * developer, and the round trip to Sanity is cheaper than the confusion.
 */
const CACHE_IN_DEV = false;

const bypass = process.env.NODE_ENV === "development" && !CACHE_IN_DEV;

export type ReadOptions =
  | { cache: "no-store" }
  | { cache: "force-cache"; next: { tags: string[] } };

/**
 * Fetch options that put a query in the data cache under the given tags.
 *
 * `cache: "force-cache"` is not redundant with the tags: fetches are uncached
 * by default, and an uncached fetch records no tags at all, so the route would
 * prerender at build and then never be invalidated by anything.
 */
export function tagged(...types: DocumentType[]): ReadOptions {
  if (bypass) return { cache: "no-store" };
  return { cache: "force-cache", next: { tags: types.map(documentTag) } };
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
