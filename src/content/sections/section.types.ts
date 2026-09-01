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
  IHeroBannerData,
  IRichTextData,
  ITeamSectionData,
  IUnrivaledGrowthData,
  ServiceItem,
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
  | { type: "hero"; key: string; hero: IHeroBannerData }
  | { type: "services"; key: string; services: ServiceItem[] }
  | { type: "growthSpurts"; key: string; cards: GrowthCardData[] }
  | ({ type: "unrivaledGrowth"; key: string } & IUnrivaledGrowthData)
  | { type: "caseStudy"; key: string; slides: CaseStudySlideData[] }
  | {
      type: "articleCards";
      key: string;
      title: string;
      sectionLink?: string;
      articles: ArticleData[];
    }
  | { type: "testimonials"; key: string; data: ITestimonialsData }
  | ({ type: "growthValidation"; key: string } & GrowthValidationData)
  | ({ type: "cultureValidation"; key: string } & ICultureValidationData)
  | ({ type: "contentRail"; key: string } & IContentRailData)
  | ({ type: "richText"; key: string } & IRichTextData)
  | ({ type: "team"; key: string } & ITeamSectionData)
  | ({ type: "creativeTech"; key: string } & ICreativeTechData)
  | ({ type: "faq"; key: string } & IFaqData)
  | { type: "contactForm"; key: string; title: string }
  | {
      type: "postListing";
      key: string;
      heading: string;
      /** How many cards one page shows. Absent on sections published before
       *  the field existed, which fall back to `DEFAULT_POSTS_PER_PAGE`. */
      postsPerPage?: number | null;
    }
  | ({ type: "newsroomListing"; key: string } & NewsroomListingData)
  | ({ type: "reportOverview"; key: string } & ReportOverviewData)
  | { type: "downloadReport"; key: string; title?: string }
  | {
      type: "servicesShowcase";
      key: string;
      title: string;
      services: {
        id: string;
        title: string;
        imgSrc: string;
        alt: string;
      }[];
    }

/** The discriminants above, as a type — what a renderer keys its component map
 *  on, and what a CMS adapter has to be able to produce. */
export type PageSectionType = PageSection["type"];
