import { NextResponse } from "next/server";
import { getArticle } from "@/sanity/repositories/article";

export async function GET(
  _request: Request,
  ctx: RouteContext<"/api/articles/[slug]">,
) {
  const { slug } = await ctx.params;
  const article = await getArticle(slug);

  if (!article) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(article);
}
