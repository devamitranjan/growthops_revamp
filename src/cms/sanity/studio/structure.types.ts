export interface SectionRow {
  _key: string;
  _type: string;
  title?: string;
  heading?: string;
  bannerTitle?: string;
  /** Only on `postListingSection` — the page size its pane splits by. */
  postsPerPage?: number;
}

export interface SectionUsageRow {
  _id: string;
  _type: string;
  title?: string;
  uses: number;
}
