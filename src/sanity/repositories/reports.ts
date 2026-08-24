import { client } from "../client";
import { sanityFetch } from "../live";
import { REPORT_QUERY, REPORT_SLUGS_QUERY, REPORTS_QUERY } from "../queries/reports";
import { documentTags, uncached } from "../tags";
import type { ReportPageData } from "../types";
import { normaliseSections, normaliseSeo } from "./sections";

type RawReport = {
  slug: string | null;
  title: string | null;
  seo: { title: string | null; description: string | null; ogImage: string | null } | null;
  sections: unknown[] | null;
};

function toReport(report: RawReport): ReportPageData {
  return {
    slug: report.slug ?? "",
    title: report.title ?? "",
    seo: normaliseSeo(report.seo),
    sections: normaliseSections(report.sections),
  };
}

export async function getReports(): Promise<ReportPageData[]> {
  const { data } = await sanityFetch({
    query: REPORTS_QUERY,
    stega: false,
    tags: documentTags("report", "testimonialsSection", "newsroomArticle"),
  });
  return (data as unknown as RawReport[]).map(toReport);
}

export async function getReport(slug: string): Promise<ReportPageData | null> {
  const { data: report } = await sanityFetch({
    query: REPORT_QUERY,
    params: { slug },
    stega: false,
    tags: documentTags("report", "testimonialsSection", "newsroomArticle"),
  });
  return report ? toReport(report as unknown as RawReport) : null;
}

/** Feeds `generateStaticParams` for the /reports/[slug] pages.
 *  Reads uncached — see `uncached`. */
export async function getReportSlugs(): Promise<string[]> {
  return (await client.fetch(REPORT_SLUGS_QUERY, {}, uncached())).filter(
    (slug): slug is string => typeof slug === "string",
  );
}
