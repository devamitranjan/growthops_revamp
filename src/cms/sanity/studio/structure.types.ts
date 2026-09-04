export interface SectionRow {
  _key: string;
  _type: string;
  title?: string;
  heading?: string;
  heroTitle?: string;
  /** Only on `postListingSection` — the page size its pane splits by. */
  postsPerPage?: number;
  /** Only on `workCaseStudiesSection` — items per page in the preview pane. */
  itemsPerPage?: number;
  /** Only on `workCaseStudiesSection` — the inline case-study items. */
  items?: Array<{
    _key?: string;
    _ref?: string;
    _type?: string;
    id?: string;
    title?: string;
    description?: string;
    category?: string;
    image?: string;
    alt?: string;
    href?: string;
  }>;
}

export interface SectionUsageRow {
  _id: string;
  _type: string;
  title?: string;
  uses: number;
}
