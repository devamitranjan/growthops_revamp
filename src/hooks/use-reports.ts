"use client";

import type { QueryResponseInitial } from "@sanity/react-loader";

import { useQuery } from "@/sanity/loader";
import { REPORT_QUERY, REPORTS_QUERY } from "@/sanity/queries/reports";
import type { ReportPageData } from "@/sanity/types";

/**
 * `initial` is not an optimisation here, it is the data source. The loader
 * store is configured with no browser client, so outside the Presentation tool
 * these hooks never fetch — they hand back the server's snapshot unchanged.
 * Inside Presentation the Studio pushes fresh results in as the editor types.
 *
 * Produce `initial` with `loadQuery` from `@/sanity/loader.server` in the
 * Server Component that renders the consumer, and pass it down as a prop.
 */
export function useReports(initial: QueryResponseInitial<ReportPageData[]>) {
  return useQuery<ReportPageData[]>(REPORTS_QUERY, {}, { initial });
}

export function useReport(
  slug: string,
  initial: QueryResponseInitial<ReportPageData | null>,
) {
  return useQuery<ReportPageData | null>(REPORT_QUERY, { slug }, { initial });
}
