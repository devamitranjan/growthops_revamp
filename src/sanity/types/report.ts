import type { IHeroBannerData } from "./home";

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

/** A gated report landing page, addressed by slug at the site root. */
export interface ReportPageData {
  slug: string;
  heroBannerData: IHeroBannerData;
  reportHighlights: ReportHighlight[];
  reportSlides: ReportSlide[];
}
