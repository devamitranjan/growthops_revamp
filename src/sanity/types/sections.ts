/** Shapes shared by more than one page composition.
 *
 *  These describe what the CMS hands back. Images arrive as plain URL strings
 *  because the GROQ resolves `.asset->url` for us — components never see a
 *  Sanity image object. */

export interface IHeroBannerData {
  title: string;
  subtitle: string;
  description: string;
  videoSrc?: string;
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
