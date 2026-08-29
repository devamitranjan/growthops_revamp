import { sanityArticleRepository } from "@/cms/sanity/documents/article/article.repository";
import { sanityPageRepository } from "@/cms/sanity/documents/page/page.repository";
import { sanityReportRepository } from "@/cms/sanity/documents/report/report.repository";
import { sanitySiteSettingsRepository } from "@/cms/sanity/documents/site-settings/site-settings.repository";
import { sanityTestimonialRepository } from "@/cms/sanity/documents/testimonial/testimonial.repository";
import type { ArticleRepository } from "./domain/article/article.repository";
import type { PageRepository } from "./domain/page/page.repository";
import type { ReportRepository } from "./domain/report/report.repository";
import type { SiteSettingsRepository } from "./domain/site-settings/site-settings.repository";
import type { TestimonialRepository } from "./domain/testimonial/testimonial.repository";

/**
 * The composition point: the one file that says which CMS this site runs on.
 *
 * Every arrow in the architecture points *into* the domain except the ones
 * below. `content/domain/**` declares contracts and imports nothing from
 * `src/cms`; `cms/sanity/**` implements them; this module is where the two are
 * tied together, and it is deliberately the only place an implementation is
 * named. Swapping CMS is editing these five lines and writing the adapter
 * behind them — the routes and components below import the instances, never a
 * `Sanity*` symbol.
 *
 * It is a module of constants rather than a container, because five singletons
 * with no configuration and no lifecycle do not need one. Resist growing it
 * into one.
 *
 * **SERVER ONLY** — these instances reach the Sanity client, which carries
 * `SANITY_API_READ_TOKEN`. The guard is not in this file: every adapter
 * repository imported above starts with `import "server-only"`, so a
 * `"use client"` module that reaches this one already fails the build through
 * them, and a second import here would be redundant. That is verified rather
 * than assumed — strip those five first lines and the build error is the only
 * thing that disappears. **An adapter for another CMS must keep that first
 * line**, or this seam stops being protected. Client components take content
 * as props from a Server Component.
 */

export const articleRepository: ArticleRepository = sanityArticleRepository;

export const pageRepository: PageRepository = sanityPageRepository;

export const reportRepository: ReportRepository = sanityReportRepository;

export const testimonialRepository: TestimonialRepository =
  sanityTestimonialRepository;

export const siteSettingsRepository: SiteSettingsRepository =
  sanitySiteSettingsRepository;
