import dynamic from "next/dynamic";
import Header from "@/components/site/header";
import SiteFooter from "@/components/site/site-footer";
import { getHomePage } from "@/sanity/repositories/home";
import { getTestimonials } from "@/sanity/repositories/testimonials";

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

export default async function Home() {
  const [home, testimonials] = await Promise.all([
    getHomePage(),
    getTestimonials(),
  ]);

  return (
    <div className="body-wrapper hs-content-id-153839881997 hs-site-page page">
      <Header />
      <HeroBanner data={home.hero} />
      <ServicesGrid services={home.services} />
      <GrowthSpurts cards={home.growthSpurts} />
      <UnrivaledGrowth data={home.unrivaledGrowth} />
      <CaseStudy slides={home.caseStudies} />
      <ArticleCards articles={home.articles} />
      <Testimonials data={testimonials} />
      <GrowthValidation />
      <TeamSection data={home.team} />
      <SiteFooter />
    </div>
  );
}
