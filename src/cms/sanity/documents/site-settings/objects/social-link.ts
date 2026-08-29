import { defineField, defineType } from "sanity";

/**
 * `platform` picks the icon. The icons are React components from react-icons,
 * so they stay in code — see the map in
 * `src/components/site/site-footer/site-footer.tsx`. Adding a platform here
 * without adding it to that map renders no icon.
 */
export const socialLink = defineType({
  name: "socialLink",
  title: "Social link",
  type: "object",
  fields: [
    defineField({
      name: "platform",
      type: "string",
      options: { list: ["linkedin", "facebook", "instagram", "youtube"] },
      validation: (r) => r.required(),
    }),
    defineField({ name: "href", title: "Link", type: "url", validation: (r) => r.required() }),
    defineField({
      name: "label",
      type: "string",
      description: "Accessible name, e.g. LinkedIn.",
      validation: (r) => r.required(),
    }),
  ],
  preview: { select: { title: "label", subtitle: "href" } },
});
