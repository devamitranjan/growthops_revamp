import { defineField, defineType } from "sanity";

/**
 * A diagram or photo inside an article body.
 *
 * `width`/`height` are kept as explicit fields rather than always derived from
 * asset metadata, because the frame borrows the artwork's ratio AND caps its
 * own width at the intrinsic size — and several of these images have no
 * uploaded asset yet (see `legacySrc`). When an asset is present the query
 * prefers its real metadata over these values.
 */
export const postImage = defineType({
  name: "postImage",
  title: "Image",
  type: "object",
  fields: [
    defineField({ name: "image", type: "image", options: { hotspot: true } }),
    defineField({
      name: "legacySrc",
      title: "Legacy image path",
      type: "string",
      description: "Fallback /public path, used only while no image is uploaded.",
    }),
    defineField({ name: "alt", title: "Alternative text", type: "string", validation: (r) => r.required() }),
    defineField({ name: "caption", type: "string" }),
    defineField({ name: "width", type: "number", description: "Intrinsic width; ignored once an image is uploaded." }),
    defineField({ name: "height", type: "number", description: "Intrinsic height; ignored once an image is uploaded." }),
  ],
  preview: { select: { title: "alt", subtitle: "caption", media: "image" } },
});
