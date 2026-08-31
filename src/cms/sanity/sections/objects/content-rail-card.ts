import { defineField, defineType } from "sanity";

export const contentRailCard = defineType({
  name: "contentRailCard",
  title: "Rail card",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Card heading",
      type: "string",
      description:
        'The point the card makes, e.g. "Craft Structured and Authoritative Content".',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "Card copy",
      type: "text",
      rows: 4,
      description:
        "Two to four sentences. Every card shares one height, so keep them a similar length.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      description: "Optional. Sits above the heading, cropped to 16:9.",
    }),
    defineField({
      name: "alt",
      title: "Alternative text",
      type: "string",
      description:
        "What the image shows. Leave empty only if it is purely decorative.",
      hidden: ({ parent }) =>
        !(parent as { image?: unknown } | undefined)?.image,
      validation: (r) =>
        r.custom((alt, context) => {
          const parent = context.parent as { image?: unknown } | undefined;

          if (!parent?.image || alt) return true;

          return "Alt text is important for accessibility.";
        }).warning(),
    }),
    defineField({
      name: "href",
      title: "Link",
      type: "url",
      description: "Optional. Makes the whole card clickable.",
      validation: (r) =>
        r.uri({ scheme: ["http", "https"], allowRelative: true }),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "description", media: "image" },
    prepare: ({ title, subtitle, media }) => ({
      title: title ?? "Untitled card",
      subtitle,
      media,
    }),
  },
});
