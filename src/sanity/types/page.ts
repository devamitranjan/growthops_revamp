import type { ITestimonialsData } from "./testimonial";
import type {
  ArticleData,
  CaseStudySlideData,
  GrowthCardData,
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
  | ({ _type: "teamSection"; _key: string } & ITeamSectionData);

/** Everything `getPage()` resolves — one composed page. */
export interface PageData {
  slug: string;
  title: string;
  sections: PageSection[];
}
