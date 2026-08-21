import { hasPostDetail } from "../fixtures/article-bodies";
import { POSTS_PER_PAGE, pageHeading, posts } from "../fixtures/articles";
import type { PostData } from "../types";

export { POSTS_PER_PAGE };

export interface ArticleListing {
  heading: string;
  articles: PostData[];
  page: number;
  totalPages: number;
}

export async function getArticleCount(): Promise<number> {
  return posts.length;
}

export async function getTotalArticlePages(): Promise<number> {
  return Math.ceil((await getArticleCount()) / POSTS_PER_PAGE);
}

/** One page of the /post listing. `page` is 1-based. */
export async function getArticles(page = 1): Promise<ArticleListing> {
  const totalPages = await getTotalArticlePages();
  const start = (page - 1) * POSTS_PER_PAGE;

  return {
    heading: pageHeading,
    articles: posts.slice(start, start + POSTS_PER_PAGE),
    page,
    totalPages,
  };
}

/** Slugs with a body in the CMS — these render in-site at /post/[slug];
 *  the rest still hand off to growthops.asia. Feeds `generateStaticParams`. */
export async function getArticleSlugs(): Promise<string[]> {
  return posts.filter((post) => hasPostDetail(post.slug)).map((post) => post.slug);
}
