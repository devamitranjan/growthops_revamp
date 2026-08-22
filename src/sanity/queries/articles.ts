import { defineQuery } from "next-sanity";

/**
 * Listing query for /post. Paginated in GROQ so the CMS never ships the whole
 * archive to render one page.
 *
 * Ordered by the explicit `order` field, not by date: only three of the sixty
 * articles carry a publish date, so sorting by one would scramble the curated
 * listing.
 */
export const ARTICLES_QUERY = defineQuery(`*[_type == "article"] | order(order asc) [$start...$end]{
  "slug": slug.current,
  href,
  "imgSrc": coalesce(featuredImage.asset->url, featuredImageSrc),
  title,
  subtitle,
  authorName
}`);

export const ARTICLES_COUNT_QUERY = defineQuery(`count(*[_type == "article"])`);

/**
 * Slugs that render in-site, i.e. those with a body. The rest still hand off
 * to growthops.asia via `href`. Feeds `generateStaticParams` for /post/[slug].
 */
export const ARTICLE_SLUGS_QUERY = defineQuery(
  `*[_type == "article" && defined(slug.current) && count(content) > 0].slug.current`,
);

/** Matches the 10-per-page pagination on growthops.asia/post. */
export const POSTS_PER_PAGE = 10;

/**
 * The `[$start...$end]` window for a 1-based page number.
 *
 * This lives beside the query rather than in `repositories/articles.ts`
 * because both sides of the loader need it, and the repository imports the
 * authenticated client — a "use client" hook reaching in there for the page
 * size would drag the read token into the browser bundle.
 */
export function articlePageRange(page: number) {
  const safePage = Math.max(1, Math.floor(page) || 1);
  const start = (safePage - 1) * POSTS_PER_PAGE;
  return { page: safePage, start, end: start + POSTS_PER_PAGE };
}
