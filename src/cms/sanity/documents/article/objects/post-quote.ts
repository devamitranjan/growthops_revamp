import { defineField, defineType } from "sanity";

export const postQuote = defineType({
  name: "postQuote",
  title: "Pull quote",
  type: "object",
  fields: [
    defineField({ name: "text", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({ name: "author", type: "string" }),
  ],
  preview: {
    select: { title: "text", subtitle: "author" },
  },
});
