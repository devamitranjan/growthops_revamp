import { defineField, defineType } from "sanity";

import { WorkCaseStudyCategoryInput } from "./work-case-study-category-input";

export const workCaseStudy = defineType({
  name: "workCaseStudy",
  title: "Work case study",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "alt",
      title: "Alternative text",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      type: "string",
      description:
        "e.g. 'Performance Marketing & Analytics', 'Digital-First Creative'",
      components: { input: WorkCaseStudyCategoryInput },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "href",
      title: "Link",
      type: "url",
    }),
    defineField({
      name: "seo",
      type: "seo",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "image",
    },
    prepare: ({ title, subtitle, media }) => ({
      title: title ?? "Untitled",
      subtitle: subtitle ?? "Work case study",
      media,
    }),
  },
});
