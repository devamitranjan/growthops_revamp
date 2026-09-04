import { defineField, defineType } from "sanity";

/** Per-page overrides. Anything left empty falls back to the site defaults in
 *  `siteSettings`, or to the page's own title. */
export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: "jsonld",
      title: "JSON-LD Schemas",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "schema",
              title: "Schema",
              type: "string",
              description: "Paste your JSON-LD schema here",
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
      description: "Add structured data schemas (JSON-LD) for search engines",
    }),
  ],
});
