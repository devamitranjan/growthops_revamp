/** Pages that must exist exactly once, pinned to a fixed document id so an
 *  editor gets one editable page rather than a "create new" list. Each id is
 *  also the route it serves, which is why they never change. */
export const PINNED_PAGES = [
  { id: "page-home", title: "Home page" },
  { id: "page-contact", title: "Contact page" },
  { id: "page-newsroom", title: "Newsroom page" },
  { id: "page-post", title: "Post page" },
] as const;

export const PINNED_PAGE_IDS = PINNED_PAGES.map((page) => page.id);

/** The document types that carry a `sections` array. A new composed document
 *  type needs adding here, or it will be missing from every section's usage
 *  list even though the section is on it. */
export const COMPOSED_TYPES = ["page", "report"] as const;
