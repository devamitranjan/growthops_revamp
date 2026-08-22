import { defineQuery } from "next-sanity";

/**
 * One composed page and every section in it.
 *
 * Images resolve to plain URL strings via `.asset->url`, so the section
 * components keep the exact same string-based props they had when the content
 * came from fixtures. `coalesce(...)` falls back to the original /public path
 * wherever no asset has been uploaded yet.
 *
 * Video stays a /public path throughout — never a Sanity asset.
 */
export const PAGE_QUERY = defineQuery(`*[_type == "page" && slug.current == $slug][0]{
  "slug": slug.current,
  title,
  sections[]{
    _key,
    _type,

    _type == "heroSection" => {
      hero{
        title, subtitle, description, videoSrc, animateSpin,
        "posterSrc": coalesce(poster.asset->url, posterSrc)
      }
    },

    _type == "servicesSection" => {
      services[]{ href, "imgSrc": image.asset->url, alt, overlayColor }
    },

    _type == "growthSpurtsSection" => {
      cards[]{ "id": _key, "imageSrc": image.asset->url, videoSrc, alt, label, description }
    },

    _type == "unrivaledGrowthSection" => {
      title,
      stats[]{ "id": _key, stat, description },
      cta{ label, href }
    },

    _type == "caseStudySection" => {
      slides[]{ "id": _key, label, "bg": bg.asset->url, previewVideo, video }
    },

    _type == "articleCardsSection" => {
      title,
      sectionLink,
      articles[]{ href, "imgSrc": image.asset->url, alt, tag, title, date }
    },

    _type == "testimonialsBlock" => {
      "data": source->{
        title,
        categories,
        testimonials[]{
          "id": _key, category, audioSrc,
          "imgSrc": image.asset->url, alt, quote, position
        },
        logos[]{ "id": _key, "src": logo.asset->url, alt }
      }
    },

    _type == "growthValidationSection" => {
      title,
      sectionLink,
      eyebrow,
      headline,
      awards[]{ href, "image": image.asset->url, alt },
      "image": image.asset->url,
      imageAlt
    },

    _type == "teamSection" => {
      title,
      batches[]{ members[]{ name, title, from, to, "image": image.asset->url } },
      highlight{ value, description, cta{ label, href, target } }
    }
  }
}`);
