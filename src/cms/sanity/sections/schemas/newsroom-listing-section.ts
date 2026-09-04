import { defineArrayMember, defineField, defineType } from "sanity";

import { sectionVisibilityField } from "../section-visibility-field";
import { sectionPreviewHelper } from "../section.schema";

/**
 * The press-coverage grid, as seen at /newsroom.
 *
 * `articles` *is* the listing: only what is added here appears, in this order.
 * Drag to re-prioritise, remove an entry to take a card off the page — the
 * `newsroomArticle` document itself stays put and can be added back. There is
 * deliberately no date-sorted fallback behind it: a fallback would put
 * articles on the page that nobody chose to put there. The cost to remember is
 * that a newly created article is invisible until someone adds it here.
 */
export const newsroomListingSection = defineType({
  name: "newsroomListingSection",
  title: "Newsroom listing",
  type: "object",
  fields: [
    sectionVisibilityField,
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      initialValue: "Newsroom",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "readMoreLabel",
      title: "Card link label",
      type: "string",
      description: 'Shown at the foot of every card, e.g. "Read more".',
      initialValue: "Read more",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "articles",
      title: "Articles",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "newsroomArticle" }],
        }),
      ],
      validation: (r) => r.unique(),
    }),
  ],
  preview: {
    select: { title: "heading", count: "articles.length", enabled: "enabled" },
    prepare: ({ title, count, enabled }) => ({
      title: title ?? "Newsroom listing",
      subtitle: `${count ? `${count} articles` : "No articles on the page"}`,
    }),
  },
});
