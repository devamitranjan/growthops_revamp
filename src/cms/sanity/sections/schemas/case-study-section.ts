import { defineArrayMember, defineField, defineType } from "sanity";

import { sectionVisibilityField } from "../section-visibility-field";
import { sectionPreviewHelper } from "../section.schema";

export const caseStudySection = defineType({
  name: "caseStudySection",
  title: "Case studies",
  type: "object",
  fields: [
    sectionVisibilityField,
    defineField({
      name: "slides",
      type: "array",
      of: [defineArrayMember({ type: "caseStudySlide" })],
      validation: (r) => r.required().min(1),
    }),
  ],
  preview: {
    select: { count: "slides.length", enabled: "enabled" },
    prepare: ({ count, enabled }) => ({ title: "Case studies", subtitle: `${count ?? 0} slides` }),
  },
});
