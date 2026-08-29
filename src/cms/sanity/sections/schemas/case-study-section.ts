import { defineArrayMember, defineField, defineType } from "sanity";

export const caseStudySection = defineType({
  name: "caseStudySection",
  title: "Case studies",
  type: "object",
  fields: [
    defineField({
      name: "slides",
      type: "array",
      of: [defineArrayMember({ type: "caseStudySlide" })],
      validation: (r) => r.required().min(1),
    }),
  ],
  preview: {
    select: { count: "slides.length" },
    prepare: ({ count }) => ({ title: "Case studies", subtitle: `${count ?? 0} slides` }),
  },
});
