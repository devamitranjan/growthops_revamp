import { defineField, defineType } from "sanity";

import { sectionVisibilityField } from "../section-visibility-field";
import { sectionPreviewHelper } from "../section.schema";

/**
 * A block of long-form copy, on white.
 *
 * The body an article used to own outright, lifted into the section library so
 * an editor can drop copy anywhere and add as many blocks as a page needs
 * instead of filling one fixed field. `/post/[slug]` renders its own `content`
 * through the very same component, so the two entry points cannot drift.
 *
 * It reuses `postBody` rather than declaring its own block array: the styles,
 * lists and inline objects a body may contain are one decision, made in
 * `documents/article/objects/post-body.ts`, and a second copy here would be a
 * second answer to it.
 */
export const richTextSection = defineType({
  name: "richTextSection",
  title: "Rich text",
  type: "object",
  fields: [
    sectionVisibilityField,
    defineField({
      name: "title",
      title: "Section heading",
      type: "string",
      description:
        "Optional. Sits above the copy — leave it empty where the copy carries its own headings.",
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "postBody",
      validation: (r) => r.required().min(1),
    }),
  ],
  preview: {
    select: { title: "title", content: "content", enabled: "enabled" },
    prepare: ({ title, content, enabled }) => {
      // Portable Text has no plain-text field, so the first block's spans are
      // the only thing that can stand in for one in the list.
      const first = Array.isArray(content) ? content[0] : undefined;
      const children = (first?.children ?? []) as { text?: string }[];
      const excerpt = children
        .map((child) => child.text ?? "")
        .join("")
        .trim();

      return {
        title: title || excerpt || "Rich text",
        subtitle: `${title && excerpt ? excerpt : "Rich text"}`,
      };
    },
  },
});
