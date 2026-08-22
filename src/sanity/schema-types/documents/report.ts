import { defineArrayMember, defineField, defineType } from "sanity";

/** A gated report landing page, addressed by slug at the site root. */
export const report = defineType({
  name: "report",
  title: "Report",
  type: "document",
  fields: [
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "heroBannerData.title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "heroBannerData",
      title: "Hero banner",
      type: "heroBanner",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "reportHighlights",
      type: "array",
      of: [defineArrayMember({ type: "reportHighlight" })],
    }),
    defineField({
      name: "reportSlides",
      type: "array",
      of: [defineArrayMember({ type: "reportSlide" })],
    }),
    defineField({ name: "seo", type: "seo" }),
  ],
  preview: {
    select: { title: "heroBannerData.title", slug: "slug.current", media: "reportSlides.0.image" },
    prepare: ({ title, slug, media }) => ({ title: title ?? "Untitled report", subtitle: `/${slug ?? ""}`, media }),
  },
});
