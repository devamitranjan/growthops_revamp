import { defineArrayMember, defineField, defineType } from "sanity";

import { sectionVisibilityField } from "../section-visibility-field";
import { sectionPreviewHelper } from "../section.schema";

export const creativeTechSection = defineType({
  name: "creativeTechSection",
  title: "Creative technologies",
  type: "object",
  fields: [
    sectionVisibilityField,
    defineField({
      name: "title",
      type: "string",
      initialValue: "Creative Technologies We Use",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "rows",
      title: "Logo rows",
      type: "array",
      of: [defineArrayMember({ type: "techMarqueeRow" })],
      description: "Stacked belts, each with its own speed. Three is the design.",
      validation: (r) => r.required().min(1).max(5),
    }),
  ],
  preview: {
    select: { title: "title", count: "rows.length", enabled: "enabled" },
    prepare: ({ title, count, enabled }) => ({
      title: title ?? "Creative technologies",
      subtitle: `${count ?? 0} rows`,
    }),
  },
});
