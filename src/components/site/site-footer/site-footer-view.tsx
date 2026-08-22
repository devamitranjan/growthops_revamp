"use client";

import { Form } from "radix-ui";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaUpRightFromSquare,
  FaYoutube,
} from "react-icons/fa6";

import type { SiteSettings, SocialPlatform } from "@/sanity/types";

/** The icons are components, so the platform key picks one here rather than
 *  the CMS storing markup. A platform with no entry renders no icon. */
const SOCIAL_ICONS: Record<SocialPlatform, React.ComponentType> = {
  linkedin: FaLinkedinIn,
  facebook: FaFacebookF,
  instagram: FaInstagram,
  youtube: FaYoutube,
};

export function SiteFooterView({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="border-t border-neutral-white-base/20 mt-24">
      <div className="generic-container pt-16 pb-10 flex flex-col gap-[72px]">
        <div className="flex flex-col gap-10 justify-center items-center">
          <div className="flex flex-col gap-2 items-center">
            <h2 className="heading-h1-bold text-neutral-white-base text-center">
              {settings.footerHeadline}
            </h2>
            <h2 className="heading-h1-bold text-center gradient-text">
              {settings.footerHeadlineAccent}
            </h2>
          </div>
          {settings.footerCta && (
            <a
              href={settings.footerCta.href}
              target="_self"
              rel=""
              className="rounded-[40px] bg-primary-pink-base hover:bg-primary-pink-extradark text-white body2-bold px-10 py-3 transition ease-out duration-300"
            >
              {settings.footerCta.label}
            </a>
          )}
        </div>

        <div>
          <div className="flex pt-8 px-6 pb-10 md:px-16 md:py-10 rounded-[20px] bg-[#1F2326] flex max-md:flex-col gap-16 md:gap-8">
            <div className="flex flex-col gap-6 md:basis-3/5">
              <div className="flex flex-col gap-4">
                <p className="body1-regular md:body1-regular text-neutral-white-base">
                  {settings.exploreTitle}
                </p>
                <div className="flex flex-col gap-3 body1-semibold md:body1-semibold text-neutral-white-base">
                  {settings.exploreLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target={link.target}
                      rel={link.rel}
                      className="w-fit transition ease-out duration-300 hover:text-primary-pink-base hover:border-b hover:border-primary-pink-base"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex gap-8">
                {settings.socials.map((social) => {
                  const Icon = SOCIAL_ICONS[social.platform];
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="h-10 w-10 flex justify-center items-center rounded-full text-xl text-white transition ease-out duration-300 hover:bg-neutral-white-base/10"
                    >
                      {Icon && <Icon />}
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col gap-4 md:grow">
              <p className="body1-regular md:body1-regular text-neutral-white-base">
                {settings.newsletterTitle}
              </p>
              <div>
                <Form.Root
                  action=""
                  className="flex w-full flex-col gap-4 max-w-md"
                >
                  <Form.Field name="email" className="flex flex-col gap-2">
                    <Form.Label className="text-sm text-[#999D9F] md:text-base">
                      <p className="body1-semibold md:body1-semibold text-neutral-grey-base">
                        {settings.newsletterLabel}
                      </p>
                    </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder={settings.newsletterPlaceholder}
                      required
                      className="w-full rounded-[9px] border border-[rgba(245,245,245,0.5)] bg-[#010101] px-5 py-3 text-base text-[#F5F5F5] placeholder-[#999D9F] outline-none transition duration-300 focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
                    />
                    {/* The `match` rules are wiring and stay in code; the
                        wording is editable. */}
                    <Form.Message
                      match="valueMissing"
                      className="text-xs text-primary-pink-base"
                    >
                      {settings.newsletterRequiredMessage}
                    </Form.Message>
                    <Form.Message
                      match="typeMismatch"
                      className="text-xs text-primary-pink-base"
                    >
                      {settings.newsletterInvalidMessage}
                    </Form.Message>
                  </Form.Field>

                  <Form.Submit className="mt-2 w-fit rounded-full border border-white px-6 py-2 text-sm font-semibold text-white transition duration-300 ease-out hover:bg-white hover:text-pink-500">
                    {settings.newsletterSubmitLabel}
                  </Form.Submit>
                </Form.Root>
              </div>
            </div>
          </div>

          <div className="flex flex-col-reverse md:flex-row md:justify-between max-md:gap-10 mt-6">
            <p className="uppercase body3-regular text-neutral-white-base opacity-65 text-center">
              {settings.copyright}
            </p>
            <div className="flex flex-col md:flex-row gap-8 md:gap-10 items-center body3-semibold text-neutral-white-base">
              {settings.legalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.target}
                  rel={link.rel}
                  className="transition ease-out duration-300 hover:text-primary-pink-base hover:border-b hover:border-primary-pink-base"
                >
                  <FaUpRightFromSquare className="mr-1 inline" />
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
