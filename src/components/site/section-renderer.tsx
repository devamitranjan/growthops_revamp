import dynamic from "next/dynamic";

import type { PageSection } from "@/sanity/types";

/**
 * The page builder's `_type` -> component map.
 *
 * Every section keeps its own `dynamic()` boundary and loading skeleton, the
 * same way the hand-composed home page had them: the skeletons reserve height
 * so the pinned GSAP sections below do not jump while a chunk loads.
 */

const HeroBanner = dynamic(
  () =>
    import("@/components/sections/hero-banner/hero-banner").then(
      (module) => module.HeroBanner,
    ),
  {
    loading: () => <div className="min-h-screen bg-background" />,
    ssr: true,
  },
);

const ServicesGrid = dynamic(
  () => import("@/components/sections/services-grid"),
  {
    loading: () => <div className="min-h-[600px] bg-background" />,
    ssr: true,
  },
);

const GrowthSpurts = dynamic(
  () => import("@/components/sections/growth-spurts/growth-spurts"),
  {
    loading: () => <div className="min-h-[600px] bg-background" />,
    ssr: true,
  },
);

const UnrivaledGrowth = dynamic(
  () =>
    import("@/components/sections/unrivaled-growth/unrivaled-growth").then(
      (module) => module.UnrivaledGrowth,
    ),
  {
    loading: () => <div className="min-h-screen bg-background" />,
    ssr: true,
  },
);

const CaseStudy = dynamic(() => import("@/components/sections/case-study"), {
  loading: () => <div className="min-h-[600px] bg-background" />,
  ssr: true,
});

const ArticleCards = dynamic(
  () => import("@/components/sections/article-cards"),
  {
    loading: () => <div className="min-h-[600px] bg-background" />,
    ssr: true,
  },
);

const Testimonials = dynamic(
  () => import("@/components/sections/testimonials/testimonials"),
  {
    loading: () => <div className="min-h-[600px] bg-background" />,
    ssr: true,
  },
);

const GrowthValidation = dynamic(
  () => import("@/components/sections/growth-validation/growth-validation"),
  {
    loading: () => <div className="min-h-[600px] bg-background" />,
    ssr: true,
  },
);

const CultureValidation = dynamic(
  () => import("@/components/sections/culture-validation/culture-validation"),
  {
    loading: () => <div className="min-h-[600px] bg-background" />,
    ssr: true,
  },
);

const TeamSection = dynamic(
  () => import("@/components/sections/team-section/team-section"),
  {
    loading: () => <div className="min-h-[600px] bg-background" />,
    ssr: true,
  },
);

const CreativeTech = dynamic(
  () => import("@/components/sections/creative-tech/creative-tech"),
  {
    loading: () => <div className="min-h-[500px] bg-background" />,
    ssr: true,
  },
);

const Faq = dynamic(() => import("@/components/sections/faq"), {
  loading: () => <div className="min-h-[500px] bg-background" />,
  ssr: true,
});

const ContactForm = dynamic(() => import("@/components/sections/contact-form"), {
  loading: () => <div className="min-h-screen bg-background" />,
  ssr: true,
});

const PostListingSection = dynamic(
  () =>
    import("@/components/sections/post-listing/post-listing-section").then(
      (module) => module.default,
    ),
  {
    loading: () => <div className="min-h-screen bg-background" />,
    ssr: true,
  },
);

const NewsroomListing = dynamic(
  () => import("@/components/sections/newsroom-listing"),
  {
    loading: () => <div className="min-h-screen bg-background" />,
    ssr: true,
  },
);

const ReportOverview = dynamic(
  () =>
    import("@/components/sections/report-overview/report-overview").then(
      (module) => module.ReportOverview,
    ),
  {
    loading: () => <div className="min-h-[600px] bg-background" />,
    ssr: true,
  },
);

const DownloadReportForm = dynamic(
  () => import("@/components/sections/download-report-form"),
  {
    loading: () => <div className="min-h-[600px] bg-background" />,
    ssr: true,
  },
);

/**
 * What a section can need from the request rather than from the CMS.
 *
 * Only the article listing uses it, for the `?page=` it is showing. It is
 * threaded through as a prop rather than read from `searchParams` inside the
 * section because the route has already validated the number — an out-of-range
 * page is a 404, not a page-one fallback, and that decision belongs to the
 * route.
 */
export interface SectionContext {
  /** 1-based page number for a paginated listing section. */
  page?: number;
}

export function SectionRenderer({
  section,
  context,
}: {
  section: PageSection;
  context?: SectionContext;
}) {
  switch (section._type) {
    case "heroSection":
      return <HeroBanner data={section.hero} />;

    case "servicesSection":
      return <ServicesGrid services={section.services} />;

    case "growthSpurtsSection":
      return <GrowthSpurts cards={section.cards} />;

    case "unrivaledGrowthSection":
      return (
        <UnrivaledGrowth
          data={{ title: section.title, stats: section.stats, cta: section.cta }}
        />
      );

    case "caseStudySection":
      return <CaseStudy slides={section.slides} />;

    case "articleCardsSection":
      return (
        <ArticleCards
          title={section.title}
          sectionLink={section.sectionLink}
          articles={section.articles}
        />
      );

    case "testimonialsBlock":
      return <Testimonials data={section.data} />;

    case "growthValidationSection":
      return (
        <GrowthValidation
          data={{
            title: section.title,
            sectionLink: section.sectionLink,
            eyebrow: section.eyebrow,
            headline: section.headline,
            awards: section.awards,
            image: section.image,
            imageAlt: section.imageAlt,
          }}
        />
      );

    case "cultureValidationSection":
      return (
        <CultureValidation
          data={{ title: section.title, cards: section.cards }}
        />
      );

    case "teamSection":
      return (
        <TeamSection
          data={{
            title: section.title,
            batches: section.batches,
            highlight: section.highlight,
          }}
        />
      );

    case "creativeTechSection":
      return <CreativeTech data={{ title: section.title, rows: section.rows }} />;

    case "faqSection":
      return (
        <Faq
          data={{
            title: section.title,
            eyebrow: section.eyebrow,
            items: section.items,
            openFirst: section.openFirst,
          }}
        />
      );

    case "contactFormSection":
      return <ContactForm title={section.title} />;

    case "postListingSection":
      return (
        <PostListingSection
          heading={section.heading}
          page={context?.page ?? 1}
        />
      );

    case "newsroomListingSection":
      return (
        <NewsroomListing
          data={{
            heading: section.heading,
            readMoreLabel: section.readMoreLabel,
            articles: section.articles,
          }}
        />
      );

    case "reportOverviewSection":
      return (
        <ReportOverview
          data={{ highlights: section.highlights, slides: section.slides }}
        />
      );

    case "downloadReportSection":
      return <DownloadReportForm title={section.title} />;

    default:
      // An unknown section means the Studio is ahead of this deploy. Render
      // nothing rather than crashing the whole page.
      return null;
  }
}
