import { defineQuery } from "next-sanity";

/** Page-level copy for /newsroom. Singleton, pinned in `structure.ts`. */
export const NEWSROOM_PAGE_QUERY = defineQuery(`*[_id == "newsroomPage"][0]{
  heading,
  readMoreLabel,
  "seoTitle": seo.title,
  "seoDescription": seo.description
}`);

const NEWSROOM_ARTICLE_FIELDS = `
  "id": _id,
  title,
  href,
  publishedAt,
  excerpt,
  "imgSrc": image.asset->url,
  alt
`;

/**
 * The cards, in the order they sit on the `newsroomPage` singleton.
 *
 * That list is the listing: an article is on /newsroom because an editor put
 * it there, and taking it out of the list is how you hide it again. There is
 * no date-sorted fallback behind it on purpose — a fallback would put articles
 * on the page that nobody chose to put there, which is the opposite of what
 * the list is for. The cost is the thing to remember: a new `newsroomArticle`
 * document is invisible on the site until it is added here.
 *
 * `coalesce(..., [])` keeps a page with no list an empty grid rather than a
 * `null` the renderer would have to guard. The `defined(@->publishedAt)`
 * filter drops entries whose target is gone or unpublished — a reference to a
 * deleted document dereferences to `null`, and a `null` card would crash the
 * map over them.
 */
export const NEWSROOM_ARTICLES_QUERY = defineQuery(`
  coalesce(
    *[_id == "newsroomPage"][0].articles[defined(@->publishedAt)]->{${NEWSROOM_ARTICLE_FIELDS}},
    []
  )
`);
