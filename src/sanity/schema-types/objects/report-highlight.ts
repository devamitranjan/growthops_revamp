import { defineField, defineType } from "sanity";

export const reportHighlight = defineType({
  name: "reportHighlight",
  title: "Report highlight",
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
      description: 'Rendered under an auto-generated "01." style index.',
      validation: (r) => r.required(),
    }),
  ],
  preview: { select: { title: "title" } },
});
