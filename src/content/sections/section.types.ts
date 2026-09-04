import type { NewsroomListingData } from "@/content/domain/newsroom/newsroom.types";
import type { ReportOverviewData } from "@/content/domain/report/report.types";
import type { ITestimonialsData } from "@/content/domain/testimonial/testimonial.types";
import type {
  ArticleData,
  CaseStudySlideData,
  GrowthCardData,
  GrowthValidationData,
  IContentRailData,
  ICreativeTechData,
  ICultureValidationData,
  IFaqData,
  IGoodCompanyData,
  IHeroBannerData,
  IRichTextData,
  ITeamSectionData,
  IUnrivaledGrowthData,
  ServiceItem,
  WorkCaseStudyItem,
} from "./shared.types";

/**
 * One section of a composed page — the page builder's vocabulary, stated in
 * the application's own words.
 *
 * `type` is the discriminant, and it is deliberately *not* the CMS's type
 * name: Sanity calls the first one `heroSection`, and if that string reached
 * `section-renderer.tsx` then swapping the CMS would mean either editing every
 * branch of the renderer or naming a Contentful content type `heroSection` to
 * keep a Sanity-era string alive. The translation happens once, in
 * `src/cms/sanity/sections/section.mapper.ts`, and the table there is the only
 * place both vocabularies are written down.
 *
 * `key` is the same idea for identity: a stable, unique-within-the-page string
 * for React to key on, with the CMS's name (`_key`) taken off it.
 *
 * Every page — the home page, a report, anything an editor creates — is built
 * from this one union, and a section instance carries its own content, so the
 * same section on two pages shows two different sets of data.
 */
export type PageSection =
  | { type: "hero"; key: string; hero: IHeroBannerData; enabled?: boolean }
  | { type: "services"; key: string; services: ServiceItem[]; enabled?: boolean }
  | { type: "growthSpurts"; key: string; cards: GrowthCardData[]; enabled?: boolean }
  | ({ type: "unrivaledGrowth"; key: string; enabled?: boolean } & IUnrivaledGrowthData)
  | { type: "caseStudy"; key: string; slides: CaseStudySlideData[]; enabled?: boolean }
  | {
      type: "articleCards";
      key: string;
      title: string;
      sectionLink?: string;
      articles: ArticleData[];
      enabled?: boolean;
    }
  | { type: "testimonials"; key: string; data: ITestimonialsData; enabled?: boolean }
  | ({ type: "growthValidation"; key: string; enabled?: boolean } & GrowthValidationData)
  | ({ type: "cultureValidation"; key: string; enabled?: boolean } & ICultureValidationData)
  | ({ type: "contentRail"; key: string; enabled?: boolean } & IContentRailData)
  | ({ type: "richText"; key: string; enabled?: boolean } & IRichTextData)
  | ({ type: "team"; key: string; enabled?: boolean } & ITeamSectionData)
  | ({ type: "creativeTech"; key: string; enabled?: boolean } & ICreativeTechData)
  | ({ type: "goodCompany"; key: string; enabled?: boolean } & IGoodCompanyData)
  | ({ type: "faq"; key: string; enabled?: boolean } & IFaqData)
  | { type: "contactForm"; key: string; title: string; enabled?: boolean }
  | {
      type: "postListing";
      key: string;
      heading: string;
      /** How many cards one page shows. Absent on sections published before
       *  the field existed, which fall back to `DEFAULT_POSTS_PER_PAGE`. */
      postsPerPage?: number | null;
      enabled?: boolean;
    }
  | ({ type: "newsroomListing"; key: string; enabled?: boolean } & NewsroomListingData)
  | ({ type: "reportOverview"; key: string; enabled?: boolean } & ReportOverviewData)
  | { type: "downloadReport"; key: string; title?: string; enabled?: boolean }
  | { type: "seoAuditForm"; key: string; title?: string; enabled?: boolean }
  | {
      type: "workCaseStudies";
      key: string;
      categories?: string[];
      /** How many items one page shows. Absent on sections published before
       *  the field existed, which fall back to a default. */
      itemsPerPage?: number | null;
      items: WorkCaseStudyItem[];
      enabled?: boolean;
    };

/** The discriminants above, as a type — what a renderer keys its component map
 *  on, and what a CMS adapter has to be able to produce. */
export type PageSectionType = PageSection["type"];
