import { defineField, defineType } from "sanity";

export const reportSlide = defineType({
  name: "reportSlide",
  title: "Report slide",
  type: "object",
  fields: [
    defineField({ name: "image", type: "image", options: { hotspot: true }, validation: (r) => r.required() }),
    defineField({ name: "alt", title: "Alternative text", type: "string", validation: (r) => r.required() }),
  ],
  preview: { select: { title: "alt", media: "image" } },
});
