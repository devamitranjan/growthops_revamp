import { defineField, defineType } from "sanity";

/** Per-page overrides. Anything left empty falls back to the site defaults in
 *  `siteSettings`, or to the page's own title. */
export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({ name: "title", title: "Meta title", type: "string" }),
    defineField({ name: "description", title: "Meta description", type: "text", rows: 3 }),
    defineField({ name: "ogImage", title: "Social share image", type: "image" }),
  ],
});
