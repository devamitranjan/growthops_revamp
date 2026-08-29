import { defineQuery } from "next-sanity";

/**
 * Every read of the `article` document type — the /post listing and one
 * article's detail page. Two reads of one document type, so they live in one
 * file; split them back out only if this grows past being readable at a
 * glance.
 */

/**
 * Listing query for /post. Paginated in GROQ so the CMS never ships the whole
 * archive to render one page.
 *
 * Ordered by the explicit `order` field, not by date: only three of the sixty
 * articles carry a publish date, so sorting by one would scramble the curated
 * listing.
 *
 * The `[$start...$end]` window is computed by `articlePageRange` in
 * `utils/constants.ts`, from a page size the listing section carries.
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

/**
 * One article body as Portable Text.
 *
 * `postImage` resolves to the same flat shape the renderer used when bodies
 * were a custom block union: a URL string plus intrinsic width and height.
 * Real asset metadata wins when an image has been uploaded; the authored
 * width/height are the fallback for images still pointing at /public.
 */
export const ARTICLE_QUERY = defineQuery(`*[_type == "article" && slug.current == $slug][0]{
  "slug": slug.current,
  category,
  title,
  authorName,
  publishDate,
  "featuredImage": coalesce(featuredImage.asset->url, featuredImageSrc),
  content[]{
    ...,
    _type == "postImage" => {
      _key,
      _type,
      alt,
      caption,
      "src": coalesce(image.asset->url, legacySrc),
      "width": coalesce(image.asset->metadata.dimensions.width, width),
      "height": coalesce(image.asset->metadata.dimensions.height, height)
    },
    _type == "block" => { ..., markDefs[]{ ... } }
  }
}`);

/** Cheap existence check for /post/[slug] — a body is what makes it in-site. */
export const ARTICLE_EXISTS_QUERY = defineQuery(
  `count(*[_type == "article" && slug.current == $slug && count(content) > 0]) > 0`,
);
