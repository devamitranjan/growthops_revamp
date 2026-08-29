import { defineField, defineType } from "sanity";

/**
 * A post. Appears in the /post listing; renders in-site at /post/[slug] only
 * once it has a body — until then the listing card links out to
 * growthops.asia via `href`, which is the behaviour the fixtures encoded.
 */
export const article = defineType({
  name: "article",
  title: "Article",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "order",
      title: "Listing position",
      type: "number",
      description:
        "Explicit position in the /post listing. Most articles carry no publish date, so the listing cannot be sorted by one — this preserves the curated order. Lower sorts first.",
      validation: (r) => r.required().integer().min(0),
    }),
    defineField({
      name: "href",
      title: "External link",
      type: "url",
      description: "Where the listing card points while this article has no body.",
    }),
    defineField({ name: "subtitle", title: "Teaser", type: "text", rows: 3 }),
    defineField({ name: "authorName", title: "Author", type: "string" }),
    defineField({ name: "category", type: "string", description: 'e.g. "Featured", "Insight".' }),
    defineField({
      name: "publishDate",
      type: "string",
      description:
        'Displayed verbatim, e.g. "04 FEB 2026". Kept as text because the source data is not a real date.',
    }),
    defineField({ name: "featuredImage", type: "image", options: { hotspot: true } }),
    defineField({
      name: "featuredImageSrc",
      title: "Legacy featured image path",
      type: "string",
      description: "Fallback /public path, used only while no featured image is uploaded.",
    }),
    defineField({
      name: "content",
      title: "Body",
      type: "postBody",
      description: "Leave empty to keep the listing card linking out to growthops.asia.",
    }),
    defineField({ name: "seo", type: "seo" }),
  ],
  orderings: [
    {
      name: "listingOrder",
      title: "Listing order",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "featuredImage", order: "order" },
    prepare: ({ title, subtitle, media, order }) => ({
      title: title ?? "Untitled",
      subtitle: `#${order ?? "?"}${subtitle ? ` — ${subtitle}` : ""}`,
      media,
    }),
  },
});
