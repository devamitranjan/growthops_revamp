/** Wrap these in `defineQuery` from `next-sanity` once the package is installed
 *  — that is what lets Sanity TypeGen derive result types from the GROQ. */

export const HOME_PAGE_QUERY = `*[_type == "homePage"][0]{
  hero{ title, subtitle, description, videoSrc, posterSrc, animateSpin },
  services[]{ href, imgSrc, alt, overlayColor },
  growthSpurts[]{ "id": _key, imageSrc, videoSrc, alt, label, description },
  unrivaledGrowth{
    title,
    stats[]{ "id": _key, stat, description },
    cta{ label, href }
  },
  caseStudies[]{ "id": _key, label, bg, previewVideo, video },
  articles[]{ href, imgSrc, alt, tag, title, date },
  team{
    title,
    batches[]{ members[]{ name, title, from, to, image } },
    highlight{ value, description, cta{ label, href, target } }
  }
}`;
