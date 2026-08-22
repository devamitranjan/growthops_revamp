import { defineQuery } from "next-sanity";

const REPORT_FIELDS = `
  "slug": slug.current,
  heroBannerData{
    title, subtitle, description, videoSrc, animateSpin,
    "posterSrc": coalesce(poster.asset->url, posterSrc)
  },
  reportHighlights[]{ "id": _key, title },
  reportSlides[]{ "id": _key, "src": image.asset->url, alt }
`;

export const REPORTS_QUERY = defineQuery(`*[_type == "report"]{${REPORT_FIELDS}}`);

export const REPORT_QUERY = defineQuery(
  `*[_type == "report" && slug.current == $slug][0]{${REPORT_FIELDS}}`,
);

export const REPORT_SLUGS_QUERY = defineQuery(
  `*[_type == "report" && defined(slug.current)].slug.current`,
);
