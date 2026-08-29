import { defineField, defineType } from "sanity";

export const serviceItem = defineType({
  name: "serviceItem",
  title: "Service",
  type: "object",
  fields: [
    defineField({ name: "href", title: "Link", type: "url", validation: (r) => r.required() }),
    defineField({ name: "image", type: "image", options: { hotspot: true }, validation: (r) => r.required() }),
    defineField({ name: "alt", title: "Alternative text", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "overlayColor",
      title: "Overlay colour class",
      type: "string",
      description: "Tailwind class, e.g. bg-primary-cyan-base. Design token, not free text.",
      validation: (r) => r.required(),
    }),
  ],
  preview: { select: { title: "alt", media: "image" } },
});
