import { defineField, defineType } from "sanity";

export const growthCard = defineType({
  name: "growthCard",
  title: "Growth spurt card",
  type: "object",
  fields: [
    defineField({ name: "image", type: "image", options: { hotspot: true }, validation: (r) => r.required() }),
    defineField({
      name: "videoSrc",
      title: "Video path",
      type: "string",
      description: "Path under /public, e.g. /growth-spurts/video/bersama-grab.webm.",
    }),
    defineField({ name: "alt", title: "Alternative text", type: "string", validation: (r) => r.required() }),
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", type: "string" }),
  ],
  preview: { select: { title: "label", subtitle: "description", media: "image" } },
});
