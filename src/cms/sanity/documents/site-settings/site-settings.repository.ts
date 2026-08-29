import type { SiteSettingsRepository } from "@/content/domain/site-settings/site-settings.repository";
import { sanityFetch } from "../../live";
import { documentTags } from "../../tags";
import { mapSiteSettings } from "./site-settings.mapper";
import { SITE_SETTINGS_QUERY } from "./site-settings.queries";

/**
 * `SiteSettingsRepository`, over Sanity. SERVER ONLY — `sanityFetch` carries
 * the read token.
 *
 * Read by every route, so it is worth knowing this is one document and a
 * single round trip. Next dedupes identical fetches within a render, so the
 * header, footer and page body asking for it separately costs one request.
 */
export const sanitySiteSettingsRepository: SiteSettingsRepository = {
  async get() {
    const { data } = await sanityFetch({
      query: SITE_SETTINGS_QUERY,
      stega: false,
      tags: documentTags("siteSettings"),
    });

    // The contract says throw rather than return an empty shell: a site with
    // no settings has no title, no nav and no footer, and failing at the first
    // read beats rendering a page-shaped hole.
    if (!data) {
      throw new Error(
        "No siteSettings document found. Open /studio -> Site settings, or run the seed.",
      );
    }

    return mapSiteSettings(data);
  },
};
