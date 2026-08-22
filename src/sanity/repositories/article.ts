import { client } from "../client";
import { ARTICLE_EXISTS_QUERY, ARTICLE_QUERY } from "../queries/article";
import type { PostDetailData } from "../types";

export async function getArticle(slug: string): Promise<PostDetailData | null> {
  const article = await client.fetch(ARTICLE_QUERY, { slug });
  if (!article || !Array.isArray(article.content) || article.content.length === 0) {
    return null;
  }
  return article as unknown as PostDetailData;
}

export async function articleExists(slug: string): Promise<boolean> {
  return client.fetch(ARTICLE_EXISTS_QUERY, { slug });
}
