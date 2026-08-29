import { NextResponse } from "next/server";
import { articleRepository } from "@/content/repositories";

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const pageParam = params.get("page") ?? "1";
  const perPageParam = params.get("perPage");

  if (!/^\d+$/.test(pageParam)) {
    return NextResponse.json({ error: "Invalid page" }, { status: 400 });
  }

  // Optional: a caller that knows the section's page size can ask for the same
  // window the page renders. Without it the default applies, and the response
  // says which size it used.
  if (perPageParam !== null && !/^\d+$/.test(perPageParam)) {
    return NextResponse.json({ error: "Invalid perPage" }, { status: 400 });
  }

  return NextResponse.json(
    await articleRepository.getListing(
      Number(pageParam),
      perPageParam === null ? undefined : Number(perPageParam),
    ),
  );
}
