import { defineField, defineType } from "sanity";

/**
 * A gated report landing page, served at `/reports/<slug>`.
 *
 * Composed from the same section library as every other page: the hero, the
 * "In this report" overview and the download form are all sections, so a
 * report can carry anything else the library offers — a FAQ, testimonials —
 * and can order them however it likes.
 *
 * `title` exists for the Studio rather than the page: it names the document in
 * lists and seeds the slug. What the page *says* is in the hero section.
 */
export const report = defineType({
  name: "report",
  title: "Report",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Report name",
      type: "string",
      description: "Used in the Studio and as the fallback meta title.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      description: "The URL this report is served at: `<slug>` -> /reports/<slug>.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "sections",
      title: "Page sections",
      type: "pageSections",
      validation: (r) => r.required().min(1),
    }),
    defineField({ name: "seo", type: "seo" }),
  ],
  preview: {
    select: {
      title: "title",
      slug: "slug.current",
      count: "sections.length",
    },
    prepare: ({ title, slug, count }) => ({
      title: title ?? "Untitled report",
      subtitle: `/reports/${slug ?? ""} — ${count ?? 0} sections`,
    }),
  },
});
