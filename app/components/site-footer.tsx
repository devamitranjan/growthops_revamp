"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    hbspt?: {
      forms: {
        create: (options: Record<string, string>) => void;
      };
    };
  }
}

const exploreLinks = [
  {
    label: "Applied AI",
    href: "https://www.opus.com/",
    target: "_blank",
    rel: "noopener noreferrer",
  },
  {
    label: "Newsroom",
    href: "https://www.growthops.asia/newsroom",
    target: "_self",
    rel: "",
  },
  {
    label: "Join Us",
    href: "https://www.growthops.asia/contact",
    target: "_self",
    rel: "noopener noreferrer",
  },
];

const socials = [
  {
    href: "https://ph.linkedin.com/company/growthops-asia",
    icon: "fa-brands fa-linkedin-in",
    label: "LinkedIn",
  },
  {
    href: "https://www.facebook.com/growthopsasia",
    icon: "fa-brands fa-facebook-f",
    label: "Facebook",
  },
  {
    href: "https://www.instagram.com/growthopsasia/",
    icon: "fa-brands fa-instagram",
    label: "Instagram",
  },
  {
    href: "https://www.youtube.com/@growthopsasia",
    icon: "fa-brands fa-youtube",
    label: "YouTube",
  },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-neutral-white-base/20 mt-24">
      <div className="generic-container pt-16 pb-10 flex flex-col gap-[72px]">
        <div className="flex flex-col gap-10 justify-center items-center">
          <div className="flex flex-col gap-2 items-center">
            <h2 className="heading-h1-bold text-neutral-white-base text-center">
              We&apos;re ready to help you
            </h2>
            <h2 className="heading-h1-bold text-center gradient-text">
              Grow Unforgettable
            </h2>
          </div>
          <a
            href="https://www.growthops.asia/contact"
            target="_self"
            rel=""
            className="rounded-[40px] bg-primary-pink-base hover:bg-primary-pink-extradark text-white body2-bold px-10 py-3 transition ease-out duration-300"
          >
            Let&apos;s chat
          </a>
        </div>

        <div>
          <div className="flex pt-8 px-6 pb-10 md:px-16 md:py-10 rounded-[20px] bg-neutral-white-base/10 flex max-md:flex-col gap-16 md:gap-8">
            <div className="flex flex-col gap-6 md:basis-3/5">
              <div className="flex flex-col gap-4">
                <p className="body1-regular md:body1-regular text-neutral-white-base">
                  Explore More
                </p>
                <div className="flex flex-col gap-3 body1-semibold md:body1-semibold text-neutral-white-base">
                  {exploreLinks.map((link) => (
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
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="h-10 w-10 flex justify-center items-center rounded-full text-xl text-white transition ease-out duration-300 hover:bg-neutral-white-base/10"
                  >
                    <i className={social.icon} />
                  </a>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4 md:grow">
              <p className="body1-regular md:body1-regular text-neutral-white-base">
                Sign up to our newsletter
              </p>
              <div>
                <form className="flex w-full flex-col gap-4 max-w-sm">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="emailInput"
                      className="text-sm text-[#999D9F] md:text-base"
                    >
                      <p className="body1-semibold md:body1-semibold text-neutral-grey-base mb-2">
                        Email
                      </p>
                    </label>
                    <input
                      id="emailInput"
                      type="email"
                      placeholder="Enter your email*"
                      required
                      className="w-full rounded-lg border border-gray-600 bg-black px-4 py-3.5 text-sm text-[#F5F5F5] placeholder-[#999D9F] outline-none transition duration-300 focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-2 w-fit rounded-full border border-white px-6 py-2 text-sm font-semibold text-white transition duration-300 ease-out hover:bg-white hover:text-pink-500"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="flex flex-col-reverse md:flex-row md:justify-between max-md:gap-10 mt-6">
            <p className="uppercase body3-regular text-neutral-white-base opacity-50 text-center">
              © Copyright GrowthOps. All rights reserved.
            </p>
            <div className="flex flex-col md:flex-row gap-8 md:gap-10 items-center body3-semibold text-neutral-white-base">
              <a
                href="https://www.growthops.asia/privacy-policy"
                target="_self"
                rel=""
                className="transition ease-out duration-300 hover:text-primary-pink-base hover:border-b hover:border-primary-pink-base"
              >
                <i className="fa-solid fa-up-right-from-square mr-1" />
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
