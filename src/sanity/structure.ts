import type { StructureResolver } from "sanity/structure";

/**
 * Documents that must exist exactly once are pinned to a fixed id here and
 * filtered out of the generic lists below, so editors get one editable
 * document instead of a "create new" list.
 */
const SINGLETONS: { type: string; id: string; title: string }[] = [
  { type: "page", id: "page-home", title: "Home page" },
  { type: "newsroomPage", id: "newsroomPage", title: "Newsroom page" },
  { type: "siteSettings", id: "siteSettings", title: "Site settings" },
  { type: "testimonialsSection", id: "testimonialsSection", title: "Testimonials" },
];

const LISTED = ["page", "article", "report", "newsroomArticle"];

/**
 * /newsroom in one place: the page copy and the cards it heads.
 *
 * `newsroomArticle` is not also listed at the top level. The documents have no
 * life outside this one route — no slug, no detail page, nothing else reads
 * them — so a second entry beside "Articles" and "Reports" would only invite
 * the question of which of the two is the real one.
 *
 * This list is every article document that exists, which is not the same as
 * what /newsroom shows: the page document's `articles` list decides that, and
 * an article missing from it is hidden. So editors create and edit articles
 * here, then open "Page settings" to put one on the page, reorder it, or take
 * it down again.
 */
const newsroomChild = (S: Parameters<StructureResolver>[0]) =>
  S.list()
    .title("Newsroom page")
    .items([
      S.listItem()
        .title("Page settings")
        .id("newsroomPageSettings")
        .child(
          S.document()
            .schemaType("newsroomPage")
            .documentId("newsroomPage")
            .title("Newsroom page"),
        ),
      S.listItem()
        .title("Articles")
        .id("newsroomArticles")
        .child(
          // Same order the site falls back to, so the list reads the way the
          // page does once nothing is pinned.
          S.documentTypeList("newsroomArticle")
            .title("Articles")
            .defaultOrdering([{ field: "publishedAt", direction: "desc" }]),
        ),
    ]);

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      ...SINGLETONS.map(({ type, id, title }) =>
        S.listItem()
          .title(title)
          .id(id)
          .child(
            type === "newsroomPage"
              ? newsroomChild(S)
              : S.document().schemaType(type).documentId(id).title(title),
          ),
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
