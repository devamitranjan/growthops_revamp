"use client";

import { useQuery } from "@tanstack/react-query";
import { apiGet } from "@/lib/api";
import { queryKeys } from "@/lib/query-keys";
import type { ITestimonialsData } from "@/sanity/types";

/** Both pages that show testimonials render them on the server, so this is
 *  only needed if the section ever fetches on its own (e.g. a category filter
 *  that pages against the CMS instead of filtering in memory). */
export function useTestimonials(initialData?: ITestimonialsData) {
  return useQuery({
    queryKey: queryKeys.testimonials.detail(),
    queryFn: () => apiGet<ITestimonialsData>("/testimonials"),
    initialData,
  });
}
