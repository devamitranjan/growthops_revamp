import { defineArrayMember, defineField, defineType } from "sanity";

export const articleCardsSection = defineType({
  name: "articleCardsSection",
  title: "Article cards",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Section heading", type: "string", validation: (r) => r.required() }),
    defineField({ name: "sectionLink", title: "Section heading link", type: "url" }),
    defineField({
      name: "articles",
      type: "array",
      of: [defineArrayMember({ type: "articleTeaser" })],
      validation: (r) => r.required().min(1),
    }),
  ],
  preview: {
    select: { title: "title", count: "articles.length" },
    prepare: ({ title, count }) => ({ title: title ?? "Article cards", subtitle: `${count ?? 0} teasers` }),
  },
});
