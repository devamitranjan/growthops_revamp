"use client";

import type { QueryResponseInitial } from "@sanity/react-loader";

import { useQuery } from "@/sanity/loader";
import { ARTICLES_QUERY, articlePageRange } from "@/sanity/queries/articles";
import type { PostData } from "@/sanity/types";

/**
 * One page of the /post listing.
 *
 * Narrower than the `ArticleListing` the repository returns, and deliberately
 * so: a loader hook maps to exactly one GROQ query, and `heading` /
 * `totalPages` come from two others (`siteSettings` and a `count()`). Those
 * two are page-level chrome that the server already resolves, so pass them
 * down as ordinary props and let this hook own the array it can actually track.
 *
 * `page` only selects which window the caller is asking about — it does not
 * fetch. Changing it without a matching `initial` returns the snapshot the
 * server sent, because there is no browser client to fetch the new window
 * with. Real pagination stays a server round trip via `?page=`, which is what
 * /post already does.
 */
export function useArticles(
  page: number,
  initial: QueryResponseInitial<PostData[]>,
) {
  const { start, end } = articlePageRange(page);
  return useQuery<PostData[]>(ARTICLES_QUERY, { start, end }, { initial });
}
