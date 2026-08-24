import { defineQuery } from "next-sanity";

import { SECTIONS_PROJECTION } from "./sections";

/**
 * A report is a composed page like any other — the hero, the overview and the
 * download form are sections — so it reads back through the same projections.
 */
const REPORT_FIELDS = `
  "slug": slug.current,
  title,
  seo{
    title,
    description,
    "ogImage": ogImage.asset->url
  },
  sections[]{${SECTIONS_PROJECTION}}
`;

export const REPORTS_QUERY = defineQuery(`*[_type == "report"]{${REPORT_FIELDS}}`);

export const REPORT_QUERY = defineQuery(
  `*[_type == "report" && slug.current == $slug][0]{${REPORT_FIELDS}}`,
);

export const REPORT_SLUGS_QUERY = defineQuery(
  `*[_type == "report" && defined(slug.current)].slug.current`,
);
