import { defineQuery } from "next-sanity";

/** Site chrome and route-level copy. One document, read by every page. */
export const SITE_SETTINGS_QUERY = defineQuery(`*[_id == "siteSettings"][0]{
  "logo": logo.asset->url,
  logoAlt,
  navLinks[]{ label, href, children[]{ label, href } },

  footerHeadline,
  footerHeadlineAccent,
  footerCta{ label, href },
  exploreTitle,
  exploreLinks[]{ label, href, target, rel },
  socials[]{ platform, href, label },
  newsletterTitle,
  newsletterLabel,
  newsletterPlaceholder,
  newsletterSubmitLabel,
  newsletterRequiredMessage,
  newsletterInvalidMessage,
  copyright,
  legalLinks[]{ label, href, target, rel },

  siteName,
  siteUrl,
  defaultTitle,
  titleTemplate,
  defaultDescription,
  "ogImage": ogImage.asset->url,
  "ogImageWidth": ogImage.asset->metadata.dimensions.width,
  "ogImageHeight": ogImage.asset->metadata.dimensions.height,
  ogImageAlt,
  googleSiteVerification,

  contactFieldPlaceholders[]{ value, label },
  contactSubjectLabel,
  contactSubjectPlaceholder,
  contactSubjectOptions[]{ value, label },
  contactConsentText,
  contactConsentLinkLabel,
  contactConsentLinkHref,
  contactSubmitLabel,
  contactSuccessMessage,
  contactMessagePlaceholder,
  contactMarketingLabel,
  contactTermsLabel,
  contactValidationMessages[]{ value, label },


  reportFormTitle,
  reportFormSubmitLabel,
  reportFormSuccessMessage,
  reportFormPrivacyHref,
  reportFormMarketingLabel,
  reportFormConsentText,
  reportFormConsentLinkLabel,
  reportFormFieldLabels[]{ value, label },
  reportFormValidationMessages[]{ value, label }
}`);
