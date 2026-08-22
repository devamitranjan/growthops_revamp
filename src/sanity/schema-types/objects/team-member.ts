import { defineField, defineType } from "sanity";

export const teamMember = defineType({
  name: "teamMember",
  title: "Team member",
  type: "object",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "title", title: "Role", type: "string", validation: (r) => r.required() }),
    defineField({ name: "image", type: "image", options: { hotspot: true }, validation: (r) => r.required() }),
    defineField({
      name: "from",
      title: "Gradient from",
      type: "string",
      description: "Hex colour, e.g. #1a2a5c.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "to",
      title: "Gradient to",
      type: "string",
      description: "Hex colour, e.g. #0c1330.",
      validation: (r) => r.required(),
    }),
  ],
  preview: { select: { title: "name", subtitle: "title", media: "image" } },
});
