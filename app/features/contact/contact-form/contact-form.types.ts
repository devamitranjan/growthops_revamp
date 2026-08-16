export interface SubjectOption {
  value: string;
  label: string;
}

export interface TextField {
  name: string;
  placeholder: string;
  type: "text" | "tel" | "email";
  autoComplete: string;
  /** Message shown when the browser reports a badly formatted value. */
  typeMismatchMessage?: string;
}
