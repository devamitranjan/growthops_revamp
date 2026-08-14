import Header from "./components/header";
import HeroBanner from "./components/hero-banner";
import ServicesGrid from "./components/services-grid";
import GrowthSpurts from "./components/growth-spurts";
import UnrivaledGrowth from "./components/unrivaled-growth";
import CaseStudy from "./components/case-study";
import ArticleCards from "./components/article-cards";
import Testimonials from "./components/testimonials";
import GrowthValidation from "./components/growth-validation";
import TeamSection from "./components/team-section";
import SiteFooter from "./components/site-footer";

export default function Home() {
  return (
    <div className="body-wrapper hs-content-id-153839881997 hs-site-page page">
      {/* <Header />
      <HeroBanner />
      <ServicesGrid /> */}
      <GrowthSpurts />
      {/* <UnrivaledGrowth /> 
      <CaseStudy />
      <ArticleCards />
      <Testimonials />
      <GrowthValidation /> */}
      <ServicesGrid />
      <CaseStudy />
      <ArticleCards />
      <Testimonials />
      <GrowthValidation />
      <TeamSection />
      <SiteFooter />
    </div>
  );
}
