/**
 * The content shapes more than one section is built from.
 *
 * CMS-agnostic by construction, and the constraint that keeps them that way is
 * worth stating: an image is a URL string and nothing else, an identifier is
 * `id`, and rich text is `RichText`. Every one of those is something a CMS
 * hands back in its own shape — `{ asset: { _ref } }`, `_key`, Portable Text —
 * and every one is resolved in the adapter before it reaches here. Nothing in
 * this folder may import from `src/cms`.
 */

import type { RichText } from "@/content/models/rich-text";
import type { LogoData } from "@/content/domain/testimonial/testimonial.types";

export interface IHeroBannerData {
  tag?: string;
  title: string;
  subtitle: string;
  description: string;
  videoSrc?: string;
  /** MIME type of the uploaded video, so `<source>` can declare it. Absent for
   *  legacy /public paths, where the response's Content-Type is enough. */
  videoType?: string;
  posterSrc: string;
  animateSpin?: boolean;
}

export interface ServiceItem {
  href: string;
  imgSrc: string;
  alt: string;
  overlayColor: string;
}

export interface GrowthCardData {
  id: string;
  imageSrc: string;
  videoSrc: string;
  alt: string;
  label: string;
  description: string;
}

export interface CaseStudySlideData {
  id: string;
  label: string;
  bg: string;
  previewVideo?: string;
  video?: string;
}

export interface WorkCaseStudyItem {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  category: string;
  href?: string;
}

/** The article teasers on the home page — a lighter shape than the full
 *  `PostData` the /post listing uses. */
export interface ArticleData {
  href: string;
  imgSrc: string;
  alt: string;
  tag: string;
  title: string;
  date: string;
}

export interface GrowthStat {
  id: string;
  /** Rendered large, e.g. "817%". */
  stat: string;
  description: string;
}

export interface GrowthCta {
  label: string;
  href: string;
}

export interface IUnrivaledGrowthData {
  /** Layered gradient + solid heading that docks to the left on scroll. */
  title: string;
  stats: GrowthStat[];
  /** Rises into place once the last stat has settled. Omit to hide it. */
  cta?: GrowthCta;
}

export interface TeamMember {
  name: string;
  title: string;
  from: string;
  to: string;
  image: string;
}

export interface TeamHighlightCta {
  label: string;
  href: string;
  /** Anchor target. Defaults to "_self". */
  target?: string;
}

/** The last card in the grid, which does not rotate. */
export interface TeamHighlight {
  /** Rendered large in gradient text, e.g. "+250". */
  value: string;
  description: string;
  cta?: TeamHighlightCta;
}

export interface ITeamSectionData {
  title: string;
  /**
   * One batch per rotation step. Every batch needs the same number of members,
   * since each member column cycles through the batches in lockstep.
   */
  batches: TeamMember[][];
  /** Trailing highlight card. Omit to end the grid after the members. */
  highlight?: TeamHighlight;
}

/**
 * How a culture card presents its artwork.
 *
 * `badge` is the award lockup: the image fills a white circle, because the
 * badges are printed for light backgrounds. `icon` is the flat pictogram
 * paired with a caption, which needs the dark card showing through and so
 * must not get the circle. Absent means `badge` — the cards published before
 * the second style existed are all awards.
 */
export type CultureCardVariant = "badge" | "icon";

export interface CultureCardData {
  id: string;
  image: string;
  /** Required on a `badge`, where the artwork is the only text there is. An
   *  `icon` card leaves it empty — its label already reads the same. */
  alt?: string;
  /** Defaults to `badge` when the CMS leaves it empty. */
  variant?: CultureCardVariant;
  /** The caption under an `icon` card. Ignored by the `badge` style, which
   *  carries its name inside the artwork. */
  label?: string;
  /** Optional — makes the card a link. */
  href?: string;
}

export interface ICultureValidationData {
  title: string;
  cards: CultureCardData[];
}

/** One belt of logos in the creative-technologies card. */
export interface TechMarqueeRowData {
  id: string;
  logos: LogoData[];
  /** Resting speed in px/s. Defaults to 45 when the CMS leaves it empty. */
  speed?: number;
  /** Which way the row drifts while the page is still. Defaults to "left". */
  direction?: "left" | "right";
}

export interface ICreativeTechData {
  title: string;
  /** Stacked belts, each running at its own speed. */
  rows: TechMarqueeRowData[];
}

/** One grid slot: two logos sharing the same position, cross-fading between
 *  each other. `secondary` is absent only for a trailing odd logo out. */
export interface LogoPairData {
  id: string;
  primary: Omit<LogoData, "id">;
  secondary?: Omit<LogoData, "id">;
}

export interface IGoodCompanyData {
  eyebrow?: string;
  title: string;
  description: string;
  /** Each slot holds a pair of logos that cross-fade in place; slots are
   *  staggered by position so the grid never all fades in sync. */
  logos: LogoPairData[];
}

/** One row of the FAQ accordion. */
export interface FaqItemData {
  id: string;
  question: string;
  /** Rich text so an editor can split an answer into paragraphs and cite a
   *  source inline. */
  answer: RichText;
}

export interface IFaqData {
  title: string;
  eyebrow?: string;
  items: FaqItemData[];
  /** Expand the first answer on load, so the panel does not open empty. */
  openFirst?: boolean;
}

export interface GrowthValidationAward {
  href?: string;
  image: string;
  alt?: string;
}

export interface GrowthValidationData {
  title: string;
  sectionLink?: string;
  eyebrow?: string;
  headline: string;
  awards: GrowthValidationAward[];
  image: string;
  imageAlt: string;
}

export interface ContentRailCardData {
  id: string;
  title: string;
  description: string;
  image?: string;
  alt?: string;
  href?: string;
}

export interface IContentRailData {
  title: string;
  description?: string;
  cards: ContentRailCardData[];
}

/** A block of long-form copy on a white panel. The one section whose body is
 *  `RichText`, and the same shape `/post/[slug]` hands its own body to. */
export interface IRichTextData {
  /** Optional heading above the copy. An article's body carries none — its
   *  title belongs to the page header. */
  title?: string;
  content: RichText;
}
