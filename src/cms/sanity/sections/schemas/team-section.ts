import { defineArrayMember, defineField, defineType } from "sanity";

import { sectionVisibilityField } from "../section-visibility-field";
import { sectionPreviewHelper } from "../section.schema";

export const teamSection = defineType({
  name: "teamSection",
  title: "Team",
  type: "object",
  fields: [
    sectionVisibilityField,
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "batches",
      type: "array",
      of: [defineArrayMember({ type: "teamBatch" })],
      description: "One batch per rotation step. Every batch needs the same number of members.",
      validation: (r) =>
        r.required().min(1).custom((batches) => {
          if (!Array.isArray(batches) || batches.length < 2) return true;
          const sizes = batches.map((b) => (b as { members?: unknown[] })?.members?.length ?? 0);
          return new Set(sizes).size === 1
            ? true
            : `Every batch must hold the same number of members (found ${sizes.join(", ")}).`;
        }),
    }),
    defineField({ name: "highlight", type: "teamHighlight", description: "Trailing card. Leave empty to end the grid after the members." }),
  ],
  preview: {
    select: { title: "title", count: "batches.length", enabled: "enabled" },
    prepare: ({ title, count, enabled }) => ({ title: title ?? "Team", subtitle: `${count ?? 0} batches` }),
  },
});
