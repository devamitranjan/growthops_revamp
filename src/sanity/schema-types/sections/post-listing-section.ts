import { defineField, defineType } from "sanity";

/**
 * The paginated list of articles, as seen at /post.
 *
 * The cards are every `article` document — the section carries the heading and
 * nothing else. Which articles appear, and in what order, is decided by the
 * documents themselves (see `documents/article.ts`), and the page number comes
 * from the URL, so there is nothing per-instance to configure.
 */
export const postListingSection = defineType({
  name: "postListingSection",
  title: "Article listing",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { title: "heading" },
    prepare: ({ title }) => ({
      title: title ?? "Article listing",
      subtitle: "Article listing",
    }),
  },
});
