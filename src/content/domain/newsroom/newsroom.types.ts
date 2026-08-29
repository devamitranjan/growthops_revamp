/**
 * One card on /newsroom. Always links out — the piece is published by another
 * outlet, so there is no slug and no in-site detail page.
 */
export interface NewsroomArticle {
  id: string;
  title: string;
  href: string;
  /** Date-only ISO string, e.g. "2025-07-14". The card formats it for display. */
  publishedAt: string;
  excerpt: string;
  imgSrc: string;
  alt: string;
}

/** What the `newsroomListingSection` renders: the page's own ordering of the
 *  article documents, plus the two strings that head them. */
export interface NewsroomListingData {
  heading: string;
  readMoreLabel: string;
  articles: NewsroomArticle[];
}
