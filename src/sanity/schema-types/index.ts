import type { SchemaTypeDefinition } from "sanity";

import { article } from "./documents/article";
import { newsroomArticle } from "./documents/newsroom-article";
import { page } from "./documents/page";
import { report } from "./documents/report";
import { siteSettings } from "./documents/site-settings";
import { testimonialsSection } from "./documents/testimonials-section";
import { articleTeaser } from "./objects/article-teaser";
import { caseStudySlide } from "./objects/case-study-slide";
import { clientLogo } from "./objects/client-logo";
import { faqItem } from "./objects/faq-item";
import { footerLink } from "./objects/footer-link";
import { growthCard } from "./objects/growth-card";
import { growthStat } from "./objects/growth-stat";
import { growthVideo } from "./objects/growth-video";
import { heroBanner } from "./objects/hero-banner";
import { linkCta } from "./objects/link-cta";
import { navChild, navLink } from "./objects/nav-link";
import { pageSections } from "./objects/page-sections";
import { postBody } from "./objects/post-body";
import { postImage } from "./objects/post-image";
import { postQuote } from "./objects/post-quote";
import { postTable } from "./objects/post-table";
import { reportHighlight } from "./objects/report-highlight";
import { reportSlide } from "./objects/report-slide";
import { seo } from "./objects/seo";
import { serviceItem } from "./objects/service-item";
import { socialLink } from "./objects/social-link";
import { subjectOption } from "./objects/subject-option";
import { techMarqueeRow } from "./objects/tech-marquee-row";
import { teamBatch } from "./objects/team-batch";
import { teamHighlight } from "./objects/team-highlight";
import { teamMember } from "./objects/team-member";
import { testimonial } from "./objects/testimonial";
import { sectionTypes } from "./sections";

/**
 * Only types listed here are part of the Studio schema and reach schema
 * extraction. Adding a file is not enough.
 *
 * The page-builder sections are the exception: they come in as one spread from
 * `sections/index.ts`, which is also what fills the `sections` array. Register
 * a new section there and it is both in the schema and offered on every page.
 */
export const schemaTypes: SchemaTypeDefinition[] = [
  // documents
  page,
  article,
  report,
  newsroomArticle,
  testimonialsSection,
  siteSettings,

  // page-builder sections
  ...sectionTypes,

  // objects
  pageSections,
  heroBanner,
  serviceItem,
  growthCard,
  growthStat,
  growthVideo,
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
  faqItem,
  techMarqueeRow,
  postBody,
  postImage,
  postQuote,
  postTable,
  navLink,
  navChild,
  footerLink,
  socialLink,
  subjectOption,
  seo,
];
