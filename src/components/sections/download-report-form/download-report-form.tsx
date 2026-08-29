"use client";

import { useState } from "react";
import { Form } from "radix-ui";

import type { SiteSettings } from "@/content/types";

import { downloadFormFields } from "./download-report-form.fields";

export interface DownloadReportFormProps {
  settings: SiteSettings;
  /** Per-page override for the shared heading in `siteSettings`. */
  title?: string;
  /** Opened once the form validates — the gated asset. */
  fileUrl?: string;
  onSubmit?: (values: Record<string, string>) => void;
  className?: string;
}

export const inputClasses =
  "w-full rounded-[9px] bg-[#010101] px-5 py-3 body1-regular text-neutral-white-base placeholder-neutral-grey-base outline-none transition duration-300 focus:ring-2 focus:ring-primary-pink-base";

const labelClasses = "body1-regular text-neutral-white-base";

const messageClasses = "body3-regular text-primary-pink-base";

const checkboxClasses =
  "mt-1 h-4 w-4 shrink-0 accent-primary-pink-base cursor-pointer";

export function DownloadReportFormView({
  settings,
  title,
  fileUrl,
  onSubmit,
  className = "bg-[#666666] py-[100px]",
}: DownloadReportFormProps) {
  const labels = Object.fromEntries(
    (settings.reportFormFieldLabels ?? []).map((f) => [f.value, f.label]),
  );
  const messages = Object.fromEntries(
    (settings.reportFormValidationMessages ?? []).map((f) => [f.value, f.label]),
  );
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <>
      <section className={className}>
        <div className="generic-container flex flex-col gap-6 md:gap-8">
          <h2 className="text-[2.5rem] leading-10 font-extrabold text-neutral-white-base md:text-[3rem] md:leading-[3.5rem]">
            {title ?? settings.reportFormTitle}
          </h2>

          <Form.Root
              className="mx-auto flex w-full max-w-[360px] flex-col gap-0.5 md:max-w-[820px] md:px-11"
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
            {downloadFormFields.map((field) => (
              <Form.Field
                key={field.name}
                name={field.name}
                className="flex flex-col gap-1"
              >
                <Form.Label className={labelClasses}>{labels[field.name]}*</Form.Label>
                <Form.Control
                  type={field.type}
                  autoComplete={field.autoComplete}
                  required
                  className={inputClasses}
                />
                <Form.Message match="valueMissing" className={messageClasses}>
                  {messages.required}
                </Form.Message>
                {field.type === "email" && (
                  <Form.Message match="typeMismatch" className={messageClasses}>
                    {messages.email}
                  </Form.Message>
                )}
              </Form.Field>
            ))}

            <div className="flex flex-col gap-2">
              <Form.Field name="marketingOptIn" className="flex gap-4">
                <Form.Control type="checkbox" className={checkboxClasses} />
                <Form.Label className={`${labelClasses} cursor-pointer`}>
                  {settings.reportFormMarketingLabel}
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
                    {settings.reportFormConsentText}{" "}
                    <a
                      href={settings.reportFormPrivacyHref}
                      target="_self"
                      rel=""
                      className="transition ease-out duration-300 hover:text-primary-pink-base hover:underline"
                    >
                      {settings.reportFormConsentLinkLabel}
                    </a>
                    .*
                  </Form.Label>
                </div>
                <Form.Message match="valueMissing" className={messageClasses}>
                  {messages.consent}
                </Form.Message>
              </Form.Field>
            </div>

            <div className="flex flex-col gap-4 mt-6">
              <Form.Submit className="w-fit rounded-[40px] bg-primary-pink-base hover:bg-primary-pink-extradark text-white body2-bold px-10 py-3 transition ease-out duration-300">
                {settings.reportFormSubmitLabel}
              </Form.Submit>
              {isSubmitted && (
                <p
                  role="status"
                  className="body1-semibold text-primary-cyan-base"
                >
                  {settings.reportFormSuccessMessage}
                </p>
              )}
            </div>
          </Form.Root>
        </div>
      </section>
    </>
  );
}
