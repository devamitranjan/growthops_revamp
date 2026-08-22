import { client } from "../client";
import { TESTIMONIALS_QUERY } from "../queries/testimonials";
import type { ITestimonialsData } from "../types";

/** Shared by the home page and /contact — one document, two consumers. */
export async function getTestimonials(): Promise<ITestimonialsData> {
  const data = await client.fetch(TESTIMONIALS_QUERY);

  return {
    title: data?.title ?? "",
    categories: data?.categories ?? [],
    testimonials: (data?.testimonials ?? []) as ITestimonialsData["testimonials"],
    logos: (data?.logos ?? []) as ITestimonialsData["logos"],
  };
}
