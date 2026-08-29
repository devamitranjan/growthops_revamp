import type { ReportPageData } from "@/content/domain/report/report.types";
import { mapSeo, mapSections } from "../../sections/section.mapper";

/** `REPORT_QUERY` / `REPORTS_QUERY`. A report is a composed page like any
 *  other, so it reads back through the same section projections and maps
 *  through the same functions. */
interface RawReport {
  slug?: string | null;
  title?: string | null;
  seo?: {
    title?: string | null;
    description?: string | null;
    ogImage?: string | null;
  } | null;
  sections?: unknown;
}

export function mapReport(row: RawReport): ReportPageData {
  return {
    slug: row.slug ?? "",
    title: row.title ?? "",
    seo: mapSeo(row.seo),
    sections: mapSections(row.sections),
  };
}

export function mapReports(rows: readonly RawReport[] | null): ReportPageData[] {
  return (rows ?? []).map(mapReport);
}
