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

const TeamSection = dynamic(
  () => import("@/components/sections/team-section/team-section"),
  {
    loading: () => <div className="min-h-[600px] bg-background" />,
    ssr: true,
  },
);

export function SectionRenderer({ section }: { section: PageSection }) {
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

    default:
      // An unknown section means the Studio is ahead of this deploy. Render
      // nothing rather than crashing the whole page.
      return null;
  }
}
