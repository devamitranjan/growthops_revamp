import { defineField, defineType } from "sanity";

/** Shared by the home hero and every report landing page. */
export const heroBanner = defineType({
  name: "heroBanner",
  title: "Hero banner",
  type: "object",
  fields: [
    defineField({
      name: "tag",
      title: "Tag",
      type: "string",
      description: "Optional pill shown above the title, e.g. Culture.",
    }),
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "subtitle", type: "string" }),
    defineField({ name: "description", type: "text", rows: 4 }),
    defineField({
      name: "videoSrc",
      title: "Background video path",
      type: "string",
      description:
        "Path under /public, e.g. /hero-banner/hero.webm. Video is served from the app, never from Sanity.",
    }),
    defineField({
      name: "poster",
      title: "Poster image",
      type: "image",
      options: { hotspot: true },
      description: "Shown before the video loads, and on its own when there is no video.",
    }),
    defineField({
      name: "posterSrc",
      title: "Legacy poster path",
      type: "string",
      description:
        "Fallback /public path, used only while no poster image is uploaded. Upload a poster to override it.",
    }),
    defineField({
      name: "animateSpin",
      title: "Animate the spinning mark",
      type: "boolean",
      initialValue: true,
    }),
  ],
});
