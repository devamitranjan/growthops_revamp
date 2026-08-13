export default function SiteFooter() {
  return (
    <footer className="border-t border-neutral-white-base/20 mt-24">
      <div className="generic-container pt-16 pb-10 flex flex-col gap-[72px]">
        <div className="flex flex-col gap-10 justify-center items-center">
          <div className="flex flex-col gap-2 items-center">
            <h2 className="heading-h1-bold text-neutral-white-base text-center">
              We&apos;re ready to help you
            </h2>
            <h2 className="heading-h1-bold text-center _gradient_1kflj_1">
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
          <div className="pt-8 px-6 pb-10 >md:px-16 >md:py-10 rounded-[20px] bg-neutral-white-base/10 flex md:flex-col gap-16 >md:gap-8">
            <div className="flex flex-col gap-6 >md:basis-3/5">
              <div className="flex flex-col gap-4">
                <p className="body2-regular >md:body1-regular text-neutral-white-base">
                  Explore More
                </p>
                <div className="flex flex-col gap-3 body2-semibold >md:body1-semibold text-neutral-white-base">
                  <a
                    href="https://www.opus.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-fit transition ease-out duration-300 hover:text-primary-pink-base hover:border-b hover:border-primary-pink-base"
                  >
                    Applied AI
                  </a>
                  <a
                    href="https://www.growthops.asia/newsroom"
                    target="_self"
                    rel=""
                    className="w-fit transition ease-out duration-300 hover:text-primary-pink-base hover:border-b hover:border-primary-pink-base"
                  >
                    Newsroom
                  </a>
                  <a
                    href="https://www.growthops.asia/contact"
                    target="_self"
                    rel="noopener noreferrer"
                    className="w-fit transition ease-out duration-300 hover:text-primary-pink-base hover:border-b hover:border-primary-pink-base"
                  >
                    Join Us
                  </a>
                </div>
              </div>
              <div className="flex gap-8">
                <a
                  href="https://ph.linkedin.com/company/growthops-asia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 flex justify-center items-center rounded-full text-xl text-white transition ease-out duration-300 hover:bg-neutral-white-base/10"
                >
                  <i className="fa-brands fa-linkedin-in" />
                </a>
                <a
                  href="https://www.facebook.com/growthopsasia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 flex justify-center items-center rounded-full text-xl text-white transition ease-out duration-300 hover:bg-neutral-white-base/10"
                >
                  <i className="fa-brands fa-facebook-f" />
                </a>
                <a
                  href="https://www.instagram.com/growthopsasia/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 flex justify-center items-center rounded-full text-xl text-white transition ease-out duration-300 hover:bg-neutral-white-base/10"
                >
                  <i className="fa-brands fa-instagram" />
                </a>
                <a
                  href="https://www.youtube.com/@growthopsasia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 flex justify-center items-center rounded-full text-xl text-white transition ease-out duration-300 hover:bg-neutral-white-base/10"
                >
                  <i className="fa-brands fa-youtube" />
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-4 >md:grow">
              <p className="body2-regular >md:body1-regular text-neutral-white-base">
                Sign up to our newsletter
              </p>
              <div>
                <p className="body2-semibold >md:body1-semibold text-neutral-grey-base mb-2">
                  Email
                </p>
                <div id="footerHubspotForm" />
              </div>
            </div>
          </div>

          <div className="flex flex-col-reverse >md:flex-row >md:justify-between md:gap-10 mt-6">
            <p className="uppercase body3-regular text-neutral-white-base opacity-50 text-center">
              © Copyright GrowthOps. All rights reserved.
            </p>
            <div className="flex flex-col >md:flex-row gap-8 >md:gap-10 items-center body3-semibold text-neutral-white-base">
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
