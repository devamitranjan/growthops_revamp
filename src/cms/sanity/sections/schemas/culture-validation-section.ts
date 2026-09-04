import { defineArrayMember, defineField, defineType } from "sanity";

import { sectionVisibilityField } from "../section-visibility-field";
import { sectionPreviewHelper } from "../section.schema";

export const cultureValidationSection = defineType({
  name: "cultureValidationSection",
  title: "Culture validation",
  type: "object",
  fields: [
    sectionVisibilityField,
    defineField({
      name: "title",
      title: "Section heading",
      type: "string",
      initialValue: "Culture Validation",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "cards",
      title: "Badge cards",
      type: "array",
      of: [defineArrayMember({ type: "cultureCard" })],
      description: "Laid out two per row on desktop.",
      validation: (r) => r.required().min(1),
    }),
  ],
  preview: {
    select: { title: "title", count: "cards.length", media: "cards.0.image", enabled: "enabled" },
    prepare: ({ title, count, media, enabled }) => ({
      title: title ?? "Culture validation",
      subtitle: `${count ?? 0} cards`,
      media,
    }),
  },
});
