import { NextResponse } from "next/server";
import { testimonialRepository } from "@/content/repositories";

export async function GET() {
  return NextResponse.json(await testimonialRepository.get());
}
