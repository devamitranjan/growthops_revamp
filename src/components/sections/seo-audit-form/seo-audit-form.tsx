"use client";

import { useState } from "react";
import { Form } from "radix-ui";

import type { SiteSettings } from "@/content/types";
import { textFields } from "./seo-audit-form.fields";

const darkInputClasses =
  "w-full min-h-11 rounded-md border border-[#2a2a2a] bg-[#010101] px-4 py-2.5 body1-regular text-neutral-white-base placeholder-neutral-grey-base outline-none transition duration-300 focus:border-primary-pink-base focus:ring-1 focus:ring-primary-pink-base";

const labelClasses = "body1-regular text-neutral-white-base";

const messageClasses = "body3-regular text-primary-pink-base";

const checkboxClasses =
  "mt-1 h-4 w-4 shrink-0 cursor-pointer accent-primary-pink-base";

const radioClasses =
  "h-4 w-4 shrink-0 cursor-pointer accent-primary-pink-base";

export interface SeoAuditFormViewProps {
  settings: SiteSettings;
  title?: string;
  className?: string;
  onSubmit?: (values: Record<string, string | boolean>) => void;
}

export function SeoAuditFormView({
  settings,
  title,
  className = "bg-black py-5 md:py-6",
  onSubmit,
}: SeoAuditFormViewProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [agencyType, setAgencyType] = useState<"yes" | "no" | "">("");

  const byValue = (entries: { value: string; label: string }[] = []) =>
    Object.fromEntries(entries.map((e) => [e.value, e.label]));

  const placeholders = byValue(settings.seoAuditFieldPlaceholders ?? []);
  const fieldLabels = byValue(settings.seoAuditFieldLabels ?? []);
  const messages = byValue(settings.seoAuditValidationMessages ?? []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const values = Object.fromEntries(
      new FormData(event.currentTarget).entries(),
    ) as Record<string, string | boolean>;

    if (onSubmit) {
      onSubmit(values);
    }

    setIsSubmitted(true);
  };

  return (
    <section className={className}>
      <div className="generic-container flex flex-col gap-10 md:gap-12">
        <h1 className="text-center text-[32px] font-extrabold leading-[38px] text-neutral-white-base">
          {title || settings.seoAuditFormTitle}
        </h1>

        <Form.Root
          className="mx-auto flex w-full max-w-[1048px] flex-col gap-4"
          onSubmit={handleSubmit}
        >
          {/* Agency Type Question */}
          <Form.Field
            name="agencyType"
            className="flex flex-col gap-1"
          >
            <Form.Label className={labelClasses}>
              {fieldLabels.agencyTypeLabel ||
                "Are you an advertiser or a marketing agency?"}
              <span className="text-primary-orange-light">*</span>
            </Form.Label>

            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1">
                <Form.Control
                  type="radio"
                  value="yes"
                  checked={agencyType === "yes"}
                  onChange={() => setAgencyType("yes")}
                  className={radioClasses}
                  required
                />
                <label className={`${labelClasses} cursor-pointer`}>
                  Yes
                </label>
              </div>

              <div className="flex items-center gap-1">
                <Form.Control
                  type="radio"
                  value="no"
                  checked={agencyType === "no"}
                  onChange={() => setAgencyType("no")}
                  className={radioClasses}
                  required
                />
                <label className={`${labelClasses} cursor-pointer`}>
                  No
                </label>
              </div>
            </div>
          </Form.Field>

          {/* Company Website */}
          <Form.Field
            name="companyWebsite"
            className="flex flex-col gap-1"
          >
            <Form.Label className="sr-only">
              {fieldLabels.companyWebsiteLabel || "Company Website"}
              <span className="text-primary-orange-light">*</span>
            </Form.Label>

            <Form.Control
              type="text"
              placeholder={
                placeholders.companyWebsite || "Enter your company website"
              }
              required
              className={darkInputClasses}
            />

            <Form.Message
              match="valueMissing"
              className={messageClasses}
            >
              {messages.required || "This field is required"}
            </Form.Message>
          </Form.Field>

          {/* Advertising Budget */}
          <Form.Field
            name="adBudget"
            className="flex flex-col gap-1"
          >
            <Form.Label className={labelClasses}>
              {fieldLabels.adBudgetLabel ||
                "What is your average monthly online advertising budget?"}
              <span className="text-primary-orange-light">*</span>
            </Form.Label>

            <Form.Control
              type="text"
              placeholder={
                placeholders.adBudget || "Enter your monthly budget"
              }
              required
              className={darkInputClasses}
            />

            <Form.Message
              match="valueMissing"
              className={messageClasses}
            >
              {messages.required || "This field is required"}
            </Form.Message>
          </Form.Field>

          {/* Text Fields */}
          {textFields.map((field) => (
            <Form.Field
              key={field.name}
              name={field.name}
              className="flex flex-col gap-1"
            >
              {/* Keep CMS label for accessibility, but hide it visually */}
              <Form.Label className="sr-only">
                {fieldLabels[field.name] ||
                  (field.name === "firstName" && "First Name") ||
                  (field.name === "lastName" && "Last Name") ||
                  (field.name === "phone" && "Phone") ||
                  (field.name === "workEmail" && "Work Email")}
                <span className="text-primary-orange-light">*</span>
              </Form.Label>

              <Form.Control
                type={field.type}
                placeholder={
                  placeholders[field.name] ||
                  (field.name === "firstName" && "First Name*") ||
                  (field.name === "lastName" && "Last Name*") ||
                  (field.name === "phone" && "Phone*") ||
                  (field.name === "workEmail" && "Work Email*") ||
                  ""
                }
                autoComplete={field.autoComplete}
                required
                className={darkInputClasses}
              />

              <Form.Message
                match="valueMissing"
                className={messageClasses}
              >
                {messages.required || "This field is required"}
              </Form.Message>

              {field.type === "email" && (
                <Form.Message
                  match="typeMismatch"
                  className={messageClasses}
                >
                  {messages.email || "Please enter a valid email"}
                </Form.Message>
              )}
            </Form.Field>
          ))}

          {/* Privacy Notice */}
          <p className="body2-regular text-neutral-grey-base">
            {settings.seoAuditConsentText ||
              "Your personal data will be used to process your enquiry, support your experience, and for other purposes described in our Privacy Policy."}
          </p>

          {/* Email Consent */}
          <Form.Field
            name="emailConsent"
            className="flex items-start gap-3"
          >
            <Form.Control
              type="checkbox"
              className={checkboxClasses}
            />

            <Form.Label className={`${labelClasses} cursor-pointer`}>
              {settings.seoAuditEmailConsentLabel ||
                "I agree to get emails from GrowthOps."}
            </Form.Label>
          </Form.Field>

          {/* Terms Consent */}
          <Form.Field
            name="termsConsent"
            className="flex items-start gap-3"
          >
            <Form.Control
              type="checkbox"
              className={checkboxClasses}
              required
            />

            <Form.Label className={`${labelClasses} cursor-pointer`}>
              {settings.seoAuditTermsLabel ||
                "I have read and agree to the website's terms and conditions."}
              <span className="text-primary-orange-light">*</span>
            </Form.Label>

            <Form.Message
              match="valueMissing"
              className={messageClasses}
            >
              {messages.required || "You must agree to the terms"}
            </Form.Message>
          </Form.Field>

          {/* Submit Button */}
          <div className="pt-2">
            <Form.Submit asChild>
              <button
                type="submit"
                className="w-full rounded-md bg-primary-pink-base px-6 py-3 font-bold text-neutral-black-base transition-all duration-300 hover:bg-primary-pink-dark active:scale-95 md:w-auto"
              >
                {isSubmitted
                  ? "Submitted!"
                  : settings.seoAuditFormSubmitLabel ||
                    "Get Free SEO Audit"}
              </button>
            </Form.Submit>
          </div>

          {/* Success Message */}
          {isSubmitted && (
            <div className="rounded-md bg-green-100 p-4 text-green-800">
              {settings.seoAuditFormSuccessMessage ||
                "Thank you! We'll review your website and send you a free SEO audit soon."}
            </div>
          )}
        </Form.Root>
      </div>
    </section>
  );
}