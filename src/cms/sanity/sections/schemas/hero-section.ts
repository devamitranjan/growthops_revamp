import { defineField, defineType } from "sanity";
import { sectionVisibilityField } from "../section-visibility-field";
import { sectionPreviewHelper } from "../section.schema";

export const heroSection = defineType({
  name: "heroSection",
  title: "Hero",
  type: "object",
  fields: [
    sectionVisibilityField,
    defineField({ name: "hero", title: "Hero banner", type: "heroBanner", validation: (r) => r.required() }),
  ],
  preview: {
    select: { title: "hero.title", enabled: "enabled" },
    prepare: ({ title, enabled }) => ({ title: title ?? "Hero", subtitle: "Hero" }),
  },
});
