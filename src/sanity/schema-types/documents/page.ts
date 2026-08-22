import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * A composed page. Sections are reorderable, removable, and repeatable, so an
 * editor can build a new page without a developer.
 *
 * The home page is the `home` slug; `src/app/(site)/page.tsx` asks for it by
 * name. Any other slug is served by the catch-all report/page route only if a
 * route exists for it — adding a page document does not by itself create a URL.
 */
export const page = defineType({
  name: "page",
  title: "Page",
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
      name: "sections",
      title: "Page sections",
      type: "array",
      of: [
        defineArrayMember({ type: "heroSection" }),
        defineArrayMember({ type: "servicesSection" }),
        defineArrayMember({ type: "growthSpurtsSection" }),
        defineArrayMember({ type: "unrivaledGrowthSection" }),
        defineArrayMember({ type: "caseStudySection" }),
        defineArrayMember({ type: "articleCardsSection" }),
        defineArrayMember({ type: "testimonialsBlock" }),
        defineArrayMember({ type: "growthValidationSection" }),
        defineArrayMember({ type: "teamSection" }),
      ],
      validation: (r) => r.required().min(1),
    }),
    defineField({ name: "seo", type: "seo" }),
  ],
  preview: {
    select: { title: "title", slug: "slug.current", count: "sections.length" },
    prepare: ({ title, slug, count }) => ({
      title: title ?? "Untitled page",
      subtitle: `/${slug ?? ""} — ${count ?? 0} sections`,
    }),
  },
});
