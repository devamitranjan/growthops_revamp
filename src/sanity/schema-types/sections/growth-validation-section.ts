import { defineArrayMember, defineField, defineType } from "sanity";

export const growthValidationSection = defineType({
  name: "growthValidationSection",
  title: "Growth validation",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Section heading", type: "string", validation: (r) => r.required() }),
    defineField({ name: "sectionLink", title: "Section heading link", type: "url" }),
    defineField({
      name: "eyebrow",
      type: "string",
      description: 'The small line above the award, e.g. "Southeast Asia\'s Best".',
    }),
    defineField({ name: "headline", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "awards",
      title: "Award tiles",
      type: "array",
      of: [
        defineArrayMember({
          name: "award",
          type: "object",
          fields: [
            defineField({ name: "href", title: "Link", type: "url" }),
            defineField({ name: "image", type: "image", options: { hotspot: true }, validation: (r) => r.required() }),
            defineField({ name: "alt", title: "Alternative text", type: "string" }),
          ],
          preview: { select: { title: "alt", media: "image" } },
        }),
      ],
    }),
    defineField({ name: "image", title: "Feature image", type: "image", options: { hotspot: true }, validation: (r) => r.required() }),
    defineField({ name: "imageAlt", title: "Feature image alternative text", type: "string", validation: (r) => r.required() }),
  ],
  preview: {
    select: { title: "title", subtitle: "headline", media: "image" },
  },
});
