import { defineField, defineType } from "sanity";

export const subjectOption = defineType({
  name: "subjectOption",
  title: "Subject option",
  type: "object",
  fields: [
    defineField({
      name: "value",
      type: "string",
      description: "Submitted value. Changing this changes what the form posts.",
      validation: (r) => r.required(),
    }),
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
  ],
  preview: { select: { title: "label", subtitle: "value" } },
});
