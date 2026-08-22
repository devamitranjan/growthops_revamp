import { defineField, defineType } from "sanity";

export const footerLink = defineType({
  name: "footerLink",
  title: "Link",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "href", title: "Link", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "target",
      type: "string",
      options: { list: ["_self", "_blank"] },
      initialValue: "_self",
    }),
    defineField({
      name: "rel",
      type: "string",
      description: 'Usually "noopener noreferrer" for external links, otherwise empty.',
    }),
  ],
  preview: { select: { title: "label", subtitle: "href" } },
});
