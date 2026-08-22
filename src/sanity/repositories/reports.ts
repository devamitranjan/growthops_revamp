import { client } from "../client";
import { sanityFetch } from "../live";
import { REPORT_QUERY, REPORT_SLUGS_QUERY, REPORTS_QUERY } from "../queries/reports";
import type { ReportPageData } from "../types";
import { documentTags, uncached } from "../tags";

export async function getReports(): Promise<ReportPageData[]> {
  const { data } = await sanityFetch({
    query: REPORTS_QUERY,
    stega: false,
    tags: documentTags("report"),
  });
  return data as unknown as ReportPageData[];
}

export async function getReport(slug: string): Promise<ReportPageData | null> {
  const { data: report } = await sanityFetch({
    query: REPORT_QUERY,
    params: { slug },
    stega: false,
    tags: documentTags("report"),
  });
  return (report as unknown as ReportPageData | null) ?? null;
}

/** Feeds `generateStaticParams` for the /reports/[slug] pages.
 *  Reads uncached — see `uncached`. */
export async function getReportSlugs(): Promise<string[]> {
  return (await client.fetch(REPORT_SLUGS_QUERY, {}, uncached())).filter(
    (slug): slug is string => typeof slug === "string",
  );
}
