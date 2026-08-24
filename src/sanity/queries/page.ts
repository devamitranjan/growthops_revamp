import { defineQuery } from "next-sanity";

import { SECTIONS_PROJECTION } from "./sections";

/**
 * One composed page and every section in it — the same read for the home page
 * and for every editor-created page, since they are the same document type.
 *
 * The per-section projections live in `./sections.ts`.
 */
export const PAGE_QUERY = defineQuery(`*[_type == "page" && slug.current == $slug][0]{
  "slug": slug.current,
  title,
  seo{
    title,
    description,
    "ogImage": ogImage.asset->url
  },
  sections[]{${SECTIONS_PROJECTION}}
}`);

/** Feeds `generateStaticParams` for /[slug]. The home page's own slug is in
 *  here too; the route drops it along with the other reserved slugs. */
export const PAGE_SLUGS_QUERY = defineQuery(
  `*[_type == "page" && defined(slug.current)].slug.current`,
);
