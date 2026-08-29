import { defineField, defineType } from "sanity";

export const heroSection = defineType({
  name: "heroSection",
  title: "Hero",
  type: "object",
  fields: [defineField({ name: "hero", title: "Hero banner", type: "heroBanner", validation: (r) => r.required() })],
  preview: {
    select: { title: "hero.title" },
    prepare: ({ title }) => ({ title: title ?? "Hero", subtitle: "Hero" }),
  },
});
