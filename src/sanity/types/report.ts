import type { PageSection, PageSeo } from "./page";

export interface ReportHighlight {
  id: string;
  /** Rendered under an auto-generated "01." style index. */
  title: string;
}

export interface ReportSlide {
  id: string;
  src: string;
  alt: string;
}

/** What the `reportOverviewSection` renders. */
export interface ReportOverviewData {
  highlights: ReportHighlight[];
  slides: ReportSlide[];
}

/**
 * A gated report landing page, served at /reports/<slug>.
 *
 * Composed from the same section library as every other page, so this is the
 * `PageData` shape with a report's own name on it — `title` is the Studio's
 * label for the document, not something the page renders.
 */
export interface ReportPageData {
  slug: string;
  title: string;
  seo?: PageSeo;
  sections: PageSection[];
}
