import { client, freshClient } from "../client";
import {
  ARTICLE_SLUGS_QUERY,
  ARTICLES_COUNT_QUERY,
  ARTICLES_QUERY,
} from "../queries/articles";
import type { PostData } from "../types";
import { getSiteSettings } from "./site-settings";

/** Matches the 10-per-page pagination on growthops.asia/post. */
export const POSTS_PER_PAGE = 10;

export interface ArticleListing {
  heading: string;
  articles: PostData[];
  page: number;
  totalPages: number;
}

export async function getArticleCount(): Promise<number> {
  return client.fetch(ARTICLES_COUNT_QUERY);
}

export async function getTotalArticlePages(): Promise<number> {
  return Math.ceil((await getArticleCount()) / POSTS_PER_PAGE);
}

/** One page of the /post listing. `page` is 1-based. */
export async function getArticles(page = 1): Promise<ArticleListing> {
  const safePage = Math.max(1, Math.floor(page) || 1);
  const start = (safePage - 1) * POSTS_PER_PAGE;

  const [articles, total, settings] = await Promise.all([
    client.fetch(ARTICLES_QUERY, { start, end: start + POSTS_PER_PAGE }),
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
 *  hand off to growthops.asia. Feeds `generateStaticParams`. */
export async function getArticleSlugs(): Promise<string[]> {
  return (await freshClient.fetch(ARTICLE_SLUGS_QUERY)).filter(
    (slug): slug is string => typeof slug === "string",
  );
}
