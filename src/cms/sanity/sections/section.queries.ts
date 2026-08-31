import { RICH_TEXT_PROJECTION } from "../rich-text/rich-text.queries";

/**
 * The page builder's GROQ, one conditional projection per section type.
 *
 * This is the query-side twin of `section/section.schema.ts`: the schema
 * decides what an editor can add, this decides what the site reads back. A new
 * section needs an entry here, a branch in
 * `src/components/site/section-renderer.tsx`, and a member on `PageSection` in
 * `page/page.types.ts` — the three places a section has to exist.
 *
 * Images resolve to plain URL strings via `.asset->url`, so section components
 * take the same string props they took when the content came from fixtures.
 * `coalesce(...)` falls back to the original /public path wherever no asset
 * has been uploaded yet. Video stays a /public path throughout — never a
 * Sanity asset.
 *
 * A section with no entry still comes back with `_key` and `_type`, and the
 * renderer skips it, so a Studio that is ahead of the deploy costs an empty
 * slot rather than a broken page.
 *
 * `newsroomListingSection` is the one section that follows references: its
 * `articles` list is the page's own ordering of `newsroomArticle` documents.
 * `defined(@->publishedAt)` drops entries whose target was deleted or
 * unpublished — a dangling reference dereferences to `null`, and a `null` card
 * would crash the map over them — and `coalesce(..., [])` keeps an empty list
 * an empty grid rather than a `null` the renderer would have to guard.
 */
export const SECTIONS_PROJECTION = `
  _key,
  _type,

  _type == "heroSection" => {
    hero{
      tag, title, subtitle, description, videoSrc, animateSpin,
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

  _type == "cultureValidationSection" => {
    title,
    cards[]{ "id": _key, href, "image": image.asset->url, alt }
  },

  _type == "teamSection" => {
    title,
    batches[]{ members[]{ name, title, from, to, "image": image.asset->url } },
    highlight{ value, description, cta{ label, href, target } }
  },

  _type == "creativeTechSection" => {
    title,
    rows[]{
      "id": _key,
      speed,
      direction,
      logos[]{ "id": _key, "src": logo.asset->url, alt }
    }
  },

  _type == "contentRailSection" => {
    title,
    description,
    "cards": coalesce(
      cards[]{
        "id": _key,
        title,
        description,
        href,
        "image": image.asset->url,
        alt
      },
      []
    )
  },

  _type == "richTextSection" => {
    title,
    content[]{${RICH_TEXT_PROJECTION}}
  },

  _type == "faqSection" => {
    title,
    eyebrow,
    openFirst,
    items[]{ "id": _key, question, answer }
  },

  _type == "contactFormSection" => {
    title
  },

  _type == "postListingSection" => {
    heading,
    postsPerPage
  },

  _type == "newsroomListingSection" => {
    heading,
    readMoreLabel,
    "articles": coalesce(
      articles[defined(@->publishedAt)]->{
        "id": _id, title, href, publishedAt, excerpt,
        "imgSrc": image.asset->url, alt
      },
      []
    )
  },

  _type == "reportOverviewSection" => {
    "highlights": coalesce(highlights[]{ "id": _key, title }, []),
    "slides": coalesce(slides[]{ "id": _key, "src": image.asset->url, alt }, [])
  },

  _type == "downloadReportSection" => {
    title
  }
`;
