import { defineField, defineType } from "sanity";

export const caseStudySlide = defineType({
  name: "caseStudySlide",
  title: "Case study slide",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "bg", title: "Background image", type: "image", options: { hotspot: true }, validation: (r) => r.required() }),
    defineField({ name: "previewVideo", title: "Preview video path", type: "string", description: "Path under /public." }),
    defineField({ name: "video", title: "Full video path", type: "string", description: "Path under /public." }),
  ],
  preview: { select: { title: "label", media: "bg" } },
});
