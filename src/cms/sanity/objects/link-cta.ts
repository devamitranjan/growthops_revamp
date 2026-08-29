import { defineField, defineType } from "sanity";

export const linkCta = defineType({
  name: "linkCta",
  title: "Call to action",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "href", title: "Link", type: "url", validation: (r) => r.required() }),
    defineField({
      name: "target",
      type: "string",
      options: { list: ["_self", "_blank"] },
      initialValue: "_self",
    }),
  ],
});
