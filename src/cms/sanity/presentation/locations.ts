import { defineDocuments, defineLocations } from "sanity/presentation";
import type { PresentationPluginOptions } from "sanity/presentation";

import {
  MAX_SEGMENTS,
  pageFilter,
  pageHref,
  pagePath,
  reportHref,
} from "./routes";

/**
 * What Presentation needs to keep the form and the preview pointing at the
 * same thing, in both directions.
 *
 * `locations` answers "where does this document appear on the site", which is
 * what puts a link at the top of the form and what Presentation opens when you
 * arrive from the Structure tool. `mainDocuments` answers the reverse — "which
 * document is this URL showing" — and is what keeps the document pane in sync
 * while an editor clicks around inside the preview iframe.
 *
 * The URL rules both sides need are in `./routes.ts`.
 */

/**
 * A page's path is composed from its ancestors, so the location needs their
 * slugs too.
 *
 * `select` looks like it cannot do that — a path is not a projection and
 * `parent` is a reference. It can: Presentation resolves these through the
 * Studio's preview store, whose `observePaths` follows a reference whenever a
 * path continues past one (see `observePaths` in `sanity`'s datastores). So
 * `parent.parent.slug.current` reads the grandparent's slug, and four levels
 * is `MAX_DEPTH` in `page.schema.ts` — the deepest a page is allowed to be.
 *
 * `title` is selected because the preview store expects a preview shape and
 * warns without one; it also gives the link something to be called.
 */
const page = defineLocations({
  select: {
    title: "title",
    slug: "slug.current",
    parent1: "parent.slug.current",
    parent2: "parent.parent.slug.current",
    parent3: "parent.parent.parent.slug.current",
  },
  resolve: (doc) => {
    if (!doc) return null;

    const path = pagePath([doc.parent3, doc.parent2, doc.parent1, doc.slug]);
    const href = pageHref(path);

    // Both failures are states an editor can genuinely be in, and both are
    // better said than shown as a broken link: a page with no slug yet, and a
    // page whose first segment is one a route of its own already owns.
    if (!doc.slug) {
      return {
        message: "Give this page a slug to see it on the site.",
        tone: "caution",
      };
    }

    if (!href) {
      return {
        message: `Nothing serves /${path} — its first segment belongs to another route. Rename the slug or move the page.`,
        tone: "critical",
      };
    }

    return {
      locations: [{ title: doc.title || "Untitled page", href }],
    };
  },
});

const report = defineLocations({
  select: { title: "title", slug: "slug.current" },
  resolve: (doc) => {
    const href = reportHref(doc?.slug);

    if (!href) {
      return {
        message: "Give this report a slug to see it on the site.",
        tone: "caution",
      };
    }

    return {
      locations: [{ title: doc?.title || "Untitled report", href }],
    };
  },
});

export const locations: PresentationPluginOptions["resolve"] = {
  locations: { page, report },

  /**
   * The routes the site actually serves, in the order Presentation should try
   * them: the two pages with routes of their own, then reports, then the
   * catch-all — which is listed once per depth because a route pattern matches
   * a fixed number of segments.
   */
  mainDocuments: defineDocuments([
    {
      route: "/",
      filter: `_type == "page" && slug.current == "home" && !defined(parent)`,
    },
    {
      route: "/post",
      filter: `_type == "page" && slug.current == "post" && !defined(parent)`,
    },
    {
      route: "/reports/:slug",
      filter: `_type == "report" && slug.current == $slug`,
    },
    {
      route: Array.from(
        { length: MAX_SEGMENTS },
        (_, depth) =>
          `/${Array.from({ length: depth + 1 }, (__, i) => `:s${i}`).join("/")}`,
      ),
      // `params` arrives as whichever of `:s0`…`:s3` the matched pattern
      // filled, so the depth is read off the object rather than passed in.
      resolve: ({ params }) =>
        pageFilter(
          Array.from({ length: MAX_SEGMENTS }, (_, i) => params[`s${i}`]).filter(
            (segment): segment is string => typeof segment === "string",
          ),
        ),
    },
  ]),
};
