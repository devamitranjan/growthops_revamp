import { defineArrayMember } from "sanity";

import { articleCardsSection } from "./article-cards-section";
import { caseStudySection } from "./case-study-section";
import { contactFormSection } from "./contact-form-section";
import { creativeTechSection } from "./creative-tech-section";
import { downloadReportSection } from "./download-report-section";
import { faqSection } from "./faq-section";
import { growthSpurtsSection } from "./growth-spurts-section";
import { growthValidationSection } from "./growth-validation-section";
import { heroSection } from "./hero-section";
import { newsroomListingSection } from "./newsroom-listing-section";
import { postListingSection } from "./post-listing-section";
import { reportOverviewSection } from "./report-overview-section";
import { servicesSection } from "./services-section";
import { teamSection } from "./team-section";
import { testimonialsBlock } from "./testimonials-block";
import { unrivaledGrowthSection } from "./unrivaled-growth-section";

/**
 * The section library — every block an editor can drop into a page.
 *
 * This list is the single registration point. `schema-types/index.ts` spreads
 * it into the Studio schema, and `objects/page-sections.ts` turns it into the
 * members of the `sections` array, so adding a file here makes the section
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
  teamSection,
  creativeTechSection,
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
