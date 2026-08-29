import { NextResponse } from "next/server";
import { reportRepository } from "@/content/repositories";

export async function GET(
  _request: Request,
  ctx: RouteContext<"/api/reports/[slug]">,
) {
  const { slug } = await ctx.params;
  const report = await reportRepository.getBySlug(slug);

  if (!report) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(report);
}
