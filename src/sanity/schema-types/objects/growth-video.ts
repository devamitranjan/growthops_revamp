import { defineField, defineType } from "sanity";

/**
 * One hover-to-play video card.
 *
 * `thumbnail` is what the card shows at rest; the video fades over it while a
 * visitor hovers, and clicking opens the full clip in a dialog.
 *
 * The clip is uploaded to Sanity. That keeps the whole card editable from the
 * Studio, at the cost of serving video as a raw file asset — no transcoding,
 * no adaptive streaming — so these want to stay the short previews they are.
 * Long or heavily watched video belongs on a streaming service instead.
 */
export const growthVideo = defineType({
  name: "growthVideo",
  title: "Growth video card",
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
      description: "Names the clip for screen readers and the video dialog.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 3,
      description: "The caption under the card.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
      options: { hotspot: true },
      description: "Shown until the card is hovered. Portrait, 9:16.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "alt",
      title: "Alternative text",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "video",
      title: "Video file",
      type: "file",
      options: { accept: "video/mp4,video/webm" },
      description:
        "Upload the clip — MP4 or WebM. Keep it short; these play on hover, so a few seconds is the whole job.",
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "description", media: "thumbnail" },
  },
});
