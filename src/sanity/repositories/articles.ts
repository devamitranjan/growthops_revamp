import { client } from "../client";
import {
  ARTICLE_SLUGS_QUERY,
  ARTICLES_COUNT_QUERY,
  ARTICLES_QUERY,
  POSTS_PER_PAGE,
  articlePageRange,
} from "../queries/articles";
import { tagged, uncached } from "../tags";
import type { PostData } from "../types";
import { getSiteSettings } from "./site-settings";

export { POSTS_PER_PAGE };

export interface ArticleListing {
  heading: string;
  articles: PostData[];
  page: number;
  totalPages: number;
}

export async function getArticleCount(): Promise<number> {
  return client.fetch(ARTICLES_COUNT_QUERY, {}, tagged("article"));
}

export async function getTotalArticlePages(): Promise<number> {
  return Math.ceil((await getArticleCount()) / POSTS_PER_PAGE);
}

/** One page of the /post listing. `page` is 1-based. */
export async function getArticles(page = 1): Promise<ArticleListing> {
  const { page: safePage, start, end } = articlePageRange(page);

  const [articles, total, settings] = await Promise.all([
    client.fetch(ARTICLES_QUERY, { start, end }, tagged("article")),
    getArticleCount(),
    getSiteSettings(),
  ]);

  return {
    heading: settings.postListingHeading,
    articles: articles as unknown as PostData[],
    page: safePage,
    totalPages: Math.ceil(total / POSTS_PER_PAGE),
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
