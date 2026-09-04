import { defineField, defineType } from "sanity";

import { sectionVisibilityField } from "../section-visibility-field";
import { sectionPreviewHelper } from "../section.schema";

/**
 * Points at the shared `testimonialsSection` singleton rather than embedding
 * its own copy — the same quotes appear on the home page and /contact, and
 * they must stay in step.
 */
export const testimonialsBlock = defineType({
  name: "testimonialsBlock",
  title: "Testimonials",
  type: "object",
  fields: [
    sectionVisibilityField,
    defineField({
      name: "source",
      title: "Testimonials document",
      type: "reference",
      to: [{ type: "testimonialsSection" }],
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { enabled: "enabled" },
    prepare: ({ enabled }) => ({
      title: "Testimonials",
      subtitle: "Testimonials",
    }),
  },
});
