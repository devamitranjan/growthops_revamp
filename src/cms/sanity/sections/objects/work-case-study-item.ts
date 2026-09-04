import { defineField, defineType } from "sanity";

export const workCaseStudyItem = defineType({
  name: "workCaseStudyItem",
  title: "Work - Case Study Item",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", type: "string", validation: (r) => r.required() }),
    defineField({ name: "image", type: "image", options: { hotspot: true }, validation: (r) => r.required() }),
    defineField({ name: "alt", title: "Alternative text", type: "string", validation: (r) => r.required() }),
    defineField({ name: "category", type: "string", description: "e.g. 'Performance Marketing & Analytics', 'Digital-First Creative'", validation: (r) => r.required() }),
    defineField({ name: "href", title: "Link", type: "url" }),
  ],
  preview: { select: { title: "title", subtitle: "category", media: "image" } },
});
