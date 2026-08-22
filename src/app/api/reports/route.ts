import { NextResponse } from "next/server";
import { getReports } from "@/sanity/repositories/reports";

export async function GET() {
  return NextResponse.json(await getReports());
}
