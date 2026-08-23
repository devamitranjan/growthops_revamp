import { sanityFetch } from "../live";
import { NEWSROOM_ARTICLES_QUERY, NEWSROOM_PAGE_QUERY } from "../queries/newsroom";
import { documentTags } from "../tags";
import type { NewsroomArticle, NewsroomPageData } from "../types";

/**
 * Everything /newsroom renders: the page copy and its cards.
 *
 * Two reads rather than one nested query, so an empty listing still renders
 * the page. The page-copy read is tagged with only the type it touches, so a
 * new card does not drop it; the listing read carries `newsroomPage` too,
 * because the pinned order it sorts by lives on that singleton.
 *
 * Returns `null` until the singleton exists, and the route 404s on that rather
 * than throwing the way `getSiteSettings` does. Site settings are read by
 * every page, so a missing one is a broken deployment; this one is read by a
 * single route, and a build that dies because an editor has not published one
 * document yet would take the whole site with it.
 */
export async function getNewsroom(): Promise<NewsroomPageData | null> {
  const [page, articles] = await Promise.all([
    sanityFetch({
      query: NEWSROOM_PAGE_QUERY,
      stega: false,
      tags: documentTags("newsroomPage"),
    }).then((result) => result.data),
    sanityFetch({
      query: NEWSROOM_ARTICLES_QUERY,
      stega: false,
      tags: documentTags("newsroomPage", "newsroomArticle"),
    }).then((result) => result.data),
  ]);

  if (!page) return null;

  return {
    ...(page as unknown as Omit<NewsroomPageData, "articles">),
    articles: articles as unknown as NewsroomArticle[],
  };
}
