import { defineArrayMember, defineField, defineType } from "sanity";

import { sectionVisibilityField } from "../section-visibility-field";
import { sectionPreviewHelper } from "../section.schema";

export const servicesSection = defineType({
  name: "servicesSection",
  title: "Services grid",
  type: "object",
  fields: [
    sectionVisibilityField,
    defineField({
      name: "services",
      type: "array",
      of: [defineArrayMember({ type: "serviceItem" })],
      validation: (r) => r.required().min(1),
    }),
  ],
  preview: {
    select: { count: "services.length", enabled: "enabled" },
    prepare: ({ count, enabled }) => ({ title: "Services grid", subtitle: `${count ?? 0} services` }),
  },
});
