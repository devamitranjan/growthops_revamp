/**
 * The projection every Portable Text body is read through.
 *
 * Two places author long-form copy against `postBody` — an article's own
 * `content` and the `richTextSection` an editor can drop on any page — and
 * both hand the result to the same `mapRichText`. That mapper expects images
 * already flattened to a URL plus intrinsic dimensions, so the flattening has
 * to happen identically on both sides; keeping one fragment is what makes
 * "identically" a fact rather than a convention.
 *
 * Real asset metadata wins when an image has been uploaded; the authored
 * width/height are the fallback for images still pointing at /public.
 *
 * Interpolate it into the body array itself — `content[]{ ... }` — not around
 * it.
 */
export const RICH_TEXT_PROJECTION = `
  ...,
  _type == "postImage" => {
    _key,
    _type,
    alt,
    caption,
    "src": coalesce(image.asset->url, legacySrc),
    "width": coalesce(image.asset->metadata.dimensions.width, width),
    "height": coalesce(image.asset->metadata.dimensions.height, height)
  },
  _type == "block" => { ..., markDefs[]{ ... } }
`;
