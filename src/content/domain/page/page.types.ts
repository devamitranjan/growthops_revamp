import type { SeoMetadata } from "@/content/models/seo";
import type { PageSection } from "@/content/sections/section.types";

/** Everything a composed page is: where it is served, what it is called, and
 *  the sections an editor put on it. */
export interface PageData {
  /** The full URL path this page is served at — `about`, `services/seo`.
   *  Composed from the page's ancestors, so it is not a field on the
   *  document. */
  path: string;
  /** This page's own segment, the last one in `path`. */
  slug: string;
  title: string;
  seo?: SeoMetadata;
  sections: PageSection[];
}
