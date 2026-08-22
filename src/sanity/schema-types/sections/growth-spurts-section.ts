import { defineArrayMember, defineField, defineType } from "sanity";

export const growthSpurtsSection = defineType({
  name: "growthSpurtsSection",
  title: "Growth spurts",
  type: "object",
  fields: [
    defineField({
      name: "cards",
      type: "array",
      of: [defineArrayMember({ type: "growthCard" })],
      validation: (r) => r.required().min(1),
    }),
  ],
  preview: {
    select: { count: "cards.length" },
    prepare: ({ count }) => ({ title: "Growth spurts", subtitle: `${count ?? 0} cards` }),
  },
});
