import type { ReportRepository } from "@/content/domain/report/report.repository";
import { client } from "../../client";
import { sanityFetch, stegaEnabled } from "../../live";
import { documentTags, uncached } from "../../tags";
import { mapReport, mapReports } from "./report.mapper";
import {
  REPORT_QUERY,
  REPORT_SLUGS_QUERY,
  REPORTS_QUERY,
} from "./report.queries";

/**
 * `ReportRepository`, over Sanity. SERVER ONLY — same token, same reason as
 * the article repository.
 *
 * Reports carry sections, so their reads are tagged with the two document
 * types those sections dereference as well as with `sanity:report` — see the
 * page repository for what tagging only the outer type costs.
 */
const SECTION_TAGS = documentTags(
  "report",
  "testimonialsSection",
  "newsroomArticle",
);

export const sanityReportRepository: ReportRepository = {
  async getAll() {
    const { data } = await sanityFetch({
      query: REPORTS_QUERY,
      stega: false,
      tags: SECTION_TAGS,
    });

    return mapReports(data);
  },

  /** The report equivalent of `PageRepository.getByPath`: one composed
   *  document, rendered as prose, so it is read with stega while draft mode is
   *  on. `getAll` above is not — it answers /api/reports, and a JSON payload
   *  has nothing to click. */
  async getBySlug(slug) {
    const { data } = await sanityFetch({
      query: REPORT_QUERY,
      params: { slug },
      stega: await stegaEnabled(),
      tags: SECTION_TAGS,
    });

    return data ? mapReport(data) : null;
  },

  /** Reads uncached — see `uncached()`, and the note on the contract. */
  async getSlugs() {
    const slugs = await client.fetch(REPORT_SLUGS_QUERY, {}, uncached());

    return slugs.filter((slug): slug is string => typeof slug === "string");
  },
};
