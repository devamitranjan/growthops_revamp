import { defineField, defineType } from "sanity";

export const bannerSection = defineType({
  name: "bannerSection",
  title: "Banner",
  type: "object",
  fields: [defineField({ name: "banner", title: "Banner", type: "banner", validation: (r) => r.required() })],
  preview: {
    select: { title: "banner.title" },
    prepare: ({ title }) => ({ title: title ?? "Banner", subtitle: "Banner" }),
  },
});
