import { client } from "../client";
import { sanityFetch } from "../live";
import {
  DEFAULT_POSTS_PER_PAGE,
  articlePageRange,
  totalPagesFor,
} from "../pagination";
import {
  ARTICLE_SLUGS_QUERY,
  ARTICLES_COUNT_QUERY,
  ARTICLES_QUERY,
} from "../queries/articles";
import { documentTags, uncached } from "../tags";
import type { PostData } from "../types";

export { DEFAULT_POSTS_PER_PAGE };

export interface ArticleListing {
  articles: PostData[];
  page: number;
  totalPages: number;
  /** The page size this listing was built with — the section's value, or the
   *  default where it left the field empty. */
  perPage: number;
}

export async function getArticleCount(): Promise<number> {
  const { data } = await sanityFetch({
    query: ARTICLES_COUNT_QUERY,
    stega: false,
    tags: documentTags("article"),
  });
  return data;
}

/** How many pages the archive fills at a given page size. The size comes from
 *  the listing section, so the caller has to have read the page first. */
export async function getTotalArticlePages(
  perPage?: number | null,
): Promise<number> {
  return totalPagesFor(await getArticleCount(), perPage);
}

/** One page of the /post listing. `page` is 1-based; `perPage` is the listing
 *  section's "Posts per page", and falls back to the default when unset. */
export async function getArticles(
  page = 1,
  perPage?: number | null,
): Promise<ArticleListing> {
  const {
    page: safePage,
    perPage: size,
    start,
    end,
  } = articlePageRange(page, perPage);

  const [articles, total] = await Promise.all([
    sanityFetch({
      query: ARTICLES_QUERY,
      params: { start, end },
      stega: false,
      tags: documentTags("article"),
    }).then((result) => result.data),
    getArticleCount(),
  ]);

  return {
    articles: articles as unknown as PostData[],
    page: safePage,
    totalPages: totalPagesFor(total, size),
    perPage: size,
  };
}

/** Slugs with a body — these render in-site at /post/[slug]; the rest still
 *  hand off to growthops.asia. Feeds `generateStaticParams`, so it reads
 *  uncached — see `uncached`. */
export async function getArticleSlugs(): Promise<string[]> {
  return (await client.fetch(ARTICLE_SLUGS_QUERY, {}, uncached())).filter(
    (slug): slug is string => typeof slug === "string",
  );
}
