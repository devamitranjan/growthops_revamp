import type {
  StructureBuilder,
  StructureResolver,
  StructureResolverContext,
} from "sanity/structure";

import { apiVersion } from "./env";
import { sectionTypes } from "./schema-types/sections";

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
 */

/** Pages that must exist exactly once, pinned to a fixed document id so an
 *  editor gets one editable page rather than a "create new" list. Each id is
 *  also the route it serves, which is why they never change. */
const PINNED_PAGES = [
  { id: "page-home", title: "Home page" },
  { id: "page-contact", title: "Contact page" },
  { id: "page-newsroom", title: "Newsroom page" },
  { id: "page-post", title: "Post page" },
];

const PINNED_PAGE_IDS = PINNED_PAGES.map((page) => page.id);

/**
 * The sections on one document, draft included.
 *
 * `perspective: "drafts"` is what makes the list match what the editor is
 * looking at: a section added but not yet published exists only on the draft,
 * and a sidebar that ignored it would contradict the form next to it.
 */
const SECTIONS_QUERY = `*[_id == $id][0].sections[]{
  _key,
  _type,
  title,
  heading,
  "heroTitle": hero.title
}`;

interface SectionRow {
  _key: string;
  _type: string;
  title?: string;
  heading?: string;
  heroTitle?: string;
}

/** The document types that carry a `sections` array. A new composed document
 *  type needs adding here, or it will be missing from every section's usage
 *  list even though the section is on it. */
const COMPOSED_TYPES = ["page", "report"];

/**
 * Every document carrying at least one instance of a given section.
 *
 * Same `drafts` perspective as above and for the same reason: a section only
 * just dropped onto a page should already show that page as a user of it.
 */
const SECTION_USAGE_QUERY = `*[_type in $types && count(sections[_type == $sectionType]) > 0]
  | order(_type asc, title asc) {
    _id,
    _type,
    title,
    "uses": count(sections[_type == $sectionType])
  }`;

interface SectionUsageRow {
  _id: string;
  _type: string;
  title?: string;
  uses: number;
}

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
    const client = context
      .getClient({ apiVersion })
      .withConfig({ perspective: "drafts" });

    const sections: SectionRow[] =
      (await client.fetch(SECTIONS_QUERY, { id })) ?? [];

    const openDocument = (paneTitle: string) =>
      S.document().schemaType(type).documentId(id).title(paneTitle);

    return S.list()
      .title(title)
      .id("composed-document")
      .items([
        S.listItem().id("settings").title("Page settings").child(openDocument(title)),

        ...(sections.length ? [S.divider().title("Sections")] : []),

        ...sections.map((section, index) => {
          const label =
            section.title ||
            section.heading ||
            section.heroTitle ||
            context.schema.get(section._type)?.title ||
            section._type;

          return S.listItem()
            .id(section._key || `section-${index}`)
            .title(label)
            .child(openDocument(label));
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
    const client = context
      .getClient({ apiVersion })
      .withConfig({ perspective: "drafts" });

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
        ...(usages.length ? [] : [S.divider().title("Not used on any page yet")]),

        ...usages.map((usage) => {
          // The drafts perspective hands back the draft id where one exists;
          // the document pane needs the published id it hangs off.
          const id = usage._id.replace(/^drafts\./, "");
          const name = usage.title ?? id;
          // A section can be used more than once on the same page, and an
          // editor heading here to change one needs to know that up front.
          const label = usage.uses > 1 ? `${name} (${usage.uses}\u00d7)` : name;

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
          .child(composedDocumentChild(S, context, { id, type: "page", title })),
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
            .filter("_type == $type && !(_id in $pinned) && !(_id in $pinnedDrafts)")
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
      // document type without an entry has no pane of its own. `article`,
      // `newsroomArticle` and `report` are deliberately in that position: they
      // are reached through the section that references them, not from here.
      // A new document type needing its own pane wants an entry above.
    ]);
