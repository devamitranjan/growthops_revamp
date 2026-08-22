import { client } from "../client";
import { REPORT_QUERY, REPORT_SLUGS_QUERY, REPORTS_QUERY } from "../queries/reports";
import type { ReportPageData } from "../types";
import { tagged, uncached } from "../tags";

export async function getReports(): Promise<ReportPageData[]> {
  return (await client.fetch(REPORTS_QUERY, {}, tagged("report"))) as unknown as ReportPageData[];
}

export async function getReport(slug: string): Promise<ReportPageData | null> {
  const report = await client.fetch(REPORT_QUERY, { slug }, tagged("report"));
  return (report as unknown as ReportPageData | null) ?? null;
}

/** Feeds `generateStaticParams` for the /reports/[slug] pages.
 *  Reads uncached — see `uncached`. */
export async function getReportSlugs(): Promise<string[]> {
  return (await client.fetch(REPORT_SLUGS_QUERY, {}, uncached())).filter(
    (slug): slug is string => typeof slug === "string",
  );
}
