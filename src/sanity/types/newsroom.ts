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

export interface NewsroomPageData {
  heading: string;
  readMoreLabel: string;
  seoTitle?: string;
  seoDescription?: string;
  articles: NewsroomArticle[];
}
