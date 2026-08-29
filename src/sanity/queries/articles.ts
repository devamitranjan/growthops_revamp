import { defineQuery } from "next-sanity";

/**
 * Listing query for /post. Paginated in GROQ so the CMS never ships the whole
 * archive to render one page.
 *
 * Ordered by the explicit `order` field, not by date: only three of the sixty
 * articles carry a publish date, so sorting by one would scramble the curated
 * listing.
 *
 * The `[$start...$end]` window is computed by `articlePageRange` in
 * `sanity/pagination.ts`, from a page size the listing section carries.
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
