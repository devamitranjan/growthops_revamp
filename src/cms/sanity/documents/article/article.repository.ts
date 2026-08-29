import type { ArticleRepository } from "@/content/domain/article/article.repository";
import {
  articlePageRange,
  totalPagesFor,
} from "@/content/domain/article/article.pagination";
import type {
  ArticleListing,
  PostDetailData,
} from "@/content/domain/article/article.types";
import { client } from "../../client";
import { sanityFetch } from "../../live";
import { documentTags, uncached } from "../../tags";
import { mapPostCards, mapPostDetail } from "./article.mapper";
import {
  ARTICLE_EXISTS_QUERY,
  ARTICLE_QUERY,
  ARTICLE_SLUGS_QUERY,
  ARTICLES_COUNT_QUERY,
  ARTICLES_QUERY,
} from "./article.queries";

/**
 * `ArticleRepository`, over Sanity.
 *
 * SERVER ONLY — reaches `client` and `live`, both of which carry
 * `SANITY_API_READ_TOKEN`. The `server-only` import above turns a
 * `"use client"` file that reaches this module into a build error rather than
 * a leaked token. Client components take content as props from a Server
 * Component.
 *
 * Every read is tagged `sanity:article` so the publish webhook can drop it —
 * see `../../tags.ts` for why that is not redundant with the live sync tags.
 */

async function getCount(): Promise<number> {
  const { data } = await sanityFetch({
    query: ARTICLES_COUNT_QUERY,
    stega: false,
    tags: documentTags("article"),
  });

  return data;
}

async function getListing(
  page = 1,
  perPage?: number | null,
): Promise<ArticleListing> {
  const {
    page: safePage,
    perPage: size,
    start,
    end,
  } = articlePageRange(page, perPage);

  // The window is paginated in GROQ so the CMS never ships the whole archive
  // to render one page; the count runs alongside it rather than after.
  const [articles, total] = await Promise.all([
    sanityFetch({
      query: ARTICLES_QUERY,
      params: { start, end },
      stega: false,
      tags: documentTags("article"),
    }).then((result) => result.data),
    getCount(),
  ]);

  return {
    articles: mapPostCards(articles),
    page: safePage,
    totalPages: totalPagesFor(total, size),
    perPage: size,
  };
}

async function getBySlug(slug: string): Promise<PostDetailData | null> {
  const { data } = await sanityFetch({
    query: ARTICLE_QUERY,
    params: { slug },
    stega: false,
    tags: documentTags("article"),
  });

  return mapPostDetail(data);
}

export const sanityArticleRepository: ArticleRepository = {
  getListing,

  getCount,

  async getTotalPages(perPage) {
    return totalPagesFor(await getCount(), perPage);
  },

  /** Reads uncached — see `uncached()`, and the note on the contract. */
  async getSlugs() {
    const slugs = await client.fetch(ARTICLE_SLUGS_QUERY, {}, uncached());

    return slugs.filter((slug): slug is string => typeof slug === "string");
  },

  getBySlug,

  async exists(slug) {
    const { data } = await sanityFetch({
      query: ARTICLE_EXISTS_QUERY,
      params: { slug },
      stega: false,
      tags: documentTags("article"),
    });

    return data;
  },
};
