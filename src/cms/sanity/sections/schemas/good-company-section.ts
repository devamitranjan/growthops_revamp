import { defineArrayMember, defineField, defineType } from "sanity";

import { sectionVisibilityField } from "../section-visibility-field";

export const goodCompanySection = defineType({
  name: "goodCompanySection",
  title: "Good Company",
  type: "object",
  fields: [
    sectionVisibilityField,
    defineField({ name: "eyebrow", type: "string" }),
    defineField({
      name: "title",
      title: "Section heading",
      type: "string",
      initialValue: "You're in good company",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "logos",
      title: "Client logo pairs",
      description:
        "Each slot holds two logos that share one spot on the grid and cross-fade between each other. Leave the second logo empty only for a trailing, unpaired slot.",
      type: "array",
      of: [
        defineArrayMember({
          name: "logoPair",
          title: "Logo pair",
          type: "object",
          fields: [
            defineField({
              name: "primary",
              title: "First logo",
              type: "object",
              fields: [
                defineField({
                  name: "logo",
                  title: "Logo",
                  type: "image",
                  validation: (r) => r.required(),
                }),
                defineField({
                  name: "alt",
                  title: "Alternative text",
                  type: "string",
                  validation: (r) => r.required(),
                }),
              ],
              validation: (r) => r.required(),
            }),
            defineField({
              name: "secondary",
              title: "Second logo",
              type: "object",
              fields: [
                defineField({
                  name: "logo",
                  title: "Logo",
                  type: "image",
                  validation: (r) => r.required(),
                }),
                defineField({
                  name: "alt",
                  title: "Alternative text",
                  type: "string",
                  validation: (r) => r.required(),
                }),
              ],
            }),
          ],
          preview: {
            select: { title: "primary.alt", subtitle: "secondary.alt", media: "primary.logo" },
            prepare: ({ title, subtitle, media }) => ({
              title,
              subtitle: subtitle ? `+ ${subtitle}` : "unpaired",
              media,
            }),
          },
        }),
      ],
      validation: (r) => r.required().min(1),
    }),
  ],
  preview: {
    select: { title: "title", count: "logos.length", enabled: "enabled" },
    prepare: ({ title, count }) => ({
      title: title || "Good Company",
      subtitle: `${count ?? 0} logos`,
    }),
  },
});
