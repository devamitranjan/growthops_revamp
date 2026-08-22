import { client, freshClient } from "../client";
import { REPORT_QUERY, REPORT_SLUGS_QUERY, REPORTS_QUERY } from "../queries/reports";
import type { ReportPageData } from "../types";

export async function getReports(): Promise<ReportPageData[]> {
  return (await client.fetch(REPORTS_QUERY)) as unknown as ReportPageData[];
}

export async function getReport(slug: string): Promise<ReportPageData | null> {
  const report = await client.fetch(REPORT_QUERY, { slug });
  return (report as unknown as ReportPageData | null) ?? null;
}

/** Feeds `generateStaticParams` for the root-level /[slug] report pages.
 *  Reads past the CDN — see `freshClient`. */
export async function getReportSlugs(): Promise<string[]> {
  return (await freshClient.fetch(REPORT_SLUGS_QUERY)).filter(
    (slug): slug is string => typeof slug === "string",
  );
}
