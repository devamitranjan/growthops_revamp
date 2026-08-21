"use client";

import { useQuery } from "@tanstack/react-query";
import { apiGet } from "@/lib/api";
import { queryKeys } from "@/lib/query-keys";
import type { ReportPageData } from "@/sanity/types";

export function useReports(initialData?: ReportPageData[]) {
  return useQuery({
    queryKey: queryKeys.reports.list(),
    queryFn: () => apiGet<ReportPageData[]>("/reports"),
    initialData,
  });
}

export function useReport(slug: string, initialData?: ReportPageData) {
  return useQuery({
    queryKey: queryKeys.reports.detail(slug),
    queryFn: () => apiGet<ReportPageData>(`/reports/${slug}`),
    initialData,
    enabled: slug.length > 0,
  });
}
