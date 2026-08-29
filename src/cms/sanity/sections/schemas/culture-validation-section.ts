import { defineArrayMember, defineField, defineType } from "sanity";

export const cultureValidationSection = defineType({
  name: "cultureValidationSection",
  title: "Culture validation",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Section heading",
      type: "string",
      initialValue: "Culture Validation",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "cards",
      title: "Badge cards",
      type: "array",
      of: [defineArrayMember({ type: "cultureCard" })],
      description: "Laid out two per row on desktop.",
      validation: (r) => r.required().min(1),
    }),
  ],
  preview: {
    select: { title: "title", count: "cards.length", media: "cards.0.image" },
    prepare: ({ title, count, media }) => ({
      title: title ?? "Culture validation",
      subtitle: `${count ?? 0} cards`,
      media,
    }),
  },
});
