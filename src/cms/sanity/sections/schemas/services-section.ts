import { defineArrayMember, defineField, defineType } from "sanity";

export const servicesSection = defineType({
  name: "servicesSection",
  title: "Services grid",
  type: "object",
  fields: [
    defineField({
      name: "services",
      type: "array",
      of: [defineArrayMember({ type: "serviceItem" })],
      validation: (r) => r.required().min(1),
    }),
  ],
  preview: {
    select: { count: "services.length" },
    prepare: ({ count }) => ({ title: "Services grid", subtitle: `${count ?? 0} services` }),
  },
});
