import {
  ServicesGrid,
  ArticleCards,
  CaseStudy,
  GrowthValidation,
  TeamSection,
  UnrivaledGrowth,
  Testimonials,
  HeroBanner,
} from "./features";
import GrowthSpurts from "./features/landing/growth-spruts/growth-spurts";
import SiteFooter from "./shared/components/site-footer";

// Header, HeroBanner, CaseStudy, and Testimonials live in
// app/features/landing but are intentionally excluded from this page for now.
export default function Home() {
  return (
    <div className="body-wrapper hs-content-id-153839881997 hs-site-page page">
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
