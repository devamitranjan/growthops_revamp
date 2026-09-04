import type {
  FooterLink,
  LabelledValue,
  NavChild,
  NavLinkData,
  SiteSettings,
  SocialLink,
  SocialPlatform,
} from "@/content/domain/site-settings/site-settings.types";

/**
 * `SITE_SETTINGS_QUERY` -> `SiteSettings`.
 *
 * The longest mapper in the adapter and the one most worth having. Every
 * string here is optional in Sanity — a settings document predating a field
 * answers `null` for it — while the components downstream render these
 * straight into the DOM. Before this file that gap was closed by
 * `as unknown as SiteSettings`, which is to say it was not closed: a `null`
 * newsletter label reached the footer and rendered as nothing, with the types
 * saying it could not happen.
 *
 * So the mapping is deliberately dull. Absent copy becomes `""` (renders as
 * nothing, same as before, but honestly typed); absent *optional* fields stay
 * absent, because the metadata builder in `src/lib/page-metadata.ts`
 * distinguishes "not set" from "set to empty" and falls through to a default
 * on the first.
 */

interface RawLabelled {
  value?: string | null;
  label?: string | null;
}

interface RawNavChild {
  label?: string | null;
  href?: string | null;
}

interface RawNavLink {
  label?: string | null;
  href?: string | null;
  children?: readonly RawNavChild[] | null;
}

interface RawFooterLink {
  label?: string | null;
  href?: string | null;
  target?: string | null;
  rel?: string | null;
}

interface RawSocialLink {
  platform?: string | null;
  href?: string | null;
  label?: string | null;
}

interface RawSiteSettings {
  logo?: string | null;
  logoAlt?: string | null;
  navLinks?: readonly RawNavLink[] | null;

  footerHeadline?: string | null;
  footerHeadlineAccent?: string | null;
  footerCta?: { label?: string | null; href?: string | null } | null;
  exploreTitle?: string | null;
  exploreLinks?: readonly RawFooterLink[] | null;
  socials?: readonly RawSocialLink[] | null;
  newsletterTitle?: string | null;
  newsletterLabel?: string | null;
  newsletterPlaceholder?: string | null;
  newsletterSubmitLabel?: string | null;
  newsletterRequiredMessage?: string | null;
  newsletterInvalidMessage?: string | null;
  copyright?: string | null;
  legalLinks?: readonly RawFooterLink[] | null;

  siteName?: string | null;
  siteUrl?: string | null;
  defaultTitle?: string | null;
  titleTemplate?: string | null;
  defaultDescription?: string | null;
  ogImage?: string | null;
  ogImageWidth?: number | null;
  ogImageHeight?: number | null;
  ogImageAlt?: string | null;
  googleSiteVerification?: string | null;

  contactFieldPlaceholders?: readonly RawLabelled[] | null;
  contactSubjectLabel?: string | null;
  contactSubjectPlaceholder?: string | null;
  contactSubjectOptions?: readonly RawLabelled[] | null;
  contactConsentText?: string | null;
  contactConsentLinkLabel?: string | null;
  contactConsentLinkHref?: string | null;
  contactSubmitLabel?: string | null;
  contactSuccessMessage?: string | null;
  contactMessagePlaceholder?: string | null;
  contactMarketingLabel?: string | null;
  contactTermsLabel?: string | null;
  contactValidationMessages?: readonly RawLabelled[] | null;

  reportFormTitle?: string | null;
  reportFormSubmitLabel?: string | null;
  reportFormSuccessMessage?: string | null;
  reportFormPrivacyHref?: string | null;
  reportFormMarketingLabel?: string | null;
  reportFormConsentText?: string | null;
  reportFormConsentLinkLabel?: string | null;
  reportFormFieldLabels?: readonly RawLabelled[] | null;
  reportFormValidationMessages?: readonly RawLabelled[] | null;

  seoAuditFormTitle?: string | null;
  seoAuditFormSubmitLabel?: string | null;
  seoAuditFormSuccessMessage?: string | null;
  seoAuditFormPrivacyHref?: string | null;
  seoAuditFieldPlaceholders?: readonly RawLabelled[] | null;
  seoAuditFieldLabels?: readonly RawLabelled[] | null;
  seoAuditEmailConsentLabel?: string | null;
  seoAuditTermsLabel?: string | null;
  seoAuditConsentText?: string | null;
  seoAuditValidationMessages?: readonly RawLabelled[] | null;
}

/** Copy that is rendered: absent reads as empty. */
const text = (value: string | null | undefined) => value ?? "";

/** Copy that is a *fallback source*: absent has to stay absent so the default
 *  behind it can win. */
const optional = (value: string | null | undefined) => value ?? undefined;

const number = (value: number | null | undefined) => value ?? undefined;

const labelled = (rows: readonly RawLabelled[] | null | undefined) =>
  (rows ?? []).map(
    (row): LabelledValue => ({
      value: text(row.value),
      label: text(row.label),
    }),
  );

const links = (rows: readonly RawFooterLink[] | null | undefined) =>
  (rows ?? []).map(
    (row): FooterLink => ({
      label: text(row.label),
      href: text(row.href),
      target: optional(row.target),
      rel: optional(row.rel),
    }),
  );

