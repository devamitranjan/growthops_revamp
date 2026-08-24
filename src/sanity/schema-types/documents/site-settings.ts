import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Everything that appears on every page, plus the shared wiring of the two
 * forms.
 *
 * Page copy is *not* here any more: it belongs to the section that renders it,
 * on the page document that carries the section. What is left of the contact
 * and report-download groups is the vocabulary of the forms themselves — the
 * placeholders, options and messages keyed to field names that exist in code —
 * which is shared by every instance of the form rather than owned by one page.
 *
 * Singleton, pinned in `structure.ts`.
 *
 * What deliberately stays in code: form field `name`, `type` and
 * `autoComplete` (changing them breaks submission and browser autofill),
 * validation messages bound to Radix `match` values, and the social icon
 * components. Labels, placeholders and options are all editable here.
 */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  groups: [
    { name: "nav", title: "Navigation" },
    { name: "footer", title: "Footer" },
    { name: "seo", title: "SEO defaults" },
    { name: "contact", title: "Contact form" },
    { name: "reportForm", title: "Report download form" },
  ],

  fields: [
    // ── Navigation ──────────────────────────────────────────────────────
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      group: "nav",
    }),
    defineField({
      name: "logoAlt",
      title: "Logo alternative text",
      type: "string",
      group: "nav",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "navLinks",
      title: "Navigation",
      type: "array",
      of: [defineArrayMember({ type: "navLink" })],
      group: "nav",
      validation: (r) => r.required().min(1),
    }),

    // ── Footer ──────────────────────────────────────────────────────────
    defineField({ name: "footerHeadline", title: "Headline", type: "string", group: "footer", validation: (r) => r.required() }),
    defineField({
      name: "footerHeadlineAccent",
      title: "Headline (gradient line)",
      type: "string",
      group: "footer",
      description: "Rendered underneath the headline in the brand gradient.",
      validation: (r) => r.required(),
    }),
    defineField({ name: "footerCta", title: "Call to action", type: "linkCta", group: "footer" }),
    defineField({ name: "exploreTitle", title: "Explore heading", type: "string", group: "footer" }),
    defineField({
      name: "exploreLinks",
      title: "Explore links",
      type: "array",
      of: [defineArrayMember({ type: "footerLink" })],
      group: "footer",
    }),
    defineField({
      name: "socials",
      title: "Social links",
      type: "array",
      of: [defineArrayMember({ type: "socialLink" })],
      group: "footer",
    }),
    defineField({ name: "newsletterTitle", title: "Newsletter heading", type: "string", group: "footer" }),
    defineField({ name: "newsletterLabel", title: "Newsletter field label", type: "string", group: "footer" }),
    defineField({ name: "newsletterPlaceholder", title: "Newsletter placeholder", type: "string", group: "footer" }),
    defineField({ name: "newsletterSubmitLabel", title: "Newsletter submit label", type: "string", group: "footer" }),
    defineField({ name: "newsletterRequiredMessage", title: "Newsletter — empty message", type: "string", group: "footer" }),
    defineField({ name: "newsletterInvalidMessage", title: "Newsletter — invalid message", type: "string", group: "footer" }),
    defineField({ name: "copyright", type: "string", group: "footer" }),
    defineField({
      name: "legalLinks",
      title: "Legal links",
      type: "array",
      of: [defineArrayMember({ type: "footerLink" })],
      group: "footer",
    }),

    // ── SEO defaults ────────────────────────────────────────────────────
    defineField({ name: "siteName", type: "string", group: "seo", validation: (r) => r.required() }),
    defineField({ name: "siteUrl", title: "Site URL", type: "url", group: "seo", validation: (r) => r.required() }),
    defineField({ name: "defaultTitle", title: "Default title", type: "string", group: "seo", validation: (r) => r.required() }),
    defineField({
      name: "titleTemplate",
      type: "string",
      group: "seo",
      description: 'Applied to every page title. Must contain "%s".',
      validation: (r) => r.required().custom((v) => (typeof v === "string" && v.includes("%s") ? true : 'Must contain "%s"')),
    }),
    defineField({ name: "defaultDescription", title: "Default description", type: "text", rows: 3, group: "seo", validation: (r) => r.required() }),
    defineField({ name: "ogImage", title: "Default social share image", type: "image", group: "seo" }),
    defineField({ name: "ogImageAlt", title: "Share image alternative text", type: "string", group: "seo" }),
    defineField({ name: "googleSiteVerification", type: "string", group: "seo" }),

    // ── Contact form ────────────────────────────────────────────────────
    // Shared form wiring, not page copy: the heading and the page's SEO belong
    // to the `contactFormSection` and the page document that carries it.
    defineField({
      name: "contactFieldPlaceholders",
      title: "Field placeholders",
      type: "array",
      of: [defineArrayMember({ type: "subjectOption" })],
      group: "contact",
      description:
        'One entry per field, where "value" is the field name (firstName, lastName, phone, email, message) and "label" is the placeholder shown.',
    }),
    defineField({ name: "contactSubjectLabel", title: "Subject label", type: "string", group: "contact" }),
    defineField({ name: "contactSubjectPlaceholder", title: "Subject placeholder", type: "string", group: "contact" }),
    defineField({
      name: "contactSubjectOptions",
      title: "Subject options",
      type: "array",
      of: [defineArrayMember({ type: "subjectOption" })],
      group: "contact",
    }),
    defineField({ name: "contactConsentText", title: "Consent text", type: "text", rows: 3, group: "contact" }),
    defineField({ name: "contactConsentLinkLabel", title: "Consent link label", type: "string", group: "contact" }),
    defineField({ name: "contactConsentLinkHref", title: "Consent link URL", type: "string", group: "contact" }),
    defineField({ name: "contactSubmitLabel", title: "Submit label", type: "string", group: "contact" }),
    defineField({ name: "contactSuccessMessage", title: "Success message", type: "string", group: "contact" }),
    defineField({ name: "contactMessagePlaceholder", title: "Message placeholder", type: "string", group: "contact" }),
    defineField({ name: "contactMarketingLabel", title: "Marketing opt-in label", type: "string", group: "contact" }),
    defineField({ name: "contactTermsLabel", title: "Terms label", type: "text", rows: 2, group: "contact" }),
    defineField({
      name: "contactValidationMessages",
      title: "Validation messages",
      type: "array",
      of: [defineArrayMember({ type: "subjectOption" })],
      group: "contact",
      description:
        'Keyed by "value": required, email, subject, message, terms. The rules themselves live in code; only the wording is editable here.',
    }),

    // ── Report download form ────────────────────────────────────────────
    defineField({ name: "reportFormTitle", title: "Heading", type: "string", group: "reportForm" }),
    defineField({ name: "reportFormSubmitLabel", title: "Submit label", type: "string", group: "reportForm" }),
    defineField({ name: "reportFormSuccessMessage", title: "Success message", type: "string", group: "reportForm" }),
    defineField({ name: "reportFormPrivacyHref", title: "Privacy policy URL", type: "string", group: "reportForm" }),
    defineField({ name: "reportFormMarketingLabel", title: "Marketing opt-in label", type: "string", group: "reportForm" }),
    defineField({ name: "reportFormConsentText", title: "Consent text", type: "text", rows: 2, group: "reportForm" }),
    defineField({ name: "reportFormConsentLinkLabel", title: "Consent link label", type: "string", group: "reportForm" }),
    defineField({
      name: "reportFormFieldLabels",
      title: "Field labels",
      type: "array",
      of: [defineArrayMember({ type: "subjectOption" })],
      group: "reportForm",
      description:
        'Keyed by "value": firstName, lastName, email, organisation, role. The field wiring stays in code.',
    }),
    defineField({
      name: "reportFormValidationMessages",
      title: "Validation messages",
      type: "array",
      of: [defineArrayMember({ type: "subjectOption" })],
      group: "reportForm",
      description: 'Keyed by "value": required, email, consent.',
    }),
  ],

  preview: { prepare: () => ({ title: "Site settings" }) },
});
