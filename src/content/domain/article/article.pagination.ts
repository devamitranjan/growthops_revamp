/**
 * How the /post archive is cut into pages.
 *
 * Pure arithmetic over a CMS-authored page size, and CMS-agnostic on purpose:
 * the Sanity adapter uses it to build the `[$start...$end]` slice its GROQ
 * wants, the Studio's reorder pane uses it to show the same split an editor
 * will see on the site, and the route uses it to decide which `?page=` numbers
 * exist. Whichever CMS supplies the number, the window it implies is the same.
 *
 * This module imports nothing, and must keep importing nothing.
 */

/** Used when the section leaves the field empty — the ten-per-page the
 *  listing shipped with, and what growthops.asia/post serves. */
export const DEFAULT_POSTS_PER_PAGE = 10;

export const MIN_POSTS_PER_PAGE = 1;

/** A ceiling rather than a limit anyone should reach: the listing renders
 *  every card server-side, and a page of hundreds is a slow page, not a
 *  configured one. Mirrored by the schema's `max()` so the Studio says no
 *  first. */
export const MAX_POSTS_PER_PAGE = 48;

/**
 * The CMS value made safe to compute with.
 *
 * The schema validates the field, but a published document predating the
 * field has no value at all, and validation is not enforced on content pushed
 * through an API — so a `null`, a `0` or a `7.5` all have to land somewhere
 * sensible rather than produce an empty page or a fractional window.
 */
export function resolvePostsPerPage(value?: number | null): number {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return DEFAULT_POSTS_PER_PAGE;
  }

  return Math.min(
    MAX_POSTS_PER_PAGE,
    Math.max(MIN_POSTS_PER_PAGE, Math.floor(value)),
  );
}

/** The half-open `[start, end)` window for a 1-based page number. */
export function articlePageRange(page: number, perPage?: number | null) {
  const size = resolvePostsPerPage(perPage);
  const safePage = Math.max(1, Math.floor(page) || 1);
  const start = (safePage - 1) * size;

  return { page: safePage, perPage: size, start, end: start + size };
}

/** Total pages for a post count. Zero posts is zero pages, not one empty one
 *  — the pagination hides itself below two, and the route 404s anything the
 *  count cannot reach. */
export function totalPagesFor(count: number, perPage?: number | null): number {
  return Math.ceil(count / resolvePostsPerPage(perPage));
}