/** The platforms the footer has an icon for. Anything else is dropped rather
 *  than rendered as a gap where an icon should be. */
const SOCIAL_PLATFORMS: readonly SocialPlatform[] = [
  "linkedin",
  "facebook",
  "instagram",
  "youtube",
];

const isPlatform = (value: unknown): value is SocialPlatform =>
  typeof value === "string" &&
  (SOCIAL_PLATFORMS as readonly string[]).includes(value);

function mapSocials(rows: readonly RawSocialLink[] | null | undefined) {
  return (rows ?? [])
    .filter((row) => isPlatform(row.platform))
    .map(
      (row): SocialLink => ({
        platform: row.platform as SocialPlatform,
        href: text(row.href),
        label: text(row.label),
      }),
    );
}

function mapNavLinks(rows: readonly RawNavLink[] | null | undefined) {
  return (rows ?? []).map(
    (row): NavLinkData => ({
      label: text(row.label),
      // Null is meaningful here, not missing: a top-level item with no href is
      // a menu that opens rather than a link that navigates.
      href: row.href ?? null,
      children: row.children
        ? row.children.map(
            (child): NavChild => ({
              label: text(child.label),
              href: text(child.href),
            }),
          )
        : undefined,
    }),
  );
}

export function mapSiteSettings(row: RawSiteSettings): SiteSettings {
  return {
    logo: text(row.logo),
    logoAlt: text(row.logoAlt),
    navLinks: mapNavLinks(row.navLinks),

    footerHeadline: text(row.footerHeadline),
    footerHeadlineAccent: text(row.footerHeadlineAccent),
    footerCta: row.footerCta
      ? { label: text(row.footerCta.label), href: text(row.footerCta.href) }
      : undefined,
    exploreTitle: text(row.exploreTitle),
    exploreLinks: links(row.exploreLinks),
    socials: mapSocials(row.socials),
    newsletterTitle: text(row.newsletterTitle),
    newsletterLabel: text(row.newsletterLabel),
    newsletterPlaceholder: text(row.newsletterPlaceholder),
    newsletterSubmitLabel: text(row.newsletterSubmitLabel),
    newsletterRequiredMessage: text(row.newsletterRequiredMessage),
    newsletterInvalidMessage: text(row.newsletterInvalidMessage),
    copyright: text(row.copyright),
    legalLinks: links(row.legalLinks),

    siteName: text(row.siteName),
    siteUrl: text(row.siteUrl),
    defaultTitle: text(row.defaultTitle),
    titleTemplate: text(row.titleTemplate),
    defaultDescription: text(row.defaultDescription),
    ogImage: optional(row.ogImage),
    ogImageWidth: number(row.ogImageWidth),
    ogImageHeight: number(row.ogImageHeight),
    ogImageAlt: optional(row.ogImageAlt),
    googleSiteVerification: optional(row.googleSiteVerification),

    contactFieldPlaceholders: labelled(row.contactFieldPlaceholders),
    contactSubjectLabel: text(row.contactSubjectLabel),
    contactSubjectPlaceholder: text(row.contactSubjectPlaceholder),
    contactSubjectOptions: labelled(row.contactSubjectOptions),
    contactConsentText: text(row.contactConsentText),
    contactConsentLinkLabel: text(row.contactConsentLinkLabel),
    contactConsentLinkHref: text(row.contactConsentLinkHref),
    contactSubmitLabel: text(row.contactSubmitLabel),
    contactSuccessMessage: text(row.contactSuccessMessage),
    contactMessagePlaceholder: text(row.contactMessagePlaceholder),
    contactMarketingLabel: text(row.contactMarketingLabel),
    contactTermsLabel: text(row.contactTermsLabel),
    contactValidationMessages: labelled(row.contactValidationMessages),

    reportFormTitle: text(row.reportFormTitle),
    reportFormSubmitLabel: text(row.reportFormSubmitLabel),
    reportFormSuccessMessage: text(row.reportFormSuccessMessage),
    reportFormPrivacyHref: text(row.reportFormPrivacyHref),
    reportFormMarketingLabel: text(row.reportFormMarketingLabel),
    reportFormConsentText: text(row.reportFormConsentText),
    reportFormConsentLinkLabel: text(row.reportFormConsentLinkLabel),
    reportFormFieldLabels: labelled(row.reportFormFieldLabels),
    reportFormValidationMessages: labelled(row.reportFormValidationMessages),

    seoAuditFormTitle: text(row.seoAuditFormTitle),
    seoAuditFormSubmitLabel: text(row.seoAuditFormSubmitLabel),
    seoAuditFormSuccessMessage: text(row.seoAuditFormSuccessMessage),
    seoAuditFormPrivacyHref: text(row.seoAuditFormPrivacyHref),
    seoAuditFieldPlaceholders: labelled(row.seoAuditFieldPlaceholders),
    seoAuditFieldLabels: labelled(row.seoAuditFieldLabels),
    seoAuditEmailConsentLabel: text(row.seoAuditEmailConsentLabel),
    seoAuditTermsLabel: text(row.seoAuditTermsLabel),
    seoAuditConsentText: text(row.seoAuditConsentText),
    seoAuditValidationMessages: labelled(row.seoAuditValidationMessages),
  };
}
