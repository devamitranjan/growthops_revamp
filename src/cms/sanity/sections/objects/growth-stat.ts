import { defineField, defineType } from "sanity";

export const growthStat = defineType({
  name: "growthStat",
  title: "Statistic",
  type: "object",
  fields: [
    defineField({
      name: "stat",
      type: "string",
      description: 'Rendered large, e.g. "817%".',
      validation: (r) => r.required(),
    }),
    defineField({ name: "description", type: "string", validation: (r) => r.required() }),
  ],
  preview: { select: { title: "stat", subtitle: "description" } },
});
