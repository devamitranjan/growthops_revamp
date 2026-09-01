import type { PageRepository } from "@/content/domain/page/page.repository";
import { HOME_PAGE_PATH } from "@/content/domain/page/page.repository";
import type { PageData } from "@/content/domain/page/page.types";
import { client } from "../../client";
import { sanityFetch, stegaEnabled } from "../../live";
import { documentTags, uncached } from "../../tags";
import { buildPathIndex, mapPage } from "./page.mapper";
import { PAGE_INDEX_QUERY, PAGE_QUERY } from "./page.queries";

/**
 * `PageRepository`, over Sanity.
 *
 * SERVER ONLY — see the note on the article repository; the same token is
 * behind `client` and `sanityFetch` here.
 *
 * Lookup is two reads, not one: a page's URL is the slug of every ancestor
 * joined to its own, so the tree is read first and walked in TypeScript (where
 * the depth cap and the cycle guard can be explicit — see `page.mapper.ts`),
 * then the document is read by id. Both are cheap and both sit under the same
 * `sanity:page` tag.
 */

/**
 * The path index, read the same way every other page read is tagged so a
 * published slug or parent change invalidates it too.
 *
 * `stega: false` is load-bearing here, not boilerplate. Every string this
 * query returns — `_id`, `slug`, `parentId` — is used as a map key or a path
 * segment by `buildPathIndex`, never rendered. Encoded characters would not
 * show up wrong; they would stop matching, and a page would 404 at the URL it
 * is published at. Same for `getPaths` below, which feeds
 * `generateStaticParams`.
 */
async function getPathIndex(): Promise<Map<string, string>> {
  const { data } = await sanityFetch({
    query: PAGE_INDEX_QUERY,
    stega: false,
    tags: documentTags("page"),
  });

  return buildPathIndex(data);
}

/**
 * One composed page by its full URL path.
 *
 * `testimonialsSection` and `newsroomArticle` are in the tag list because the
 * section projections dereference them — the testimonials block stores a
 * reference and follows it with `source->`, and the newsroom listing follows
 * its article list the same way. Tag only "page" and editing a testimonial
 * leaves the home page serving the old quotes forever: the webhook drops
 * `sanity:testimonialsSection`, this entry is not under that tag, and a tagged
 * read is stored with no expiry to age it out.
 */
async function getByPath(path: string): Promise<PageData | null> {
  const id = (await getPathIndex()).get(path);

  if (!id) return null;

  // The one page read whose output is rendered as prose, so the one that asks
  // for stega — inside a preview only. `mapPage` cleans it back off the fields
  // that are not copy; see `../../stega.ts`.
  const { data } = await sanityFetch({
    query: PAGE_QUERY,
    params: { id },
    stega: await stegaEnabled(),
    tags: documentTags("page", "testimonialsSection", "newsroomArticle"),
  });

  if (!data) return null;

  return mapPage(data, path);
}

export const sanityPageRepository: PageRepository = {
  getByPath,

  getHomePage() {
    return getByPath(HOME_PAGE_PATH);
  },

  /** Reads uncached — see `uncached()`, and the note on the contract. */
  async getPaths() {
    const rows = await client.fetch(PAGE_INDEX_QUERY, {}, uncached());

    return [...buildPathIndex(rows).keys()];
  },
};
