import { defineField, defineType } from "sanity";

/**
 * One badge tile in the culture validation grid.
 *
 * The artwork is the whole card — no label is rendered — so `alt` carries the
 * award's name for anyone who cannot see the badge, and is what the Studio
 * list shows.
 */
export const cultureCard = defineType({
  name: "cultureCard",
  title: "Culture validation card",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Badge",
      type: "image",
      options: { hotspot: true },
      description: "Sits in a white circle, so a transparent or white-background badge works best.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "alt",
      title: "Alternative text",
      type: "string",
      description: 'The award\'s name, e.g. "The Circle Back Initiative Global Employer 2023".',
      validation: (r) => r.required().warning("Alt text is important for accessibility."),
    }),
    defineField({
      name: "href",
      title: "Link",
      type: "url",
      description: "Optional. Makes the whole card clickable.",
    }),
  ],
  preview: { select: { title: "alt", media: "image" } },
});
