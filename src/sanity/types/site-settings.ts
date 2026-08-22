export interface NavChild {
  label: string;
  href: string;
}

export interface NavLinkData {
  label: string;
  href: string | null;
  children?: NavChild[];
}

export interface FooterLink {
  label: string;
  href: string;
  target?: string;
  rel?: string;
}

export type SocialPlatform = "linkedin" | "facebook" | "instagram" | "youtube";

export interface SocialLink {
  platform: SocialPlatform;
  href: string;
  label: string;
}

export interface LabelledValue {
  value: string;
  label: string;
}

/** Site chrome plus the copy that belongs to a route rather than a document. */
export interface SiteSettings {
  logo: string;
  logoAlt: string;
  navLinks: NavLinkData[];

  footerHeadline: string;
  footerHeadlineAccent: string;
  footerCta?: { label: string; href: string };
  exploreTitle: string;
  exploreLinks: FooterLink[];
  socials: SocialLink[];
  newsletterTitle: string;
  newsletterLabel: string;
  newsletterPlaceholder: string;
  newsletterSubmitLabel: string;
  newsletterRequiredMessage: string;
  newsletterInvalidMessage: string;
  copyright: string;
  legalLinks: FooterLink[];

  siteName: string;
  siteUrl: string;
  defaultTitle: string;
  titleTemplate: string;
  defaultDescription: string;
  ogImage?: string;
  ogImageWidth?: number;
  ogImageHeight?: number;
  ogImageAlt?: string;
  googleSiteVerification?: string;

  contactTitle: string;
  contactMetaTitle: string;
  contactMetaDescription: string;
  contactFieldPlaceholders: LabelledValue[];
  contactSubjectLabel: string;
  contactSubjectPlaceholder: string;
  contactSubjectOptions: LabelledValue[];
  contactConsentText: string;
  contactConsentLinkLabel: string;
  contactConsentLinkHref: string;
  contactSubmitLabel: string;
  contactSuccessMessage: string;
  contactMessagePlaceholder: string;
  contactMarketingLabel: string;
  contactTermsLabel: string;
  contactValidationMessages: LabelledValue[];

  postListingTitle: string;
  postListingHeading: string;
  postListingDescription: string;

  reportFormTitle: string;
  reportFormSubmitLabel: string;
  reportFormSuccessMessage: string;
  reportFormPrivacyHref: string;
  reportFormMarketingLabel: string;
  reportFormConsentText: string;
  reportFormConsentLinkLabel: string;
  reportFormFieldLabels: LabelledValue[];
  reportFormValidationMessages: LabelledValue[];
}
