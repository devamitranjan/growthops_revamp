export const TESTIMONIALS_QUERY = `*[_type == "testimonialsSection"][0]{
  title,
  categories,
  testimonials[]{
    "id": _key, category, audioSrc,
    "imgSrc": image.asset->url, alt, quote, position
  },
  logos[]{ "id": _key, "src": logo.asset->url, alt }
}`;
