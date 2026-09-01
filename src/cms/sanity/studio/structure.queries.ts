/**
 * The sections on one document, draft included.
 *
 * `perspective: "drafts"` is what makes the list match what the editor is
 * looking at: a section added but not yet published exists only on the draft,
 * and a sidebar that ignored it would contradict the form next to it.
 */
export const SECTIONS_QUERY = `*[_id == $id][0].sections[]{
  _key,
  _type,
  title,
  heading,
  postsPerPage,
  "bannerTitle": banner.title
}` as const;

/**
 * Every article in listing order — the same ordering `ARTICLES_QUERY` uses to
 * build /post, so the pages this pane shows are the pages the site serves.
 *
 * Ids only: the pane hands each page's window to a document list rather than
 * rendering previews itself, so the cards stay the ones the article schema
 * defines.
 */
export const ARTICLE_ORDER_QUERY =
  `*[_type == "article"] | order(order asc) { _id }` as const;

/**
 * Every document carrying at least one instance of a given section.
 *
 * Same `drafts` perspective as above and for the same reason: a section only
 * just dropped onto a page should already show that page as a user of it.
 */
export const SECTION_USAGE_QUERY =
  `*[_type in $types && count(sections[_type == $sectionType]) > 0]
  | order(_type asc, title asc) {
    _id,
    _type,
    title,
    "uses": count(sections[_type == $sectionType])
  }` as const;
