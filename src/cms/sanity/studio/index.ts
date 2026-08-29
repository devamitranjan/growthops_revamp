import type {
  StructureBuilder,
  StructureResolver,
  StructureResolverContext,
} from "sanity/structure";

import { apiVersion } from "../env";
import { sectionTypes } from "../sections/section.schema";
import { resolvePostsPerPage } from "@/content/domain/article/article.pagination";
import { PostOrderPane } from "./post-order-pane";
import {
  COMPOSED_TYPES,
  PINNED_PAGES,
  PINNED_PAGE_IDS,
} from "./structure.constants";
import {
  ARTICLE_ORDER_QUERY,
  SECTIONS_QUERY,
  SECTION_USAGE_QUERY,
} from "./structure.queries";
import type { SectionRow, SectionUsageRow } from "./structure.types";
import { getDraftsClient, getSectionLabel } from "./structure.utils";

/**
 * The Studio sidebar.
 *
 * Three groups, in the order someone works in them: the pages that exist, the
 * section library and where each section is used, and the settings that sit
 * behind everything.
 *
 * Every composed document — a `page` or a `report` — opens the same way:
 * "Page settings" for the document itself, then one item per section it
 * carries, so you can see what a page is made of without opening it.
 *
 * The constants, GROQ, types and helpers this file reads sit in the siblings
 * next to it; what is left here is the resolver and the three panes it builds.
 */

/**
 * A composed document's pane: "Page settings" plus one item per section.
 *
 * Every item opens the same document — a section is an object *inside* the
 * page, not a document of its own, so there is nothing else to open. The list
 * earns its place by showing what the page is made of, and by naming each
 * section with the copy an editor recognises rather than its schema type.
 *
 * Reordering happens in the form: the "Page sections" array is drag-sortable,
 * and this list follows it the next time it is opened.
 */
function composedDocumentChild(
  S: StructureBuilder,
  context: StructureResolverContext,
  { id, type, title }: { id: string; type: string; title: string },
) {
  return async () => {
    const client = getDraftsClient(context);

    const sections: SectionRow[] =
      (await client.fetch(SECTIONS_QUERY, { id })) ?? [];

    const openDocument = (paneTitle: string) =>
      S.document().schemaType(type).documentId(id).title(paneTitle);

    return S.list()
      .title(title)
      .id("composed-document")
      .items([
        S.listItem()
          .id("settings")
          .title("Page settings")
          .child(openDocument(title)),

        ...(sections.length ? [S.divider().title("Sections")] : []),

        ...sections.map((section, index) => {
          const label = getSectionLabel(section, index, context);

          const item = S.listItem()
            .id(section._key || `section-${index}`)
            .title(label);

          // The one section whose content lives outside the page: it renders
          // article documents nobody can see from the form, so its item opens
          // the pages it will produce rather than the form alone.
          if (section._type === "postListingSection") {
            return item.child(
              postListingChild(S, context, {
                id,
                type,
                title: label,
                postsPerPage: section.postsPerPage,
              }),
            );
          }

          return item.child(openDocument(label));
        }),
      ]);
  };
}

/**
 * The article listing section's pane: the form, then one item per page of the
 * listing it produces.
 *
 * The section names a page size but not a single article — which posts appear,
 * and on which page, falls out of the `order` field on sixty separate
 * documents. That is invisible from the form, so an editor changing "posts per
 * page" from 10 to 12 has no way to see what page 3 becomes. This pane answers
 * it with the same query and the same page size the site uses, so the split
 * shown here is the split /post serves.
 *
 * Read at open time rather than live: it is a snapshot of the current order,
 * and reopening the pane re-runs it.
 */
function postListingChild(
  S: StructureBuilder,
  context: StructureResolverContext,
  {
    id,
    type,
    title,
    postsPerPage,
  }: { id: string; type: string; title: string; postsPerPage?: number },
) {
  return async () => {
    const client = getDraftsClient(context);

    // The drafts perspective answers with the draft id wherever one exists;
    // both forms are needed below, since an article that has never been
    // published only exists as a draft.
    const rows: { _id: string }[] =
      (await client.fetch(ARTICLE_ORDER_QUERY)) ?? [];
    const ids = rows.map((row) => row._id.replace(/^drafts\./, ""));

    const perPage = resolvePostsPerPage(postsPerPage);
    const pageCount = Math.ceil(ids.length / perPage);

    return S.list()
      .title(title)
      .id("post-listing")
      .items([
        S.listItem()
          .id("settings")
          .title("Section settings")
          .child(S.document().schemaType(type).documentId(id).title(title)),

        // Where the order is actually changed. The page lists below open and
        // search articles; this one moves them between pages, which nothing
        // else in the Studio can do — the position is a number on each of
        // sixty separate documents.
        S.listItem()
          .id("reorder")
          .title("Reorder posts")
          .child(
            S.component(PostOrderPane)
              .id("post-order")
              .title(`Reorder posts · ${title}`)
              .options({ perPage }),
          ),

        S.divider().title(
          ids.length
            ? `${ids.length} posts · ${perPage} per page`
            : "No articles yet",
        ),

        ...Array.from({ length: pageCount }, (_, index) => {
          const start = index * perPage;
          const pageIds = ids.slice(start, start + perPage);
          const pageTitle = `Page ${index + 1} · posts ${start + 1}–${
            start + pageIds.length
          }`;

          return S.listItem()
            .id(`page-${index + 1}`)
            .title(pageTitle)
            .child(
              S.documentList()
                .id(`post-listing-page-${index + 1}`)
                .title(pageTitle)
                .apiVersion(apiVersion)
                .filter("_id in $ids || _id in $draftIds")
                .params({
                  ids: pageIds,
                  draftIds: pageIds.map((pageId) => `drafts.${pageId}`),
                })
                // The listing's own order, not the list's default of newest
                // first — the point of the pane is the order /post renders.
                .defaultOrdering([{ field: "order", direction: "asc" }]),
            );
        }),
      ]);
  };
}

