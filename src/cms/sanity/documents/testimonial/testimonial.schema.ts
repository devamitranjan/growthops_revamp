import { defineArrayMember, defineField, defineType } from "sanity";

/** Singleton. Shared by the home page and /contact — see `structure/`. */
export const testimonialsSection = defineType({
  name: "testimonialsSection",
  title: "Testimonials",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Section heading",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "categories",
      title: "Filter categories",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      description:
        "Order here is the order of the filter tabs. The first one is selected by default.",
      validation: (rule) => rule.required().min(1).unique(),
    }),
    defineField({
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      of: [defineArrayMember({ type: "testimonial" })],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "logos",
      title: "Client logo marquee",
      type: "array",
      of: [defineArrayMember({ type: "clientLogo" })],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Testimonials" }),
  },
});
