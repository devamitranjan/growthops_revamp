import { defineArrayMember, defineType } from "sanity";

/**
 * Article body as real Portable Text.
 *
 * `statements` is a third list style rather than a flag on the list, because
 * Portable Text has no list container to hang a flag off — lists are just runs
 * of sibling blocks sharing a `listItem`. Every list in the migrated content
 * is a bullet list, so the original `style: "bullet" + variant: "statements"`
 * maps onto it exactly. See the renderer in
 * `src/components/sections/post-detail/post-block.tsx`.
 */
export const postBody = defineType({
  name: "postBody",
  title: "Body",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "Heading 2", value: "h2" },
        { title: "Heading 3", value: "h3" },
        { title: "Heading 4", value: "h4" },
        { title: "Heading 5", value: "h5" },
      ],
      lists: [
        { title: "Hyphen run", value: "bullet" },
        { title: "Numbered", value: "number" },
        { title: "Statements", value: "statements" },
      ],
      marks: {
        decorators: [
          { title: "Bold", value: "strong" },
          { title: "Italic", value: "em" },
        ],
        annotations: [
          defineArrayMember({
            name: "link",
            title: "Link",
            type: "object",
            fields: [
              {
                name: "href",
                title: "URL",
                type: "url",
                validation: (r) =>
                  r
                    .required()
                    .uri({ scheme: ["http", "https", "mailto", "tel"], allowRelative: true }),
              },
            ],
          }),
        ],
      },
    }),
    defineArrayMember({ type: "postImage" }),
    defineArrayMember({ type: "postQuote" }),
  ],
});
