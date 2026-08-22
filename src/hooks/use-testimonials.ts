"use client";

import type { QueryResponseInitial } from "@sanity/react-loader";

import { useQuery } from "@/sanity/loader";
import { TESTIMONIALS_QUERY } from "@/sanity/queries/testimonials";
import type { ITestimonialsData } from "@/sanity/types";

/** See `use-reports` for why `initial` is required rather than optional. */
export function useTestimonials(
  initial: QueryResponseInitial<ITestimonialsData>,
) {
  return useQuery<ITestimonialsData>(TESTIMONIALS_QUERY, {}, { initial });
}
