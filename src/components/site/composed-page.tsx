import clsx from "clsx";

import Header from "@/components/site/header";
import {
  SectionRenderer,
  type SectionContext,
} from "@/components/site/section-renderer";
import SiteFooter from "@/components/site/site-footer";
import { JsonLdRenderer } from "@/components/site/json-ld-renderer";
import type { PageSection } from "@/content/types";
import type { SeoMetadata } from "@/content/models/seo";

/**
 * The shell every CMS-composed page shares: header, the sections the editor
 * put on the page, footer.
 *
 * Every route that serves composed content renders through here — `/` for the
 * home page, `/[slug]` for everything an editor creates, `/post` for the
 * article listing and `/reports/[slug]` for a report — so no two of them can
 * drift into rendering the same section differently.
 */
export function ComposedPage({
  sections,
  context,
  className,
  seo,
}: {
  sections: PageSection[];
  /** Passed to every section; only the article listing reads it. */
  context?: SectionContext;
  className?: string;
  seo?: SeoMetadata;
}) {
  return (
    <div className={clsx("body-wrapper hs-site-page page", className)}>
      <JsonLdRenderer schemas={seo?.jsonld} />
      <Header />
      {sections.map((section) => (
        <SectionRenderer key={section.key} section={section} context={context} />
      ))}
      <SiteFooter />
    </div>
  );
}
