export const REPORTS_QUERY = `*[_type == "report"]{
  "slug": slug.current,
  heroBannerData{ title, subtitle, description, videoSrc, posterSrc, animateSpin },
  reportHighlights[]{ "id": _key, title },
  reportSlides[]{ "id": _key, "src": image.asset->url, alt }
}`;

export const REPORT_QUERY = `*[_type == "report" && slug.current == $slug][0]{
  "slug": slug.current,
  heroBannerData{ title, subtitle, description, videoSrc, posterSrc, animateSpin },
  reportHighlights[]{ "id": _key, title },
  reportSlides[]{ "id": _key, "src": image.asset->url, alt }
}`;

export const REPORT_SLUGS_QUERY = `*[_type == "report" && defined(slug.current)].slug.current`;
