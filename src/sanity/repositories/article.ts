import { sanityFetch } from "../live";
import { ARTICLE_EXISTS_QUERY, ARTICLE_QUERY } from "../queries/article";
import { documentTags } from "../tags";
import type { PostDetailData } from "../types";

export async function getArticle(slug: string): Promise<PostDetailData | null> {
  const { data: article } = await sanityFetch({
    query: ARTICLE_QUERY,
    params: { slug },
    stega: false,
    tags: documentTags("article"),
  });
  if (!article || !Array.isArray(article.content) || article.content.length === 0) {
    return null;
  }
  return article as unknown as PostDetailData;
}

export async function articleExists(slug: string): Promise<boolean> {
  const { data } = await sanityFetch({
    query: ARTICLE_EXISTS_QUERY,
    params: { slug },
    stega: false,
    tags: documentTags("article"),
  });
  return data;
}
