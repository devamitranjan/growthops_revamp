import type { PageData } from "./page.types";

/**
 * Composed pages, addressed the way the site addresses them: by URL path.
 *
 * How a path maps to a document is the CMS's problem, not the application's.
 * Sanity has no path field at all — the adapter walks a parent chain to build
 * one — and a different CMS might store the whole path outright. Either way
 * the route asks the same question.
 *
 * No GROQ, no client, no import from `src/cms`. Bound to an implementation in
 * `src/content/repositories.ts`.
 */
export interface PageRepository {
  /** One composed page by its full URL path — `about`, or `services/seo`.
   *  `null` when no page resolves there. */
  getByPath(path: string): Promise<PageData | null>;

  /** The home page. Its own route is `/`, so it has no path of its own to ask
   *  for. */
  getHomePage(): Promise<PageData | null>;

  /** Every servable page path, for `generateStaticParams` on /[...slug].
   *  Must be read uncached, for the reason spelled out on
   *  `ArticleRepository.getSlugs`. */
  getPaths(): Promise<string[]>;
}

/**
 * The path the home page's document occupies in the page tree.
 *
 * It is served at `/`, not at `/home` — the catch-all route reserves the
 * segment so the same page cannot also answer at a second URL. That is a
 * routing decision, which is why the constant lives here rather than in a CMS
 * adapter.
 */
export const HOME_PAGE_PATH = "home";

export type { PageData };
