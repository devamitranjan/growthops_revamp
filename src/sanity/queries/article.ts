import { defineQuery } from "next-sanity";

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
