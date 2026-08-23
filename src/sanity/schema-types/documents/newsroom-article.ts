import { defineField, defineType } from "sanity";

/**
 * A press mention on /newsroom.
 *
 * These are pieces published *by other outlets*, so there is no in-site detail
 * page and no slug — the card's "Read more" links out and that is the only
 * destination the content has. That is also why this is its own document type
 * rather than an `article`: an article is ours and can grow a body, a newsroom
 * item never can.
 */
export const newsroomArticle = defineType({
  name: "newsroomArticle",
  title: "Newsroom article",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "href",
      title: "Article link",
      type: "url",
      description: "Where the card points. Always an external URL — the piece lives on the publication's own site.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published",
      type: "date",
      description:
        'Sorts the listing, newest first, and is displayed as "14 July 2025". A real date, unlike the free-text `publishDate` on articles.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Teaser",
      type: "text",
      rows: 4,
      description: "The paragraph under the date on the card.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "image",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "alt",
      title: "Alternative text",
      type: "string",
      validation: (r) => r.required(),
    }),
  ],
  orderings: [
    {
      name: "publishedDesc",
      title: "Newest first",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "publishedAt", media: "image" },
  },
});
