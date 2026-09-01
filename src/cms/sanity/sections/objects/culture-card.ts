import { defineField, defineType } from "sanity";

type CultureCardValue = { variant?: string };

const isIcon = (parent: unknown) =>
  (parent as CultureCardValue | undefined)?.variant === "icon";

/**
 * One tile in the culture validation grid, in either of the two styles the
 * grid mixes.
 *
 * A *badge* is an award lockup — the artwork is the whole card, printed for a
 * light background, so it sits in a white circle and `alt` carries the award's
 * name for anyone who cannot see it. An *icon* is a flat pictogram over the
 * dark card with its name set underneath, so the label is the visible text and
 * `alt` has nothing left to say.
 */
export const cultureCard = defineType({
  name: "cultureCard",
  title: "Culture validation card",
  type: "object",
  fields: [
    defineField({
      name: "variant",
      title: "Card style",
      type: "string",
      description:
        "Badge for award artwork in a white circle, icon for a pictogram with its name underneath.",
      options: {
        list: [
          { title: "Badge", value: "badge" },
          { title: "Icon + label", value: "icon" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      initialValue: "badge",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "image",
      title: "Artwork",
      type: "image",
      options: { hotspot: true },
      description:
        "A badge sits in a white circle, so a transparent or white-background file works best. An icon sits straight on the dark card, so it needs a transparent background.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      description: 'The text under the icon, e.g. "Marketing Strategy".',
      hidden: ({ parent }) => !isIcon(parent),
      validation: (r) =>
        r.custom((value, { parent }) =>
          isIcon(parent) && !value ? "An icon card needs a label." : true,
        ),
    }),
    defineField({
      name: "alt",
      title: "Alternative text",
      type: "string",
      description:
        'The award\'s name, e.g. "The Circle Back Initiative Global Employer 2023". An icon card can leave this empty — its label already says the same thing.',
      validation: (r) =>
        r.custom((value, { parent }) =>
          !isIcon(parent) && !value
            ? "Alt text is important for accessibility."
            : true,
        ).warning(),
    }),
    defineField({
      name: "href",
      title: "Link",
      type: "url",
      description: "Optional. Makes the whole card clickable.",
    }),
  ],
  preview: {
    select: { label: "label", alt: "alt", variant: "variant", media: "image" },
    prepare: ({ label, alt, variant, media }) => ({
      title: (variant === "icon" ? label : alt) || "Untitled card",
      subtitle: variant === "icon" ? "Icon + label" : "Badge",
      media,
    }),
  },
});
