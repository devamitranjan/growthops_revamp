"use client";

import { useState } from "react";
import { Form } from "radix-ui";

import type { SiteSettings } from "@/sanity/types";

import { textFields } from "./contact-form.fields";

const inputClasses =
  "w-full rounded-md bg-neutral-white-base px-5 py-3 body1-regular text-neutral-black-base placeholder-neutral-grey-base outline-none transition duration-300 focus:ring-2 focus:ring-primary-pink-base";

const darkControlClasses =
  "w-full rounded-md border border-neutral-white-base/50 bg-[#010101] px-5 py-3 body1-regular text-neutral-white-base outline-none transition duration-300 focus:border-primary-pink-base focus:ring-1 focus:ring-primary-pink-base";

const messageClasses = "body3-regular text-primary-pink-base";

const checkboxClasses =
  "mt-1 h-4 w-4 shrink-0 accent-primary-pink-base cursor-pointer";

/** Turns the keyed CMS lists into a lookup. */
const byValue = (entries: { value: string; label: string }[]) =>
  Object.fromEntries(entries.map((e) => [e.value, e.label]));

export function ContactFormView({
  title,
  settings,
}: {
  /** The page's own heading. The rest of the form's wording is shared, and
   *  comes from `siteSettings`. */
  title: string;
  settings: SiteSettings;
}) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const placeholders = byValue(settings.contactFieldPlaceholders ?? []);
  const messages = byValue(settings.contactValidationMessages ?? []);

  return (
    <section className="pt-32 md:pt-40">
      <div className="generic-container flex flex-col gap-10 md:gap-14">
        <h1 className="heading-h1-extrabold text-primary-pink-base">
          {title}
        </h1>

        <Form.Root
          className="flex flex-col gap-6"
          onSubmit={(event) => {
            // No backend yet: keep the entered values on screen instead of
            // letting the browser do a full-page GET submit.
            event.preventDefault();
            setIsSubmitted(true);
          }}
        >
          {textFields.map((field) => (
            <Form.Field
              key={field.name}
              name={field.name}
              className="flex flex-col gap-2"
            >
              <Form.Control
                type={field.type}
                placeholder={placeholders[field.name]}
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

          <Form.Field name="subject" className="flex flex-col gap-2">
            <Form.Label className="body1-regular text-neutral-white-base">
              {settings.contactSubjectLabel}
              <span className="text-primary-orange-light">*</span>
            </Form.Label>
            <Form.Control asChild required>
              <select defaultValue="" className={darkControlClasses}>
                <option value="" disabled>
                  {settings.contactSubjectPlaceholder}
                </option>
                {settings.contactSubjectOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </Form.Control>
            <Form.Message match="valueMissing" className={messageClasses}>
              {messages.subject}
            </Form.Message>
          </Form.Field>

          <Form.Field name="message" className="flex flex-col gap-2">
            <Form.Control asChild required>
              <textarea
                placeholder={settings.contactMessagePlaceholder}
                rows={7}
                className={`${darkControlClasses} min-h-[180px] placeholder-neutral-grey-base`}
              />
            </Form.Control>
            <Form.Message match="valueMissing" className={messageClasses}>
              {messages.message}
            </Form.Message>
          </Form.Field>

          <p className="body2-regular text-neutral-white-base">
            {settings.contactConsentText}{" "}
            <a
              href={settings.contactConsentLinkHref}
              target="_self"
              rel=""
              className="transition ease-out duration-300 hover:text-primary-pink-base"
            >
              {settings.contactConsentLinkLabel}
            </a>
            .
          </p>

          <div className="flex flex-col gap-4">
            <Form.Field name="marketingOptIn" className="flex gap-4">
              <Form.Control type="checkbox" className={checkboxClasses} />
              <Form.Label className="body1-regular text-neutral-white-base cursor-pointer">
                {settings.contactMarketingLabel}
              </Form.Label>
            </Form.Field>

            <Form.Field name="terms" className="flex flex-col gap-2">
              <div className="flex gap-4">
                <Form.Control
                  type="checkbox"
                  required
                  className={checkboxClasses}
                />
                <Form.Label className="body1-regular text-neutral-white-base cursor-pointer">
                  {settings.contactTermsLabel}
                  <span className="text-primary-orange-light">*</span>
                </Form.Label>
              </div>
              <Form.Message match="valueMissing" className={messageClasses}>
                {messages.terms}
              </Form.Message>
            </Form.Field>
          </div>

          <div className="flex flex-col gap-4 mt-4">
            <Form.Submit className="h-40 w-40 rounded-[40px] border border-neutral-white-base body2-bold text-neutral-white-base transition ease-out duration-300 hover:bg-neutral-white-base hover:text-primary-pink-base">
              {settings.contactSubmitLabel}
            </Form.Submit>
            {isSubmitted && (
              <p
                role="status"
                className="body1-semibold text-primary-cyan-base"
              >
                {settings.contactSuccessMessage}
              </p>
            )}
          </div>
        </Form.Root>
      </div>
    </section>
  );
}
