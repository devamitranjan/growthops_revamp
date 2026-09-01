import { defineField, defineType } from "sanity";

/** Shared by the home banner and every report landing page. */
export const banner = defineType({
  name: "banner",
  title: "Banner",
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
      name: "video",
      title: "Background video",
      type: "file",
      options: { accept: "video/mp4,video/webm" },
      description:
        "Upload the looping background clip (MP4 or WebM). It is served from Sanity's CDN, so keep it short and heavily compressed — ideally under ~10 MB.",
    }),
    defineField({
      name: "videoSrc",
      title: "Legacy video path",
      type: "string",
      description:
        "Fallback /public path, e.g. /hero-banner/hero.webm. Used only while no video is uploaded. Upload a video to override it.",
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
