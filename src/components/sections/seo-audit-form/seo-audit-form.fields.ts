/**
 * Structural wiring for the SEO Audit form, deliberately NOT in the CMS.
 *
 * `name` is what the form posts, `type` drives browser validation and
 * `autoComplete` drives autofill — an editor changing any of them breaks
 * submission silently. The visible copy (placeholders, labels, options,
 * validation wording) all lives in `siteSettings`.
 */
export interface TextField {
  name: string;
  type: "text" | "tel" | "email";
  autoComplete: string;
}

export const textFields: TextField[] = [
  { name: "firstName", type: "text", autoComplete: "given-name" },
  { name: "lastName", type: "text", autoComplete: "family-name" },
  { name: "phone", type: "tel", autoComplete: "tel" },
  { name: "workEmail", type: "email", autoComplete: "email" },
];

export interface SeoAuditFormFields {
  agencyType: "yes" | "no" | "";
  companyWebsite: string;
  adBudget: string;
  firstName: string;
  lastName: string;
  phone: string;
  workEmail: string;
  emailConsent: boolean;
  termsConsent: boolean;
}
