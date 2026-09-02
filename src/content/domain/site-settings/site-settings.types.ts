import type { ContentLink } from "@/content/models/link";

export interface NavChild {
  label: string;
  href: string;
}

export interface NavLinkData {
  label: string;
  href: string | null;
  children?: NavChild[];
}

/** Footer and legal links are plain authored links, so they are the shared
 *  model rather than a shape of their own. */
export type FooterLink = ContentLink;

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

/**
 * Site chrome plus the copy that belongs to a route rather than to a document.
 *
 * Flat rather than grouped, deliberately. Sanity groups these fields into
 * Studio tabs — Branding, Footer, SEO, Contact form — and that grouping is an
 * *editing* concern: it decides what an editor sees on one screen, not what
 * the footer needs to render. Keeping the grouping out of here is what lets
 * the Studio regroup the form without touching a component, and what lets a
 * CMS with no field-group concept implement the same contract.
 */
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

  reportFormTitle: string;
  reportFormSubmitLabel: string;
  reportFormSuccessMessage: string;
  reportFormPrivacyHref: string;
  reportFormMarketingLabel: string;
  reportFormConsentText: string;
  reportFormConsentLinkLabel: string;
  reportFormFieldLabels: LabelledValue[];
  reportFormValidationMessages: LabelledValue[];

  seoAuditFormTitle: string;
  seoAuditFormSubmitLabel: string;
  seoAuditFormSuccessMessage: string;
  seoAuditFormPrivacyHref: string;
  seoAuditFieldPlaceholders: LabelledValue[];
  seoAuditFieldLabels: LabelledValue[];
  seoAuditEmailConsentLabel: string;
  seoAuditTermsLabel: string;
  seoAuditConsentText: string;
  seoAuditValidationMessages: LabelledValue[];
}
