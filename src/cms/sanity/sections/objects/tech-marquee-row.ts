import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * One belt of logos inside the creative-technologies card.
 *
 * Each row runs at its own resting speed so the three belts never line up,
 * which is what keeps the block from reading as a single scrolling table.
 * Scrolling the page overrides both the speed and the direction of every row
 * at once — see `useTechMarquee`.
 */
export const techMarqueeRow = defineType({
  name: "techMarqueeRow",
  title: "Logo row",
  type: "object",
  fields: [
    defineField({
      name: "logos",
      type: "array",
      of: [defineArrayMember({ type: "clientLogo" })],
      description:
        "Repeated end to end until the row is full, so a short list simply loops sooner.",
      validation: (r) => r.required().min(2),
    }),
    defineField({
      name: "speed",
      title: "Resting speed",
      type: "number",
      description:
        "Pixels per second while the page is still. Give each row a different value — 30 to 70 reads best.",
      initialValue: 45,
      validation: (r) => r.min(5).max(200),
    }),
    defineField({
      name: "direction",
      title: "Resting direction",
      type: "string",
      description: "Which way the row drifts when nobody is scrolling.",
      options: {
        list: [
          { title: "Left", value: "left" },
          { title: "Right", value: "right" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      initialValue: "left",
    }),
  ],
  preview: {
    select: { count: "logos.length", speed: "speed", direction: "direction" },
    prepare: ({ count, speed, direction }) => ({
      title: `${count ?? 0} logos`,
      subtitle: `${speed ?? 45} px/s ${direction ?? "left"}`,
    }),
  },
});
