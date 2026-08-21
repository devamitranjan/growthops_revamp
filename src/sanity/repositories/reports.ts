import { telcoReportData } from "../fixtures/reports";
import type { ReportPageData } from "../types";

export async function getReports(): Promise<ReportPageData[]> {
  return Object.entries(telcoReportData).map(([slug, report]) => ({
    slug,
    ...report,
  }));
}

export async function getReport(
  slug: string,
): Promise<ReportPageData | null> {
  const report = telcoReportData[slug];
  return report ? { slug, ...report } : null;
}

/** Feeds `generateStaticParams` for the root-level /[slug] report pages. */
export async function getReportSlugs(): Promise<string[]> {
  return Object.keys(telcoReportData);
}
