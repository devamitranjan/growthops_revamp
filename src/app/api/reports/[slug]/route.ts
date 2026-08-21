import { NextResponse } from "next/server";
import { getReport } from "@/sanity/repositories/reports";

export async function GET(
  _request: Request,
  ctx: RouteContext<"/api/reports/[slug]">,
) {
  const { slug } = await ctx.params;
  const report = await getReport(slug);

  if (!report) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(report);
}
