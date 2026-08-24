import clsx from "clsx";

import Header from "@/components/site/header";
import {
  SectionRenderer,
  type SectionContext,
} from "@/components/site/section-renderer";
import SiteFooter from "@/components/site/site-footer";
import type { PageSection } from "@/sanity/types";

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
}: {
  sections: PageSection[];
  /** Passed to every section; only the article listing reads it. */
  context?: SectionContext;
  className?: string;
}) {
  return (
    <div className={clsx("body-wrapper hs-site-page page", className)}>
      <Header />
      {sections.map((section) => (
        <SectionRenderer key={section._key} section={section} context={context} />
      ))}
      <SiteFooter />
    </div>
  );
}
