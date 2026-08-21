export interface SubNavLinkData {
  label: string;
  href: string;
}

export interface NavLinkData {
  label: string;
  href: string | null;
  children?: SubNavLinkData[];
}
