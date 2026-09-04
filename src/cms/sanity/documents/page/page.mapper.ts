import type { PageData } from "@/content/domain/page/page.types";
import { mapSeo, mapSections } from "../../sections/section.mapper";

/**
 * Sanity's page projections -> `PageData`, and the page tree -> URL paths.
 *
 * The path walk is the interesting half. A page's URL is not a field on the
 * document: it is this page's slug joined to every ancestor's, so resolving
 * `/services/seo` means reading the whole tree of edges and walking upwards.
 * That is Sanity's content model showing through, which is exactly why it
 * happens here — `PageRepository.getByPath` asks for a path, and a CMS that
 * stores the full path outright just answers directly.
 */

/** Ancestors allowed above a page. Mirrors `MAX_DEPTH` in `page.schema.ts`,
 *  which stops an editor exceeding it; this copy is what keeps the walk below
 *  terminating regardless. */
const MAX_PATH_DEPTH = 3;

/** One row of `PAGE_INDEX_QUERY` — an edge in the page tree. */
export interface PageIndexRow {
  _id: string;
  slug: string | null;
  parentId: string | null;
}

/**
 * Path -> document id for every page that resolves to a servable URL.
 *
 * The walk drops rather than throws on the three ways a chain can be
 * unservable: a parent that no longer exists (deleted out from under the
 * reference), a chain deeper than `MAX_PATH_DEPTH`, and a cycle. Dropping is
 * the right failure — one broken page 404s, where a throw here would take down
 * every route that resolves a path, including the ones that are fine.
 *
 * Schema validation already blocks all three for anything published through
 * the Studio. This exists because it cannot block the fourth case: deleting a
 * page that other pages still point at, which no validation on the *child*
 * ever sees.
 */
export function buildPathIndex(
  rows: readonly PageIndexRow[] | null,
): Map<string, string> {
  const byId = new Map<string, PageIndexRow>();

  for (const row of rows ?? []) {
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

/** `PAGE_QUERY`. */
interface RawPage {
  slug?: string | null;
  title?: string | null;
  seo?: {
    jsonld?: Array<{ schema: string }>;
  } | null;
  sections?: unknown;
}

/** `path` is supplied by the caller rather than read: it is what the lookup
 *  resolved, and the document has no field that carries it. */
export function mapPage(row: RawPage, path: string): PageData {
  return {
    path,
    slug: row.slug ?? path,
    title: row.title ?? "",
    seo: mapSeo(row.seo),
    sections: mapSections(row.sections),
  };
}
