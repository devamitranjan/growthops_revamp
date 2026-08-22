"use client";

import { useQuery } from "@tanstack/react-query";
import { apiGet } from "@/lib/api";
import { queryKeys } from "@/lib/query-keys";
import type { ArticleListing } from "@/sanity/repositories/articles";

/** Client-side listing fetch. The /post route renders its first page on the
 *  server; this is for paging without a navigation. Seed it with
 *  `initialData` from the server render to avoid a duplicate first fetch. */
export function useArticles(page = 1, initialData?: ArticleListing) {
  return useQuery({
    queryKey: queryKeys.articles.list(page),
    queryFn: () => apiGet<ArticleListing>("/articles", { page }),
    initialData:
      initialData && initialData.page === page ? initialData : undefined,
    placeholderData: (previous) => previous,
  });
}
