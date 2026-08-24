import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * A heading, a standfirst, and a row of hover-to-play video cards.
 *
 * The row is capped at four because that is what fits across the grid at
 * desktop width — a fifth card would wrap into a lonely second row rather than
 * tighten the first.
 */
export const growthVideosSection = defineType({
  name: "growthVideosSection",
  title: "Growth videos",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Section heading",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Section subtitle",
      type: "text",
      rows: 2,
      description: "The line under the heading. Leave empty to hide it.",
    }),
    defineField({
      name: "videos",
      title: "Video cards",
      type: "array",
      of: [defineArrayMember({ type: "growthVideo" })],
      description: "Up to four — they share one row at desktop width.",
      validation: (r) => r.required().min(1).max(4),
    }),
  ],
  preview: {
    select: { title: "title", count: "videos.length" },
    prepare: ({ title, count }) => ({
      title: title ?? "Growth videos",
      subtitle: `${count ?? 0} videos`,
    }),
  },
});
