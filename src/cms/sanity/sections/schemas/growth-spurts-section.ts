import { defineArrayMember, defineField, defineType } from "sanity";

import { sectionVisibilityField } from "../section-visibility-field";
import { sectionPreviewHelper } from "../section.schema";

export const growthSpurtsSection = defineType({
  name: "growthSpurtsSection",
  title: "Growth spurts",
  type: "object",
  fields: [
    sectionVisibilityField,
    defineField({
      name: "cards",
      type: "array",
      of: [defineArrayMember({ type: "growthCard" })],
      validation: (r) => r.required().min(1),
    }),
  ],
  preview: {
    select: { count: "cards.length", enabled: "enabled" },
    prepare: ({ count, enabled }) => ({ title: "Growth spurts", subtitle: `${count ?? 0} cards` }),
  },
});
