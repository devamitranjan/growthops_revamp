import { defineQuery } from "next-sanity";

/** The projection the testimonials section needs, reused by the page builder. */
export const TESTIMONIALS_PROJECTION = `{
  title,
  categories,
  testimonials[]{
    "id": _key, category, audioSrc,
    "imgSrc": image.asset->url, alt, quote, position
  },
  logos[]{ "id": _key, "src": logo.asset->url, alt }
}`;

export const TESTIMONIALS_QUERY = defineQuery(`*[_type == "testimonialsSection"][0]{
  title,
  categories,
  testimonials[]{
    "id": _key, category, audioSrc,
    "imgSrc": image.asset->url, alt, quote, position
  },
  logos[]{ "id": _key, "src": logo.asset->url, alt }
}`);
