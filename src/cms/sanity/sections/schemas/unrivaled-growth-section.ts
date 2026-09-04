import { defineArrayMember, defineField, defineType } from "sanity";

import { sectionVisibilityField } from "../section-visibility-field";
import { sectionPreviewHelper } from "../section.schema";

export const unrivaledGrowthSection = defineType({
  name: "unrivaledGrowthSection",
  title: "Unrivaled growth",
  type: "object",
  fields: [
    sectionVisibilityField,
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "stats",
      type: "array",
      of: [defineArrayMember({ type: "growthStat" })],
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "cta",
      type: "linkCta",
      description: "Rises into place once the last stat has settled. Leave empty to hide it.",
    }),
  ],
  preview: {
    select: { title: "title", count: "stats.length", enabled: "enabled" },
    prepare: ({ title, count, enabled }) => ({ title: title ?? "Unrivaled growth", subtitle: `${count ?? 0} stats` }),
  },
});
