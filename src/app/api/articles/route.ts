import { NextResponse } from "next/server";
import { getArticles } from "@/sanity/repositories/articles";

export async function GET(request: Request) {
  const pageParam = new URL(request.url).searchParams.get("page") ?? "1";

  if (!/^\d+$/.test(pageParam)) {
    return NextResponse.json({ error: "Invalid page" }, { status: 400 });
  }

  return NextResponse.json(await getArticles(Number(pageParam)));
}
