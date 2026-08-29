import type { ReportPageData } from "./report.types";

/** Gated report landing pages. No GROQ, no client, no import from `src/cms`. */
export interface ReportRepository {
  getAll(): Promise<ReportPageData[]>;

  getBySlug(slug: string): Promise<ReportPageData | null>;

  /** Feeds `generateStaticParams` for /reports/[slug]; must be read uncached,
   *  for the reason spelled out on `ArticleRepository.getSlugs`. */
  getSlugs(): Promise<string[]>;
}

export type { ReportPageData };
