"use client";

import type { QueryResponseInitial } from "@sanity/react-loader";

import { useQuery } from "@/sanity/loader";
import { articlePageRange } from "@/sanity/pagination";
import { ARTICLES_QUERY } from "@/sanity/queries/articles";
import type { PostData } from "@/sanity/types";

/**
 * One page of the /post listing.
 *
 * Narrower than the `ArticleListing` the repository returns, and deliberately
 * so: a loader hook maps to exactly one GROQ query, and `heading`,
 * `postsPerPage` and `totalPages` come from elsewhere — the first two from the
 * section on the page document, the last from a `count()`. Those are page-level
 * chrome that the server already resolves, so pass them down as ordinary props
 * and let this hook own the array it can actually track.
 *
 * `page` and `perPage` only select which window the caller is asking about —
 * they do not fetch. Changing either without a matching `initial` returns the
 * snapshot the server sent, because there is no browser client to fetch the new
 * window with. Real pagination stays a server round trip via `?page=`, which is
 * what /post already does.
 */
export function useArticles(
  page: number,
  initial: QueryResponseInitial<PostData[]>,
  perPage?: number | null,
) {
  const { start, end } = articlePageRange(page, perPage);
  return useQuery<PostData[]>(ARTICLES_QUERY, { start, end }, { initial });
}
