import { testimonials } from "../fixtures/testimonials";
import type { ITestimonialsData } from "../types";

/** Shared by the home page and /contact — previously duplicated inline in
 *  both route files. */
export async function getTestimonials(): Promise<ITestimonialsData> {
  return testimonials;
}
