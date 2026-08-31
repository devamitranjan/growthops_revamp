import { defineArrayMember, defineField, defineType } from "sanity";

export const contentRailSection = defineType({
  name: "contentRailSection",
  title: "Content rail",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Section heading",
      type: "string",
      description:
        'e.g. "Mastering Generative Engine Optimisation: Strategies That Drive Real Results".',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "Introduction",
      type: "text",
      rows: 4,
      description: "Optional. Sits between the heading and the cards.",
    }),
    defineField({
      name: "cards",
      title: "Cards",
      type: "array",
      of: [defineArrayMember({ type: "contentRailCard" })],
      description:
        "Read left to right as the page scrolls. Three or more is where the sideways movement earns its keep.",
      validation: (r) => r.required().min(1),
    }),
  ],
  preview: {
    select: { title: "title", count: "cards.length" },
    prepare: ({ title, count }) => ({
      title: title ?? "Content rail",
      subtitle: `${count ?? 0} cards`,
    }),
  },
});
