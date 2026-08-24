import { defineField, defineType } from "sanity";

/**
 * A composed page. Sections are reorderable, removable, and repeatable, so an
 * editor can build a new page without a developer.
 *
 * Creating a page document *does* create a URL: `src/app/(site)/[slug]/page.tsx`
 * serves every page by its slug. The home page is the `home` slug and is
 * served by `src/app/(site)/page.tsx` at `/` instead; slugs that a hand-built
 * route already owns (`contact`, `newsroom`, `post`, `reports`) are listed in
 * that route and stay with the hand-built page.
 *
 * The section library lives in `schema-types/sections/index.ts` — the
 * `pageSections` array offers all of it, and each section instance carries its
 * own content, so the same section can appear on several pages saying
 * different things.
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
      description: "The URL this page is served at, e.g. `about` -> /about.",
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
    select: { title: "title", slug: "slug.current", count: "sections.length" },
    prepare: ({ title, slug, count }) => ({
      title: title ?? "Untitled page",
      subtitle: `/${slug ?? ""} — ${count ?? 0} sections`,
    }),
  },
});
