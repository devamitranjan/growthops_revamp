import { NextResponse } from "next/server";
import { reportRepository } from "@/content/repositories";

export async function GET() {
  return NextResponse.json(await reportRepository.getAll());
}