/**
 * One section type's pane: the pages and reports that use it.
 *
 * This is the Pages group's question asked the other way round — not "what is
 * this page made of" but "where does this section appear", which is what you
 * want to know before you change one. A section is an object inside a
 * document, so there is still nothing to open but the document that owns it,
 * and each item lands on the same composed view.
 *
 * The one section with content of its own is the testimonials block: it holds
 * a reference, so its pane leads with the shared document that every page
 * using it points at.
 */
function sectionUsageChild(
  S: StructureBuilder,
  context: StructureResolverContext,
  { name, title }: { name: string; title: string },
) {
  return async () => {
    const client = getDraftsClient(context);

    const usages: SectionUsageRow[] =
      (await client.fetch(SECTION_USAGE_QUERY, {
        types: COMPOSED_TYPES,
        sectionType: name,
      })) ?? [];

    return S.list()
      .title(title)
      .id("section-usage")
      .items([
        ...(name === "testimonialsBlock"
          ? [
              S.listItem()
                .id("testimonialsSection")
                .title("Shared testimonials")
                .child(
                  S.document()
                    .schemaType("testimonialsSection")
                    .documentId("testimonialsSection")
                    .title("Testimonials"),
                ),
              S.divider().title("Used on"),
            ]
          : []),

        // A divider carries the empty state: `items([])` gives a blank pane
        // that looks like something failed to load rather than an answer.
        ...(usages.length
          ? []
          : [S.divider().title("Not used on any page yet")]),

        ...usages.map((usage) => {
          // The drafts perspective hands back the draft id where one exists;
          // the document pane needs the published id it hangs off.
          const id = usage._id.replace(/^drafts\./, "");
          const name = usage.title ?? id;
          // A section can be used more than once on the same page, and an
          // editor heading here to change one needs to know that up front.
          const label = usage.uses > 1 ? `${name} (${usage.uses}×)` : name;

          return S.listItem()
            .id(id)
            .title(label)
            .child(() =>
              composedDocumentChild(S, context, {
                id,
                type: usage._type,
                title: label,
              })(),
            );
        }),
      ]);
  };
}

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title("Content")
    .items([
      // ── Pages ─────────────────────────────────────────────────────────
      S.divider().title("Pages"),

      ...PINNED_PAGES.map(({ id, title }) =>
        S.listItem()
          .title(title)
          .id(id)
          .child(
            composedDocumentChild(S, context, { id, type: "page", title }),
          ),
      ),

      S.listItem()
        .title("Reports")
        .id("allReports")
        // Reports are pages in every way that matters here — same section
        // library, same composed pane — so they sit with the pages rather than
        // in a group of their own. Nothing references a report document, which
        // is why they need an entry: without one there is no way to open an
        // existing report, let alone create a new one.
        .child(
          S.documentTypeList("report")
            .title("Reports")
            .child((id) =>
              composedDocumentChild(S, context, {
                id,
                type: "report",
                title: "Report",
              })(),
            ),
        ),

      S.listItem()
        .title("All pages")
        .id("allPages")
        // The pinned four are above; listing them again here would leave an
        // editor wondering which of the two entries is the real one. Drafts
        // carry a `drafts.` prefix, so they need excluding by name as well.
        .child(
          S.documentTypeList("page")
            .title("Pages")
            .apiVersion(apiVersion)
            .filter(
              "_type == $type && !(_id in $pinned) && !(_id in $pinnedDrafts)",
            )
            .params({
              type: "page",
              pinned: PINNED_PAGE_IDS,
              pinnedDrafts: PINNED_PAGE_IDS.map((id) => `drafts.${id}`),
            })
            .child((id) =>
              composedDocumentChild(S, context, {
                id,
                type: "page",
                title: "Page",
              })(),
            ),
        ),

      // ── Sections ──────────────────────────────────────────────────────
      // The whole section library, each entry opening the pages and reports
      // that use that section. The list is built from `sectionTypes`, the same
      // registration that fills the page builder's insert menu, so a section
      // added there shows up here without a second edit — and one that appears
      // here with nothing under it is a section nobody has used yet.
      S.divider().title("Sections"),

      ...sectionTypes.map((section) => {
        const title = section.title ?? section.name;

        return S.listItem()
          .title(title)
          .id(section.name)
          .child(sectionUsageChild(S, context, { name: section.name, title }));
      }),

      // ── Settings ──────────────────────────────────────────────────────
      S.divider().title("Settings"),

      S.listItem()
        .title("Site settings")
        .id("siteSettings")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .title("Site settings"),
        ),

      // Every entry above is placed by hand — there is no catch-all list, so a
      // document type without an entry has no pane of its own. `article` and
      // `newsroomArticle` are deliberately in that position: both are reached
      // through the section that puts them on a page, not from here — the
      // newsroom section through the reference list on its own form, the
      // article listing through the pane `composedDocumentChild` gives it
      // above, since that section references nothing. A new document type
      // needing its own pane wants an entry here.
    ]);
