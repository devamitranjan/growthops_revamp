import type { ITestimonialsData } from "./testimonial.types";

/**
 * The shared testimonials block.
 *
 * A singleton in the content model and a genuinely shared one: the home page
 * and /contact both show the same quotes, and an editor changes them once.
 * How the sharing is expressed is the CMS's business — Sanity stores a
 * reference the adapter dereferences, another CMS might link by entry id — and
 * neither shape reaches the application.
 */
export interface TestimonialRepository {
  get(): Promise<ITestimonialsData>;
}

export type { ITestimonialsData };
