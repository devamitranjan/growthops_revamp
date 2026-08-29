import type { NewsroomListingData } from "./newsroom";
import type { ReportOverviewData } from "./report";
import type { ITestimonialsData } from "./testimonial";
import type {
  ArticleData,
  CaseStudySlideData,
  GrowthCardData,
  ICreativeTechData,
  ICultureValidationData,
  IFaqData,
  IHeroBannerData,
  ITeamSectionData,
  IUnrivaledGrowthData,
  ServiceItem,
} from "./sections";

/**
 * One section of a composed page.
 *
 * `_type` is the discriminant and matches the schema type name exactly, so the
 * resolver map in `src/components/site/section-renderer.tsx` can switch on it.
 * `_key` is Sanity's stable array key and is what React keys on.
 *
 * Every page — the home page and anything an editor creates — is built from
 * this same union: the schema library in
 * `src/sanity/schema-types/sections/index.ts` decides what can be added, and a
 * section instance carries its own content, so the same section on two pages
 * shows two different sets of data.
 */
export interface GrowthValidationAward {
  href?: string;
  image: string;
  alt?: string;
}

export interface GrowthValidationData {
  title: string;
  sectionLink?: string;
  eyebrow?: string;
  headline: string;
  awards: GrowthValidationAward[];
  image: string;
  imageAlt: string;
}

export type PageSection =
  | { _type: "heroSection"; _key: string; hero: IHeroBannerData }
  | { _type: "servicesSection"; _key: string; services: ServiceItem[] }
  | { _type: "growthSpurtsSection"; _key: string; cards: GrowthCardData[] }
  | ({ _type: "unrivaledGrowthSection"; _key: string } & IUnrivaledGrowthData)
  | { _type: "caseStudySection"; _key: string; slides: CaseStudySlideData[] }
  | {
      _type: "articleCardsSection";
      _key: string;
      title: string;
      sectionLink?: string;
      articles: ArticleData[];
    }
  | { _type: "testimonialsBlock"; _key: string; data: ITestimonialsData }
  | ({ _type: "growthValidationSection"; _key: string } & GrowthValidationData)
  | ({ _type: "cultureValidationSection"; _key: string } & ICultureValidationData)
  | ({ _type: "teamSection"; _key: string } & ITeamSectionData)
  | ({ _type: "creativeTechSection"; _key: string } & ICreativeTechData)
  | ({ _type: "faqSection"; _key: string } & IFaqData)
  | { _type: "contactFormSection"; _key: string; title: string }
  | { _type: "postListingSection"; _key: string; heading: string }
  | ({ _type: "newsroomListingSection"; _key: string } & NewsroomListingData)
  | ({ _type: "reportOverviewSection"; _key: string } & ReportOverviewData)
  | { _type: "downloadReportSection"; _key: string; title?: string };

/** Per-page metadata overrides. Anything left empty falls back to the site
 *  defaults in `siteSettings`, or to the page's own title. */
export interface PageSeo {
  title?: string;
  description?: string;
  ogImage?: string;
}

/** Everything `getPage()` resolves — one composed page. */
export interface PageData {
  /** The full URL path this page is served at — `about`, `services/seo`.
   *  Composed from the `parent` chain, so it is not stored on the document. */
  path: string;
  /** This page's own segment, the last one in `path`. */
  slug: string;
  title: string;
  seo?: PageSeo;
  sections: PageSection[];
}
