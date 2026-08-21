import { NextResponse } from "next/server";
import { getTestimonials } from "@/sanity/repositories/testimonials";

export async function GET() {
  return NextResponse.json(await getTestimonials());
}
