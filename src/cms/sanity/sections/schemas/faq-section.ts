import { defineArrayMember, defineField, defineType } from "sanity";

import { sectionVisibilityField } from "../section-visibility-field";
import { sectionPreviewHelper } from "../section.schema";

/**
 * The question-and-answer panel: a headline on the left, an accordion of
 * questions on the right.
 *
 * `openFirst` exists because the panel is tall and otherwise opens completely
 * closed, which reads as an empty column next to the headline.
 */
export const faqSection = defineType({
  name: "faqSection",
  title: "Questions & answers",
  type: "object",
  fields: [
    sectionVisibilityField,
    defineField({
      name: "title",
      title: "Section heading",
      type: "string",
      description: "Sits on the left of the panel, opposite the questions.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "eyebrow",
      type: "string",
      description: "Optional small line above the heading.",
    }),
    defineField({
      name: "items",
      title: "Questions",
      type: "array",
      of: [defineArrayMember({ type: "faqItem" })],
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "openFirst",
      title: "Open the first question",
      type: "boolean",
      description: "Expand the first answer when the page loads.",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "title", count: "items.length", enabled: "enabled" },
    prepare: ({ title, count, enabled }) => ({
      title: title ?? "Questions & answers",
      subtitle: `${count ?? 0} questions`,
    }),
  },
});
