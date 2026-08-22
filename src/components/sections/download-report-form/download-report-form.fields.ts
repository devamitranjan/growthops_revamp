/**
 * Structural wiring for the report download form, deliberately NOT in the CMS.
 * `name` is what the form posts and `autoComplete` drives browser autofill;
 * the visible labels live in `siteSettings.reportFormFieldLabels`.
 */
export interface DownloadFormField {
  name: string;
  type: "text" | "email" | "tel";
  autoComplete: string;
}

export const downloadFormFields: DownloadFormField[] = [
  { name: "firstName", type: "text", autoComplete: "given-name" },
  { name: "lastName", type: "text", autoComplete: "family-name" },
  { name: "email", type: "email", autoComplete: "email" },
  { name: "organisation", type: "text", autoComplete: "organization" },
  { name: "role", type: "text", autoComplete: "organization-title" },
];
