import { defineArrayMember, defineField, defineType } from "sanity";

export const servicesShowcaseSection = defineType({
  name: "servicesShowcaseSection",
  title: "Services Showcase",
  type: "object",

  fields: [
    defineField({
      name: "title",
      title: "Section Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "services",
      title: "Services",
      type: "array",
      of: [
        defineArrayMember({
          type: "serviceShowcaseItem",
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],

  preview: {
    select: {
      title: "title",
      services: "services",
    },

    prepare({ title, services }) {
      return {
        title: title || "Services Showcase",
        subtitle: `${services?.length ?? 0} services`,
      };
    },
  },
});