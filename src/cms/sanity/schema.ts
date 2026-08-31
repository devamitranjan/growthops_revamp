import type { SchemaPluginOptions, SchemaTypeDefinition } from "sanity";

import { article } from "./documents/article/article.schema";
import { postBody } from "./documents/article/objects/post-body";
import { postImage } from "./documents/article/objects/post-image";
import { postQuote } from "./documents/article/objects/post-quote";
import { postTable } from "./documents/article/objects/post-table";
import { newsroomArticle } from "./documents/newsroom/newsroom.schema";
import { page } from "./documents/page/page.schema";
import { report } from "./documents/report/report.schema";
import { linkCta } from "./objects/link-cta";
import { seo } from "./objects/seo";
import { articleTeaser } from "./sections/objects/article-teaser";
import { caseStudySlide } from "./sections/objects/case-study-slide";
import { contentRailCard } from "./sections/objects/content-rail-card";
import { cultureCard } from "./sections/objects/culture-card";
import { faqItem } from "./sections/objects/faq-item";
import { growthCard } from "./sections/objects/growth-card";
import { growthStat } from "./sections/objects/growth-stat";
import { heroBanner } from "./sections/objects/hero-banner";
import { pageSections } from "./sections/objects/page-sections";
import { reportHighlight } from "./sections/objects/report-highlight";
import { reportSlide } from "./sections/objects/report-slide";
import { serviceItem } from "./sections/objects/service-item";
import { teamBatch } from "./sections/objects/team-batch";
import { teamHighlight } from "./sections/objects/team-highlight";
import { teamMember } from "./sections/objects/team-member";
import { techMarqueeRow } from "./sections/objects/tech-marquee-row";
import { sectionTypes } from "./sections/section.schema";
import { footerLink } from "./documents/site-settings/objects/footer-link";
import { navChild, navLink } from "./documents/site-settings/objects/nav-link";
import { socialLink } from "./documents/site-settings/objects/social-link";
import { subjectOption } from "./documents/site-settings/objects/subject-option";
import { siteSettings } from "./documents/site-settings/site-settings.schema";
import { clientLogo } from "./documents/testimonial/objects/client-logo";
import { testimonial } from "./documents/testimonial/objects/testimonial";
import { testimonialsSection } from "./documents/testimonial/testimonial.schema";

/**
 * The Studio schema, as `sanity.config.ts` consumes it — and the one
 * registration list behind it.
 *
 * **Only types listed here are part of the Studio schema and reach schema
 * extraction. Adding a file is not enough.** A type missing from this list is
 * missing from the Studio with no error at all: the field that references it
 * simply renders as nothing.
 *
 * Each schema lives in its feature folder next to that feature's types, GROQ
 * and repository. The tree can afford that because **schema files reference
 * each other by type name, not by import** — `defineField({ type: "seo" })`,
 * never `import { seo }`. This file and `section/section.schema.ts` are the
 * only two that carry an import graph, which is why the list below is the
 * thing you edit.
 *
 * The page-builder sections are the exception: they come in as one spread from
 * `section/section.schema.ts`, which is also what fills the `sections` array.
 * Register a new section there and it is both in the schema and offered on
 * every page — that single registration point is why adding a section is one
 * Studio-side edit, and nothing should weaken it.
 *
 * (`schema/objects/` is the home of the two objects no single feature owns —
 * `seo` and `linkCta`. It is a folder beside this file, not a folder this file
 * lives in; `./schema` always resolves here.)
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
  cultureCard,
  contentRailCard,
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

export const schema: SchemaPluginOptions = { types: schemaTypes };
