import { defineField, defineType } from "sanity";

/**
 * A card in the home page's article rail.
 *
 * Deliberately an embedded object rather than a reference to an `article`
 * document: most of these point at whitepapers and pages on growthops.asia
 * that have no article document here, so a reference would drop them.
 */
export const articleTeaser = defineType({
  name: "articleTeaser",
  title: "Article teaser",
  type: "object",
  fields: [
    defineField({ name: "href", title: "Link", type: "url", validation: (r) => r.required() }),
    defineField({ name: "image", type: "image", options: { hotspot: true }, validation: (r) => r.required() }),
    defineField({ name: "alt", title: "Alternative text", type: "string", validation: (r) => r.required() }),
    defineField({ name: "tag", type: "string", description: 'e.g. "Whitepaper", "Insight".' }),
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "date", type: "string", description: 'Free text as displayed, e.g. "October 2024".' }),
  ],
  preview: { select: { title: "title", subtitle: "tag", media: "image" } },
});
