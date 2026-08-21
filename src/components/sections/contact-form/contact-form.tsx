"use client";

import { useState } from "react";
import { Form } from "radix-ui";
import { subjectOptions, textFields } from "./contact-form.data";

const inputClasses =
  "w-full rounded-md bg-neutral-white-base px-5 py-3 body1-regular text-neutral-black-base placeholder-neutral-grey-base outline-none transition duration-300 focus:ring-2 focus:ring-primary-pink-base";

const darkControlClasses =
  "w-full rounded-md border border-neutral-white-base/50 bg-[#010101] px-5 py-3 body1-regular text-neutral-white-base outline-none transition duration-300 focus:border-primary-pink-base focus:ring-1 focus:ring-primary-pink-base";

const messageClasses = "body3-regular text-primary-pink-base";

const checkboxClasses =
  "mt-1 h-4 w-4 shrink-0 accent-primary-pink-base cursor-pointer";

export default function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <section className="pt-32 md:pt-40">
      <div className="generic-container flex flex-col gap-10 md:gap-14">
        <h1 className="heading-h1-extrabold text-primary-pink-base">
          Ready to get started?
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
                placeholder={field.placeholder}
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

          <Form.Field name="subject" className="flex flex-col gap-2">
            <Form.Label className="body1-regular text-neutral-white-base">
              Subject<span className="text-primary-orange-light">*</span>
            </Form.Label>
            <Form.Control asChild required>
              <select defaultValue="" className={darkControlClasses}>
                <option value="" disabled>
                  Select One
                </option>
                {subjectOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </Form.Control>
            <Form.Message match="valueMissing" className={messageClasses}>
              Please select a subject
            </Form.Message>
          </Form.Field>

          <Form.Field name="message" className="flex flex-col gap-2">
            <Form.Control asChild required>
              <textarea
                placeholder="Tell us more*"
                rows={7}
                className={`${darkControlClasses} min-h-[180px] placeholder-neutral-grey-base`}
              />
            </Form.Control>
            <Form.Message match="valueMissing" className={messageClasses}>
              Please tell us a little more
            </Form.Message>
          </Form.Field>

          <p className="body2-regular text-neutral-white-base">
            Your personal data will be used to process your enquiry, support
            your experience, and for other purposes described in our{" "}
            <a
              href="https://www.growthops.asia/privacy-policy"
              target="_self"
              rel=""
              className="transition ease-out duration-300 hover:text-primary-pink-base"
            >
              Privacy Policy
            </a>
            .
          </p>

          <div className="flex flex-col gap-4">
            <Form.Field name="marketingOptIn" className="flex gap-4">
              <Form.Control type="checkbox" className={checkboxClasses} />
              <Form.Label className="body1-regular text-neutral-white-base cursor-pointer">
                I agree to get emails from GrowthOps.
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
                  I have read and agree to the website&apos;s terms and
                  conditions.
                  <span className="text-primary-orange-light">*</span>
                </Form.Label>
              </div>
              <Form.Message match="valueMissing" className={messageClasses}>
                Please accept the terms and conditions
              </Form.Message>
            </Form.Field>
          </div>

          <div className="flex flex-col gap-4 mt-4">
            <Form.Submit className="h-40 w-40 rounded-[40px] border border-neutral-white-base body2-bold text-neutral-white-base transition ease-out duration-300 hover:bg-neutral-white-base hover:text-primary-pink-base">
              Submit
            </Form.Submit>
            {isSubmitted && (
              <p
                role="status"
                className="body1-semibold text-primary-cyan-base"
              >
                Thanks for reaching out — we&apos;ll be in touch shortly.
              </p>
            )}
          </div>
        </Form.Root>
      </div>
    </section>
  );
}
