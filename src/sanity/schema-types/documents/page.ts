import { defineField, defineType } from "sanity";

import { apiVersion } from "../../env";

/** How many ancestors a page may have. Four segments is already deeper than
 *  this site needs, and a bound is what keeps a malformed chain from being
 *  walked forever. Mirrored by `MAX_PATH_DEPTH` in `repositories/page.ts`. */
const MAX_DEPTH = 3;

/** One path segment: lowercase alphanumerics and single inner hyphens. The
 *  slug input is hand-editable, so this is the only thing standing between an
 *  editor and a URL that cannot be served. A slash is rejected on purpose —
 *  nesting is the `parent` field's job, not the slug's. */
const SEGMENT = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * A composed page. Sections are reorderable, removable, and repeatable, so an
 * editor can build a new page without a developer.
 *
 * Creating a page document *does* create a URL — no route file, no deploy.
 * `src/app/(site)/[...slug]/page.tsx` serves every page at the path built from
 * its `parent` chain: a page slugged `seo` whose parent is `services` is
 * served at /services/seo. A page with no parent sits at the root.
 *
 * Two documents are served elsewhere and are the reason `RESERVED_SEGMENTS` in
 * that route exists: `home` is served at `/` by `(site)/page.tsx`, and `post`
 * by `(site)/post/page.tsx`, which needs to validate `?page=` before anything
 * renders. `contact` and `newsroom` are *not* special — they are ordinary page
 * documents served by the catch-all like any other.
 *
 * The section library lives in `schema-types/sections/index.ts` — the
 * `pageSections` array offers all of it, and each section instance carries its
 * own content, so the same section can appear on several pages saying
 * different things.
 */
export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      description:
        "This page's own URL segment — `seo`, not `services/seo`. Put it under another page with the Parent field below.",
      validation: (r) =>
        r.required().custom((value) => {
          const current = value?.current;
          if (!current) return true;

          return SEGMENT.test(current)
            ? true
            : "Use lowercase letters, numbers and hyphens only — no slashes, spaces or capitals. To nest this page, set a Parent instead.";
        }),
    }),
    defineField({
      name: "parent",
      title: "Parent page",
      type: "reference",
      to: [{ type: "page" }],
      description:
        "Optional. The page this one sits under — its path is prefixed to this page's slug. Leave empty for a top-level URL.",
      // A parent is only meaningful while it can still reach the root inside
      // MAX_DEPTH, so both failures are caught in the same walk: a cycle, and
      // a chain that has simply grown too deep to serve.
      validation: (r) =>
        r.custom(async (value, context) => {
          const parentId = value?._ref;
          if (!parentId) return true;

          // The document being edited is a draft; its parent reference points
          // at a published id. Compare on the published id or a page would be
          // allowed to become its own parent.
          const selfId = context.document?._id?.replace(/^drafts\./, "");

          if (parentId === selfId) return "A page cannot be its own parent.";

          const client = context.getClient({ apiVersion });
          const seen = new Set<string>([selfId, parentId].filter(Boolean) as string[]);

          let cursor: string | undefined = parentId;
          let depth = 1;

          while (cursor) {
            const next: string | null = await client.fetch(
              `*[_id == $id][0].parent._ref`,
              { id: cursor },
            );

            if (!next) return true;

            if (next === selfId) {
              return "That page is already below this one — the two would point at each other.";
            }

            if (seen.has(next)) {
              return "That page is part of a loop of parents. Fix the loop before using it here.";
            }

            if (++depth > MAX_DEPTH) {
              return `Pages can be nested at most ${MAX_DEPTH} levels deep.`;
            }

            seen.add(next);
            cursor = next;
          }

          return true;
        }),
    }),
    defineField({
      name: "sections",
      title: "Page sections",
      type: "pageSections",
      validation: (r) => r.required().min(1),
    }),
    defineField({ name: "seo", type: "seo" }),
  ],
  preview: {
    select: {
      title: "title",
      slug: "slug.current",
      // Preview cannot dereference, so the full path is not available here —
      // only whether there is a parent at all. A nested page is shown as
      // `…/slug` rather than a `/slug` that would be an outright lie.
      parent: "parent._ref",
      count: "sections.length",
    },
    prepare: ({ title, slug, parent, count }) => ({
      title: title ?? "Untitled page",
      subtitle: `${parent ? "…/" : "/"}${slug ?? ""} — ${count ?? 0} sections`,
    }),
  },
});
