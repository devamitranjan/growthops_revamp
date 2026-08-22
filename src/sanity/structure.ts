import type { StructureResolver } from "sanity/structure";

/**
 * Documents that must exist exactly once are pinned to a fixed id here and
 * filtered out of the generic lists below, so editors get one editable
 * document instead of a "create new" list.
 */
const SINGLETONS: { type: string; id: string; title: string }[] = [
  { type: "page", id: "page-home", title: "Home page" },
  { type: "siteSettings", id: "siteSettings", title: "Site settings" },
  { type: "testimonialsSection", id: "testimonialsSection", title: "Testimonials" },
];

const LISTED = ["page", "article", "report"];

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      ...SINGLETONS.map(({ type, id, title }) =>
        S.listItem()
          .title(title)
          .id(id)
          .child(S.document().schemaType(type).documentId(id).title(title)),
      ),

      S.divider(),

      S.documentTypeListItem("article").title("Articles"),
      S.documentTypeListItem("report").title("Reports"),

      S.divider(),

      S.listItem()
        .title("All pages")
        .id("allPages")
        .child(S.documentTypeList("page").title("Pages")),

      ...S.documentTypeListItems().filter((item) => {
        const id = item.getId() as string;
        return !SINGLETONS.some((s) => s.type === id) && !LISTED.includes(id);
      }),
    ]);
