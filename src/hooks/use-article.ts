"use client";

import { useQuery } from "@tanstack/react-query";
import { apiGet } from "@/lib/api";
import { queryKeys } from "@/lib/query-keys";
import type { PostDetailData } from "@/sanity/types";

export function useArticle(slug: string, initialData?: PostDetailData) {
  return useQuery({
    queryKey: queryKeys.articles.detail(slug),
    queryFn: () => apiGet<PostDetailData>(`/articles/${slug}`),
    initialData,
    enabled: slug.length > 0,
  });
}
