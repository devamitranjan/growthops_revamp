import { defineArrayMember } from "sanity";

import { articleCardsSection } from "./schemas/article-cards-section";
import { caseStudySection } from "./schemas/case-study-section";
import { contactFormSection } from "./schemas/contact-form-section";
import { contentRailSection } from "./schemas/content-rail-section";
import { creativeTechSection } from "./schemas/creative-tech-section";
import { cultureValidationSection } from "./schemas/culture-validation-section";
import { downloadReportSection } from "./schemas/download-report-section";
import { faqSection } from "./schemas/faq-section";
import { growthSpurtsSection } from "./schemas/growth-spurts-section";
import { growthValidationSection } from "./schemas/growth-validation-section";
import { heroSection } from "./schemas/hero-section";
import { newsroomListingSection } from "./schemas/newsroom-listing-section";
import { postListingSection } from "./schemas/post-listing-section";
import { reportOverviewSection } from "./schemas/report-overview-section";
import { richTextSection } from "./schemas/rich-text-section";
import { servicesSection } from "./schemas/services-section";
import { teamSection } from "./schemas/team-section";
import { testimonialsBlock } from "./schemas/testimonials-block";
import { unrivaledGrowthSection } from "./schemas/unrivaled-growth-section";

/**
 * The section library — every block an editor can drop into a page.
 *
 * This list is the single registration point. The root `schema.ts` spreads it
 * into the Studio schema, and `section/objects/page-sections.ts` turns it into
 * the members of the `sections` array, so adding a file here makes the section
 * available on *every* page at once: the home page and anything an editor
 * creates. Nothing else has to be touched on the Studio side.
 *
 * Order is the order of the Studio's "Add item" menu.
 *
 * Each section is an inline object, not a reference, so a page holds its own
 * copy of the content — two pages can both use the FAQ section and fill it
 * with completely different questions. The one exception is
 * `testimonialsBlock`, which points at a shared document on purpose.
 */
export const sectionTypes = [
  heroSection,
  servicesSection,
  growthSpurtsSection,
  unrivaledGrowthSection,
  caseStudySection,
  articleCardsSection,
  testimonialsBlock,
  growthValidationSection,
  cultureValidationSection,
  teamSection,
  creativeTechSection,
  contentRailSection,
  richTextSection,
  faqSection,

  // Sections that carry a route's own content. Nothing stops an editor putting
  // one on another page — the contact form on an about page is a reasonable
  // thing to want — but each is the reason its route exists.
  contactFormSection,
  postListingSection,
  newsroomListingSection,
  reportOverviewSection,
  downloadReportSection,
];

/** The same list as array members, for any field that holds sections. */
export const sectionArrayMembers = sectionTypes.map((section) =>
  defineArrayMember({ type: section.name }),
);
