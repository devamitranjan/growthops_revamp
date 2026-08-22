import { client } from "../client";
import { SITE_SETTINGS_QUERY } from "../queries/site-settings";
import type { SiteSettings } from "../types";

/**
 * Read by every route, so it is worth knowing this is one document and a
 * single round trip. Next dedupes identical fetches within a render, so the
 * header, footer and page body asking for it separately costs one request.
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  const settings = await client.fetch(SITE_SETTINGS_QUERY);

  if (!settings) {
    throw new Error(
      'No siteSettings document found. Open /studio -> Site settings, or run the seed.',
    );
  }

  return settings as unknown as SiteSettings;
}
