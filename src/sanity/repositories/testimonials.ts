import { sanityFetch } from "../live";
import { TESTIMONIALS_QUERY } from "../queries/testimonials";
import { documentTags } from "../tags";
import type { ITestimonialsData } from "../types";

/** Shared by the home page and /contact — one document, two consumers. */
export async function getTestimonials(): Promise<ITestimonialsData> {
  const { data } = await sanityFetch({
    query: TESTIMONIALS_QUERY,
    stega: false,
    tags: documentTags("testimonialsSection"),
  });

  return {
    title: data?.title ?? "",
    categories: data?.categories ?? [],
    testimonials: (data?.testimonials ?? []) as ITestimonialsData["testimonials"],
    logos: (data?.logos ?? []) as ITestimonialsData["logos"],
  };
}
