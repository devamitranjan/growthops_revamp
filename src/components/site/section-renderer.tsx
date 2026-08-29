import dynamic from "next/dynamic";

import type { PageSection } from "@/content/types";

/**
 * The page builder's section -> component map.
 *
 * It switches on `section.type`, which is the *application's* name for a
 * section — `"hero"`, not Sanity's `"heroSection"`. The translation happens
 * once, in `src/cms/sanity/sections/section.mapper.ts`, so this file has no
 * idea which CMS composed the page and a CMS swap does not reach it. The
 * seventeen names below and the seventeen in that mapper's table are the two
 * halves of one contract; `PageSection` is what holds them together, and an
 * unhandled member is a type error rather than a blank page.
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
  switch (section.type) {
    case "hero":
      return <HeroBanner data={section.hero} />;

    case "services":
      return <ServicesGrid services={section.services} />;

    case "growthSpurts":
      return <GrowthSpurts cards={section.cards} />;

    case "unrivaledGrowth":
      return (
        <UnrivaledGrowth
          data={{ title: section.title, stats: section.stats, cta: section.cta }}
        />
      );

    case "caseStudy":
      return <CaseStudy slides={section.slides} />;

    case "articleCards":
      return (
        <ArticleCards
          title={section.title}
          sectionLink={section.sectionLink}
          articles={section.articles}
        />
      );

    case "testimonials":
      return <Testimonials data={section.data} />;

    case "growthValidation":
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

    case "cultureValidation":
      return (
        <CultureValidation
          data={{ title: section.title, cards: section.cards }}
        />
      );

    case "team":
      return (
        <TeamSection
          data={{
            title: section.title,
            batches: section.batches,
            highlight: section.highlight,
          }}
        />
      );

    case "creativeTech":
      return <CreativeTech data={{ title: section.title, rows: section.rows }} />;

    case "faq":
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

    case "contactForm":
      return <ContactForm title={section.title} />;

    case "postListing":
      return (
        <PostListingSection
          heading={section.heading}
          page={context?.page ?? 1}
          postsPerPage={section.postsPerPage}
        />
      );

    case "newsroomListing":
      return (
        <NewsroomListing
          data={{
            heading: section.heading,
            readMoreLabel: section.readMoreLabel,
            articles: section.articles,
          }}
        />
      );

    case "reportOverview":
      return (
        <ReportOverview
          data={{ highlights: section.highlights, slides: section.slides }}
        />
      );

    case "downloadReport":
      return <DownloadReportForm title={section.title} />;

    default:
      // Unreachable while the switch covers `PageSection` — a new member is a
      // type error on this line rather than a silent gap. It still returns
      // rather than throws, because a section a CMS adapter cannot map is
      // dropped before it gets here (see `mapSections`), and an empty slot
      // beats a page that will not render.
      return null;
  }
}
