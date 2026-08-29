import type {
  ArticleListing,
  PostData,
  PostDetailData,
} from "./article.types";

/**
 * What the application needs to know about articles — not how any CMS answers
 * it.
 *
 * This is the CMS boundary, so the rules are worth stating plainly: no GROQ,
 * no client, no import from `src/cms`, and nothing here may describe a query.
 * Every method is named for the question a route asks, and the shapes are the
 * domain's own.
 *
 * The implementation is bound to a concrete CMS in `src/content/repositories.ts`
 * — the single composition point — and the current one lives in
 * `src/cms/sanity/documents/article/article.repository.ts`.
 */
export interface ArticleRepository {
  /**
   * One page of the /post listing. `page` is 1-based; `perPage` is the listing
   * section's "Posts per page", and falls back to `DEFAULT_POSTS_PER_PAGE`
   * where the editor left it empty.
   */
  getListing(page?: number, perPage?: number | null): Promise<ArticleListing>;

  /** How many articles the archive holds. */
  getCount(): Promise<number>;

  /** How many pages the archive fills at a given page size. The size comes
   *  from the listing section, so the caller has to have read the page first. */
  getTotalPages(perPage?: number | null): Promise<number>;

  /**
   * Slugs that render in-site — those with a body. The rest of the archive
   * still hands off to growthops.asia, so they are not routes.
   *
   * Feeds `generateStaticParams`, which means an implementation must read this
   * *uncached*: a build that restores a stale empty list silently ships a site
   * with zero prerendered article pages.
   */
  getSlugs(): Promise<string[]>;

  getBySlug(slug: string): Promise<PostDetailData | null>;

  /** Cheap existence check — a body is what makes an article in-site. */
  exists(slug: string): Promise<boolean>;
}

export type { ArticleListing, PostData, PostDetailData };
