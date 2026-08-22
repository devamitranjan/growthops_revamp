import { sanityFetch } from "../live";
import { SITE_SETTINGS_QUERY } from "../queries/site-settings";
import { documentTags } from "../tags";
import type { SiteSettings } from "../types";

/**
 * Read by every route, so it is worth knowing this is one document and a
 * single round trip. Next dedupes identical fetches within a render, so the
 * header, footer and page body asking for it separately costs one request.
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  const { data: settings } = await sanityFetch({
    query: SITE_SETTINGS_QUERY,
    stega: false,
    tags: documentTags("siteSettings"),
  });

  if (!settings) {
    throw new Error(
      'No siteSettings document found. Open /studio -> Site settings, or run the seed.',
    );
  }

  return settings as unknown as SiteSettings;
}
