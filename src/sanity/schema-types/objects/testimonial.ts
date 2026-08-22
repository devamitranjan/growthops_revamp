import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "object",
  fields: [
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      description:
        "Must match one of the categories listed on the section, or the filter tab will never show this quote.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "position",
      title: "Attribution",
      type: "string",
      description: "Role and company of the person quoted.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "alt",
      title: "Alternative text",
      type: "string",
      validation: (rule) =>
        rule.required().warning("Alt text is important for accessibility."),
    }),
    defineField({
      name: "audioSrc",
      title: "Audio clip path",
      type: "string",
      description:
        "Path to the spoken clip under /public, e.g. /testimonials/audio/mizuho.mp3. Audio is served from the app, not from Sanity.",
    }),
  ],
  preview: {
    select: { title: "position", subtitle: "category", media: "image" },
  },
});
