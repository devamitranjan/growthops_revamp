/**
 * An image, as the application sees one.
 *
 * A resolved URL and the text describing it — never a CMS asset handle. Sanity
 * hands back `{ asset: { _ref: "image-…" } }`, Contentful hands back
 * `{ sys: { id } }`, and neither shape ever reaches a component: the adapter
 * resolves it to a URL on the way out (see `src/cms/sanity/image.ts` and the
 * `.asset->url` projections in the GROQ).
 *
 * `width`/`height` are present only where the layout needs the intrinsic size
 * — an article body image sizes its own frame from them.
 */
export interface ContentImage {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
}
