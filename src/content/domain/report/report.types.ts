import type { SeoMetadata } from "@/content/models/seo";
import type { PageSection } from "@/content/sections/section.types";

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

/** What the report overview section renders. */
export interface ReportOverviewData {
  highlights: ReportHighlight[];
  slides: ReportSlide[];
}

/**
 * A gated report landing page, served at /reports/<slug>.
 *
 * Composed from the same section library as every other page, so this is
 * `PageData` with a report's own name on it — `title` is the CMS's label for
 * the document, not something the page renders.
 */
export interface ReportPageData {
  slug: string;
  title: string;
  seo?: SeoMetadata;
  sections: PageSection[];
}
