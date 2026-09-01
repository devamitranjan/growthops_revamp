/**
 * The site's URL shape, restated for the Studio.
 *
 * Presentation has to answer two questions the site already answers, from the
 * other side: "where does this document appear" (locations) and "which
 * document is this URL showing" (main documents). Both need the same three
 * facts, so they are stated once here rather than twice next door.
 *
 * This file is the copy that has to be kept honest. The originals are
 * `src/app/(site)/[...slug]/page.tsx` for the reserved segments and
 * `page.mapper.ts` / `page.schema.ts` for the depth cap; a Studio cannot
 * import a route file, and a route file cannot import the Studio, so there is
 * no way to share them. Changing either original means changing this.
 */

/** Ancestors a page may have — `MAX_DEPTH` in `page.schema.ts`. Four segments
 *  in a path, so four slugs to look up. */
export const MAX_ANCESTORS = 3;

export const MAX_SEGMENTS = MAX_ANCESTORS + 1;

/** The page document served at `/` rather than at its own path —
 *  `HOME_PAGE_PATH` in `src/content/domain/page/page.repository.ts`. */
const HOME_PATH = "home";

/** The page document served by `(site)/post/page.tsx`, which owns `?page=`. */
const POST_PATH = "post";

/**
 * First segments the catch-all route refuses, from `RESERVED_SEGMENTS` in
 * `src/app/(site)/[...slug]/page.tsx`. Next resolves a static segment before
 * the dynamic one, so a page whose path starts with any of these is not
 * reachable at that URL — the two that *are* served, `home` and `post`, are
 * served by routes of their own and handled by `pageHref` below.
 */
const RESERVED_FIRST_SEGMENTS = new Set([
  HOME_PATH,
  POST_PATH,
  "reports",
  "studio",
  "faq-preview",
]);

/** A page's path is its ancestors' slugs joined to its own — the walk in
 *  `buildPathIndex`, done from the leaf because the Studio can dereference
 *  upwards in a single read. */
export function pagePath(segments: readonly (string | null | undefined)[]) {
  return segments.filter((segment): segment is string => !!segment).join("/");
}

/**
 * The URL a page path is served at, or `null` when nothing serves it.
 *
 * `null` is a real answer, not a failure: a page slugged `reports` collides
 * with /reports/[slug] and an editor should be told that rather than handed a
 * link to a 404.
 */
export function pageHref(path: string): string | null {
  if (!path) return null;

  const [first] = path.split("/");

  if (path === HOME_PATH) return "/";
  if (path === POST_PATH) return "/post";

  return RESERVED_FIRST_SEGMENTS.has(first) ? null : `/${path}`;
}

export function reportHref(slug: string | null | undefined): string | null {
  return slug ? `/reports/${slug}` : null;
}

/**
 * A GROQ filter matching the one `page` document served at `segments`.
 *
 * The path walk inverted. `buildPathIndex` reads every edge and walks up in
 * TypeScript; here the URL is already known, so the chain can be spelled out
 * as nested dereferences — `parent->slug.current` for the segment above,
 * `parent->parent->slug.current` for the one above that. The terminating
 * `!defined(...)` is what stops `/seo` matching a page that is really at
 * `/services/seo`: the chain has to end exactly where the URL does.
 */
export function pageFilter(segments: readonly string[]): {
  filter: string;
  params: Record<string, string>;
} | undefined {
  if (!segments.length || segments.length > MAX_SEGMENTS) return undefined;
  if (RESERVED_FIRST_SEGMENTS.has(segments[0])) return undefined;

  // Nearest ancestor first, which is also `parent->` nesting order.
  const ancestors = segments.slice(0, -1).reverse();

  const params: Record<string, string> = { slug: segments[segments.length - 1] };

  const chain = ancestors.map((slug, index) => {
    params[`a${index}`] = slug;

    return `${"parent->".repeat(index + 1)}slug.current == $a${index}`;
  });

  return {
    filter: [
      `_type == "page"`,
      `slug.current == $slug`,
      ...chain,
      `!defined(${"parent->".repeat(ancestors.length)}parent)`,
    ].join(" && "),
    params,
  };
}
