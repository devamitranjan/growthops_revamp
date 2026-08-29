import type { TestimonialRepository } from "@/content/domain/testimonial/testimonial.repository";
import { sanityFetch } from "../../live";
import { documentTags } from "../../tags";
import { mapTestimonials } from "./testimonial.mapper";
import { TESTIMONIALS_QUERY } from "./testimonial.queries";

/**
 * `TestimonialRepository`, over Sanity. SERVER ONLY — `sanityFetch` carries
 * the read token.
 *
 * One document, two consumers: the home page and /contact both compose a
 * testimonials block, and both resolve to these quotes. In Sanity the sharing
 * is a reference the page projection follows with `source->`, which is why the
 * page and report reads are tagged `sanity:testimonialsSection` as well as
 * their own type.
 */
export const sanityTestimonialRepository: TestimonialRepository = {
  async get() {
    const { data } = await sanityFetch({
      query: TESTIMONIALS_QUERY,
      stega: false,
      tags: documentTags("testimonialsSection"),
    });

    return mapTestimonials(data);
  },
};
