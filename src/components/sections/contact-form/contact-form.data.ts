import { SubjectOption, TextField } from "./contact-form.types";

export const textFields: TextField[] = [
  {
    name: "firstName",
    placeholder: "First Name*",
    type: "text",
    autoComplete: "given-name",
  },
  {
    name: "lastName",
    placeholder: "Last Name*",
    type: "text",
    autoComplete: "family-name",
  },
  {
    name: "phone",
    placeholder: "Phone*",
    type: "tel",
    autoComplete: "tel",
  },
  {
    name: "email",
    placeholder: "Work Email*",
    type: "email",
    autoComplete: "email",
    typeMismatchMessage: "Please provide a valid email",
  },
];

export const subjectOptions: SubjectOption[] = [
  { value: "new-business", label: "New Business" },
  { value: "general-enquiry", label: "General Enquiry" },
  { value: "partnerships", label: "Partnerships" },
  { value: "careers", label: "Careers" },
  { value: "media-and-press", label: "Media & Press" },
];
