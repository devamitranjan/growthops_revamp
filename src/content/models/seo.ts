/**
 * Per-document metadata overrides.
 *
 * Every field is optional on purpose: an empty value has to fall *through* to
 * the site defaults rather than overwrite them with an empty string, which is
 * why the adapter maps a CMS `null` to an absent key rather than to `""`.
 * `src/lib/page-metadata.ts` is what turns this into Next.js `Metadata`.
 */
export interface SeoMetadata {
  title?: string;
  description?: string;
  /** Resolved URL, not an asset handle — see `ContentImage`. */
  ogImage?: string;
}
