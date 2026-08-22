import { defineField, defineType } from "sanity";

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
    defineField({
      name: "source",
      title: "Testimonials document",
      type: "reference",
      to: [{ type: "testimonialsSection" }],
      validation: (r) => r.required(),
    }),
  ],
  preview: { prepare: () => ({ title: "Testimonials", subtitle: "Shared document" }) },
});
