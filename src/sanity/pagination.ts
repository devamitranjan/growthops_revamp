/**
 * How many posts one page of the /post listing shows, and the window that
 * follows from it.
 *
 * A module of its own, importing nothing, because all three sides of the
 * listing need these and none of them can reach the others: the Studio schema
 * (which cannot import a GROQ module without pulling `next-sanity` into the
 * Studio bundle), the repository (which imports the authenticated client), and
 * the "use client" hook (which must not reach the repository, or the read
 * token lands in the browser bundle).
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
 * through the API — so a `null`, a `0` or a `7.5` all have to land somewhere
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

/** The `[$start...$end]` slice for a 1-based page number. */
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
