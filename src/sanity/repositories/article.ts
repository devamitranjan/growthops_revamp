import { getPostDetail, hasPostDetail } from "../fixtures/article-bodies";
import type { PostDetailData } from "../types";

export async function getArticle(
  slug: string,
): Promise<PostDetailData | null> {
  return getPostDetail(slug) ?? null;
}

export async function articleExists(slug: string): Promise<boolean> {
  return hasPostDetail(slug);
}
