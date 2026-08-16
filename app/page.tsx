import dynamic from "next/dynamic";
import Header from "./features/landing/header";
import SiteFooter from "./shared/components/site-footer";

// Lazy load all sections with loading fallbacks
const HeroBanner = dynamic(() => import("./features/landing/hero-banner"), {
  loading: () => <div className="min-h-screen bg-background" />,
  ssr: true,
});

const ServicesGrid = dynamic(() => import("./features/landing/services-grid"), {
  loading: () => <div className="min-h-[600px] bg-background" />,
  ssr: true,
});

const GrowthSpurts = dynamic(
  () => import("./features/landing/growth-spruts/growth-spurts"),
  {
    loading: () => <div className="min-h-[600px] bg-background" />,
    ssr: true,
  },
);

const UnrivaledGrowth = dynamic(
  () => import("./features/landing/unrivaled-growth"),
  {
    loading: () => <div className="min-h-screen bg-background" />,
    ssr: true,
  },
);

const CaseStudy = dynamic(() => import("./features/landing/case-study"), {
  loading: () => <div className="min-h-[600px] bg-background" />,
  ssr: true,
});

const ArticleCards = dynamic(() => import("./features/landing/article-cards"), {
  loading: () => <div className="min-h-[600px] bg-background" />,
  ssr: true,
});

const Testimonials = dynamic(() => import("./features/landing/testimonials"), {
  loading: () => <div className="min-h-[600px] bg-background" />,
  ssr: true,
});

const GrowthValidation = dynamic(
  () => import("./features/landing/growth-validation"),
  {
    loading: () => <div className="min-h-[600px] bg-background" />,
    ssr: true,
  },
);

const TeamSection = dynamic(() => import("./features/landing/team-section"), {
  loading: () => <div className="min-h-[600px] bg-background" />,
  ssr: true,
});

export default function Home() {
  return (
    <div className="body-wrapper hs-content-id-153839881997 hs-site-page page">
      <Header />
      <HeroBanner />
      <ServicesGrid />
      <GrowthSpurts />
      <UnrivaledGrowth />
      <CaseStudy />
      <ArticleCards />
      <Testimonials />
      <GrowthValidation />
      <TeamSection />
      <SiteFooter />
    </div>
  );
}
