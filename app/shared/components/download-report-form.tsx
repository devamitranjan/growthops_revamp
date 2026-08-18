"use client";

import { useState } from "react";
import { Form } from "radix-ui";

export interface DownloadFormField {
  name: string;
  label: string;
  type: "text" | "email" | "tel";
  autoComplete: string;
  /** Message shown when the browser reports a badly formatted value. */
  typeMismatchMessage?: string;
}

export interface DownloadReportFormProps {
  title?: React.ReactNode;
  /** Overrides the default name/email/organisation/role set. */
  fields?: DownloadFormField[];
  submitLabel?: string;
  /** Opened once the form validates — the gated asset. */
  fileUrl?: string;
  privacyPolicyHref?: string;
  successMessage?: string;
  /** Runs instead of the built-in "open fileUrl" behaviour when provided. */
  onSubmit?: (values: Record<string, string>) => void;
  className?: string;
}

export const defaultFields: DownloadFormField[] = [
  {
    name: "firstName",
    label: "First name",
    type: "text",
    autoComplete: "given-name",
  },
  {
    name: "lastName",
    label: "Last name",
    type: "text",
    autoComplete: "family-name",
  },
  {
    name: "email",
    label: "Work Email",
    type: "email",
    autoComplete: "email",
    typeMismatchMessage: "Please provide a valid email",
  },
  {
    name: "organisation",
    label: "Organisation",
    type: "text",
    autoComplete: "organization",
  },
  {
    name: "role",
    label: "Role",
    type: "text",
    autoComplete: "organization-title",
  },
];

const inputClasses =
  "w-full rounded-[9px] bg-[#010101] px-5 py-3 body1-regular text-neutral-white-base placeholder-neutral-grey-base outline-none transition duration-300 focus:ring-2 focus:ring-primary-pink-base";

const labelClasses = "body1-regular text-neutral-white-base";

const messageClasses = "body3-regular text-primary-pink-base";

const checkboxClasses =
  "mt-1 h-4 w-4 shrink-0 accent-primary-pink-base cursor-pointer";

export default function DownloadReportForm({
  title = "Download the Full Report",
  fields = defaultFields,
  submitLabel = "Download",
  fileUrl,
  privacyPolicyHref = "https://www.growthops.asia/privacy-policy",
  successMessage = "Thanks — your report is on its way.",
  onSubmit,
  className = "bg-[#666666] py-[100px]",
}: DownloadReportFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <>
      <section className={className}>
        <div className="generic-container flex flex-col gap-6 md:gap-8">
          <h2 className="text-[1.5rem] leading-10 font-extrabold text-neutral-white-base md:text-[3rem] md:leading-[3.5rem]">
            {title}
          </h2>

          <Form.Root
            className="mx-auto flex w-full max-w-[800px] flex-col gap-0.5 md:px-11"
            onSubmit={(event) => {
              // No backend yet: keep the entered values on screen instead of
              // letting the browser do a full-page GET submit.
              event.preventDefault();
              const values = Object.fromEntries(
                new FormData(event.currentTarget).entries(),
              ) as Record<string, string>;

              if (onSubmit) {
                onSubmit(values);
              } else if (fileUrl) {
                window.open(fileUrl, "_blank", "noopener,noreferrer");
              }

              setIsSubmitted(true);
            }}
          >
            {fields.map((field) => (
              <Form.Field
                key={field.name}
                name={field.name}
                className="flex flex-col gap-1"
              >
                <Form.Label className={labelClasses}>
                  {field.label}*
                </Form.Label>
                <Form.Control
                  type={field.type}
                  autoComplete={field.autoComplete}
                  required
                  className={inputClasses}
                />
                <Form.Message match="valueMissing" className={messageClasses}>
                  This field is required
                </Form.Message>
                {field.typeMismatchMessage && (
                  <Form.Message match="typeMismatch" className={messageClasses}>
                    {field.typeMismatchMessage}
                  </Form.Message>
                )}
              </Form.Field>
            ))}

            <div className="flex flex-col gap-2">
              <Form.Field name="marketingOptIn" className="flex gap-4">
                <Form.Control type="checkbox" className={checkboxClasses} />
                <Form.Label className={`${labelClasses} cursor-pointer`}>
                  I agree to receive other communications from GrowthOps.
                </Form.Label>
              </Form.Field>

              <Form.Field name="dataConsent" className="flex flex-col gap-2">
                <div className="flex gap-4">
                  <Form.Control
                    type="checkbox"
                    required
                    className={checkboxClasses}
                  />
                  <Form.Label className={`${labelClasses} cursor-pointer`}>
                    I agree to allow GrowthOps to store and process my personal
                    data in accordance with our{" "}
                    <a
                      href={privacyPolicyHref}
                      target="_self"
                      rel=""
                      className="transition ease-out duration-300 hover:text-primary-pink-base hover:underline"
                    >
                      Privacy Policy
                    </a>
                    .*
                  </Form.Label>
                </div>
                <Form.Message match="valueMissing" className={messageClasses}>
                  Please accept the privacy policy
                </Form.Message>
              </Form.Field>
            </div>

            <div className="flex flex-col gap-4 mt-6">
              <Form.Submit className="w-fit rounded-[40px] bg-primary-pink-base hover:bg-primary-pink-extradark text-white body2-bold px-10 py-3 transition ease-out duration-300">
                {submitLabel}
              </Form.Submit>
              {isSubmitted && (
                <p
                  role="status"
                  className="body1-semibold text-primary-cyan-base"
                >
                  {successMessage}
                </p>
              )}
            </div>
          </Form.Root>
        </div>
      </section>

      <div className="bg-neutral-black-light pt-24 pb-24">
        <div className="border-t border-neutral-white-base/20" />
      </div>
    </>
  );
}
