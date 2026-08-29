import { client } from "../client";
import { sanityFetch } from "../live";
import { PAGE_INDEX_QUERY, PAGE_QUERY } from "../queries/page";
import { documentTags, uncached } from "../tags";
import type { PageData } from "../types";
import { normaliseSections, normaliseSeo } from "./sections";

/** The home page's slug. It has no parent, so it is also its full path. */
export const HOME_PAGE_SLUG = "home";

/** Ancestors allowed above a page. Mirrors `MAX_DEPTH` in
 *  `schema-types/documents/page.ts`, which stops an editor exceeding it; this
 *  copy is what keeps the walk below terminating regardless. */
const MAX_PATH_DEPTH = 3;

/** One row of `PAGE_INDEX_QUERY` — an edge in the page tree. Structurally
 *  identical to the generated `PAGE_INDEX_QUERY_RESULT[number]`, written out
 *  here because every other type in `sanity/types` is hand-written and a lone
 *  import from `sanity.types.ts` would tie this file to a typegen run. */
interface PageIndexRow {
  _id: string;
  slug: string | null;
  parentId: string | null;
}

/**
 * Path -> document id for every page that resolves to a servable URL.
 *
 * The walk is upwards from each page, and it drops rather than throws on the
 * three ways a chain can be unservable: a parent that no longer exists
 * (deleted out from under the reference), a chain deeper than
 * `MAX_PATH_DEPTH`, and a cycle. Dropping is the right failure — one broken
 * page 404s, where a throw here would take down every route that resolves a
 * path, including the ones that are fine.
 *
 * Schema validation already blocks all three for anything published through
 * the Studio. This exists because it cannot block the fourth case: deleting a
 * page that other pages still point at, which no validation on the *child*
 * ever sees.
 */
function buildPathIndex(rows: PageIndexRow[]): Map<string, string> {
  const byId = new Map<string, PageIndexRow>();

  for (const row of rows) {
    if (row.slug) byId.set(row._id, row);
  }

  const paths = new Map<string, string>();

  for (const row of byId.values()) {
    const segments: string[] = [];
    const seen = new Set<string>();

    let cursor: PageIndexRow | undefined = row;

    while (cursor) {
      if (seen.has(cursor._id)) {
        // A cycle. Abandon this page rather than looping.
        segments.length = 0;
        break;
      }

      seen.add(cursor._id);
      segments.unshift(cursor.slug as string);

      if (segments.length > MAX_PATH_DEPTH + 1) {
        segments.length = 0;
        break;
      }

      if (!cursor.parentId) break;

      const parent = byId.get(cursor.parentId);

      if (!parent) {
        // Dangling parent reference — the ancestor was deleted, so there is no
        // honest path to serve this page at.
        segments.length = 0;
        break;
      }

      cursor = parent;
    }

    if (!segments.length) continue;

    const path = segments.join("/");

    // Two pages can collide on a path only by sharing both a parent and a
    // slug. First one indexed wins and the other 404s; silently serving one at
    // the other's URL would be worse.
    if (!paths.has(path)) paths.set(path, row._id);
  }

  return paths;
}

/** The path index, read the same way every other page read is tagged so a
 *  published slug or parent change invalidates it too. */
async function getPathIndex(): Promise<Map<string, string>> {
  const { data } = await sanityFetch({
    query: PAGE_INDEX_QUERY,
    stega: false,
    tags: documentTags("page"),
  });

  return buildPathIndex(data ?? []);
}

/**
 * One composed page by its full URL path — `about`, or `services/seo`.
 *
 * `testimonialsSection` and `newsroomArticle` are in the tag list because the
 * section projections dereference them — the testimonials block stores a
 * reference and follows it with `source->`, and the newsroom listing follows
 * its article list the same way. Tag only "page" and editing a testimonial
 * leaves the home page serving the old quotes forever: the webhook drops
 * `sanity:testimonialsSection`, this entry is not under that tag, and a tagged
 * read is stored with no expiry to age it out.
 */
export async function getPage(path: string): Promise<PageData | null> {
  const id = (await getPathIndex()).get(path);

  if (!id) return null;

  const { data: page } = await sanityFetch({
    query: PAGE_QUERY,
    params: { id },
    stega: false,
    tags: documentTags("page", "testimonialsSection", "newsroomArticle"),
  });

  if (!page) return null;

  return {
    path,
    slug: page.slug ?? path,
    title: page.title ?? "",
    seo: normaliseSeo(page.seo),
    sections: normaliseSections(page.sections),
  };
}

export async function getHomePage(): Promise<PageData | null> {
  return getPage(HOME_PAGE_SLUG);
}

/** Every servable page path, for `generateStaticParams` on /[...slug].
 *  Reads uncached — see `uncached`. */
export async function getPagePaths(): Promise<string[]> {
  const rows = await client.fetch(PAGE_INDEX_QUERY, {}, uncached());

  return [...buildPathIndex(rows ?? []).keys()];
}
