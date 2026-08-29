import { defineQuery } from "next-sanity";

import { SECTIONS_PROJECTION } from "./sections";

/**
 * One composed page and every section in it — the same read for the home page
 * and for every editor-created page, since they are the same document type.
 *
 * Lookup is by `_id`, not by slug, because a page's URL is no longer a
 * property of the document alone: it is the slug of every ancestor joined to
 * its own. `PAGE_INDEX_QUERY` below resolves a path to an id; this then reads
 * the document. Two round trips, both cheap and both under the same
 * `sanity:page` tag, in exchange for a path resolution that can be depth-
 * limited and cycle-guarded in one place — see `repositories/page.ts`.
 *
 * The per-section projections live in `./sections.ts`.
 */
export const PAGE_QUERY = defineQuery(`*[_type == "page" && _id == $id][0]{
  "slug": slug.current,
  title,
  seo{
    title,
    description,
    "ogImage": ogImage.asset->url
  },
  sections[]{${SECTIONS_PROJECTION}}
}`);

/**
 * Every page reduced to what building a URL needs: its own segment and the
 * page it hangs off.
 *
 * Deliberately not a `parent->` dereference. A dereference resolves one level
 * per `->`, so it would cap nesting at however many arrows are typed here and
 * fail silently past that; a flat list of edges lets the walk happen in
 * TypeScript, where the depth cap and the cycle guard are explicit and
 * testable. It is also the whole tree in one small read — the same result
 * feeds `generateStaticParams` and every individual lookup.
 */
export const PAGE_INDEX_QUERY = defineQuery(
  `*[_type == "page" && defined(slug.current)]{
    _id,
    "slug": slug.current,
    "parentId": parent._ref
  }`,
);
