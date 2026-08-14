import {
  GrowthSpurts,
  ServicesGrid,
  ArticleCards,
  GrowthValidation,
  TeamSection,
} from "./features";
import SiteFooter from "./shared/components/site-footer";

// Header, HeroBanner, UnrivaledGrowth, CaseStudy, and Testimonials live in
// app/features/landing but are intentionally excluded from this page for now.
export default function Home() {
  return (
    <div className="body-wrapper hs-content-id-153839881997 hs-site-page page">
      <GrowthSpurts />
      <ServicesGrid />
      <ArticleCards />
      <GrowthValidation />
      <TeamSection />
      <SiteFooter />
    </div>
  );
}
