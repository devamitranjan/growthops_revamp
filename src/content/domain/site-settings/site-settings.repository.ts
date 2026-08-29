import type { SiteSettings } from "./site-settings.types";

/**
 * Site chrome and the copy that belongs to a route rather than to a document.
 *
 * A singleton: one document, read by every route. An implementation is
 * expected to make that one round trip per render rather than one per caller
 * — the header, the footer and the page body all ask for it separately.
 *
 * Throwing rather than returning `null` is deliberate and part of the
 * contract: a site with no settings has no title, no nav and no footer, and
 * failing loudly at the first read beats rendering a shell of a page.
 */
export interface SiteSettingsRepository {
  get(): Promise<SiteSettings>;
}

export type { SiteSettings };
