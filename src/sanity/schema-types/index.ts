import type { SchemaTypeDefinition } from "sanity";

import { article } from "./documents/article";
import { page } from "./documents/page";
import { report } from "./documents/report";
import { siteSettings } from "./documents/site-settings";
import { testimonialsSection } from "./documents/testimonials-section";
import { articleTeaser } from "./objects/article-teaser";
import { caseStudySlide } from "./objects/case-study-slide";
import { clientLogo } from "./objects/client-logo";
import { footerLink } from "./objects/footer-link";
import { growthCard } from "./objects/growth-card";
import { growthStat } from "./objects/growth-stat";
import { heroBanner } from "./objects/hero-banner";
import { linkCta } from "./objects/link-cta";
import { navChild, navLink } from "./objects/nav-link";
import { postBody } from "./objects/post-body";
import { postImage } from "./objects/post-image";
import { postQuote } from "./objects/post-quote";
import { reportHighlight } from "./objects/report-highlight";
import { reportSlide } from "./objects/report-slide";
import { seo } from "./objects/seo";
import { serviceItem } from "./objects/service-item";
import { socialLink } from "./objects/social-link";
import { subjectOption } from "./objects/subject-option";
import { teamBatch } from "./objects/team-batch";
import { teamHighlight } from "./objects/team-highlight";
import { teamMember } from "./objects/team-member";
import { testimonial } from "./objects/testimonial";
import { articleCardsSection } from "./sections/article-cards-section";
import { caseStudySection } from "./sections/case-study-section";
import { growthSpurtsSection } from "./sections/growth-spurts-section";
import { growthValidationSection } from "./sections/growth-validation-section";
import { heroSection } from "./sections/hero-section";
import { servicesSection } from "./sections/services-section";
import { teamSection } from "./sections/team-section";
import { testimonialsBlock } from "./sections/testimonials-block";
import { unrivaledGrowthSection } from "./sections/unrivaled-growth-section";

/**
 * Only types listed here are part of the Studio schema and reach schema
 * extraction. Adding a file is not enough.
 */
export const schemaTypes: SchemaTypeDefinition[] = [
  // documents
  page,
  article,
  report,
  testimonialsSection,
  siteSettings,

  // page-builder sections
  heroSection,
  servicesSection,
  growthSpurtsSection,
  unrivaledGrowthSection,
  caseStudySection,
  articleCardsSection,
  testimonialsBlock,
  growthValidationSection,
  teamSection,

  // objects
  heroBanner,
  serviceItem,
  growthCard,
  growthStat,
  linkCta,
  caseStudySlide,
  articleTeaser,
  teamMember,
  teamBatch,
  teamHighlight,
  reportHighlight,
  reportSlide,
  testimonial,
  clientLogo,
  postBody,
  postImage,
  postQuote,
  navLink,
  navChild,
  footerLink,
  socialLink,
  subjectOption,
  seo,
];
