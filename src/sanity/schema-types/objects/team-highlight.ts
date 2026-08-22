import { defineField, defineType } from "sanity";

/** The last card in the team grid, which does not rotate. */
export const teamHighlight = defineType({
  name: "teamHighlight",
  title: "Highlight card",
  type: "object",
  fields: [
    defineField({
      name: "value",
      type: "string",
      description: 'Rendered large in gradient text, e.g. "+250".',
      validation: (r) => r.required(),
    }),
    defineField({ name: "description", type: "string", validation: (r) => r.required() }),
    defineField({ name: "cta", type: "linkCta" }),
  ],
});
