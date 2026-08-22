"use client";

import type { QueryResponseInitial } from "@sanity/react-loader";

import { useQuery } from "@/sanity/loader";
import { ARTICLE_QUERY } from "@/sanity/queries/article";
import type { PostDetailData } from "@/sanity/types";

/** See `use-reports` for why `initial` is required rather than optional. */
export function useArticle(
  slug: string,
  initial: QueryResponseInitial<PostDetailData | null>,
) {
  return useQuery<PostDetailData | null>(ARTICLE_QUERY, { slug }, { initial });
}
