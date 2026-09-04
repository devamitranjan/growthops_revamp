import { defineField, defineType } from "sanity";

import { sectionVisibilityField } from "../section-visibility-field";
import { sectionPreviewHelper } from "../section.schema";
import {
  DEFAULT_POSTS_PER_PAGE,
  MAX_POSTS_PER_PAGE,
  MIN_POSTS_PER_PAGE,
} from "@/content/domain/article/article.pagination";

/**
 * The paginated list of articles, as seen at /post.
 *
 * The cards are every `article` document — the section carries the heading and
 * the page size. Which articles appear, and in what order, is decided by the
 * documents themselves (see `documents/article.ts`), and the page number comes
 * from the URL.
 */
export const postListingSection = defineType({
  name: "postListingSection",
  title: "Article listing",
  type: "object",
  fields: [
    sectionVisibilityField,
    defineField({
      name: "heading",
      title: "Heading",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "postsPerPage",
      title: "Posts per page",
      type: "number",
      description:
        `How many posts one page of the listing shows before the pagination ` +
        `takes over. Leave empty for ${DEFAULT_POSTS_PER_PAGE}.`,
      initialValue: DEFAULT_POSTS_PER_PAGE,
      // Not `required()`: the field is being added to sections that already
      // exist, and an empty one falls back to the default rather than making
      // every published page invalid overnight.
      validation: (r) =>
        r.integer().min(MIN_POSTS_PER_PAGE).max(MAX_POSTS_PER_PAGE),
    }),
  ],
  preview: {
    select: { title: "heading", postsPerPage: "postsPerPage", enabled: "enabled" },
    prepare: ({ title, postsPerPage, enabled }) => ({
      title: title ?? "Article listing",
      subtitle: `Article listing · ${postsPerPage ?? DEFAULT_POSTS_PER_PAGE} per page`,
    }),
  },
});
