import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Page-level copy for /newsroom. Singleton, pinned in `structure.ts`.
 *
 * The cards themselves are `newsroomArticle` documents; only what is not a
 * card lives here. It is a document of its own rather than another group on
 * `siteSettings` so the page copy sits next to the articles it heads in the
 * Studio sidebar.
 */
export const newsroomPage = defineType({
  name: "newsroomPage",
  title: "Newsroom page",
  type: "document",
  fields: [
    defineField({
      name: "heading",
      title: "Page heading",
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
      description:
        "The listing itself: only articles added here appear on /newsroom, in this order. Drag to re-prioritise, and remove an item to take it off the page — the article document itself stays put and can be added back at any time.",
      validation: (r) => r.unique(),
    }),
    defineField({ name: "seo", type: "seo" }),
  ],
  preview: {
    select: { count: "articles.length" },
    prepare: ({ count }) => ({
      title: "Newsroom page",
      subtitle: count ? `${count} articles` : "No articles on the page",
    }),
  },
});
