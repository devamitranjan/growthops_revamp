const socialLinks = [
  {
    href: "https://ph.linkedin.com/company/growthops-asia",
    label: "LinkedIn",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.137 1.445-2.137 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.114 20.452H3.56V9h3.554v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    href: "https://www.facebook.com/growthopsasia",
    label: "Facebook",
    path: "M22 12.06C22 6.505 17.523 2 12 2S2 6.505 2 12.06C2 17.083 5.657 21.245 10.438 22v-7.03H7.898v-2.91h2.54V9.845c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.462h-1.26c-1.243 0-1.63.771-1.63 1.562v1.876h2.773l-.443 2.91h-2.33V22C18.343 21.245 22 17.083 22 12.06z",
  },
  {
    href: "https://www.instagram.com/growthopsasia/",
    label: "Instagram",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.264-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163C8.741 0 8.332.014 7.052.072 2.695.272.273 2.69.073 7.052.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.28.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.668-.072-4.948-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z",
  },
  {
    href: "https://www.youtube.com/@growthopsasia",
    label: "YouTube",
    path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
];

export default function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-[#F5F5F5]/20 text-[#F5F5F5]">
      <div className="mx-auto flex max-w-6xl flex-col gap-[72px] px-6 pb-10 pt-16">
        <div className="flex flex-col items-center justify-center gap-8">
          <div className="flex flex-col items-center gap-1 text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">
              We&apos;re ready to help you
            </h2>
            <h2 className="bg-gradient-to-r from-pink-500 to-fuchsia-500 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
              Grow Unforgettable
            </h2>
          </div>
          <a
            href="https://www.growthops.asia/contact"
            target="_self"
            rel=""
            className="rounded-full bg-pink-600 px-10 py-3 font-semibold text-white transition duration-300 ease-out hover:bg-pink-700"
          >
            Let&apos;s chat
          </a>
        </div>

        <div>
          <div className="flex flex-col gap-10 rounded-[20px] bg-[#F5F5F5]/10 px-6 pt-8 pb-10 md:flex-row md:px-16 md:py-10">
            <div className="flex flex-col gap-6 md:basis-3/5">
              <div className="flex flex-col gap-4">
                <p className="text-sm text-[#F5F5F5] md:text-base">
                  Explore More
                </p>
                <div className="flex flex-col gap-3 text-sm font-semibold text-[#F5F5F5] md:text-base">
                  <a
                    href="https://www.opus.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-fit transition duration-300 ease-out hover:text-pink-500"
                  >
                    Applied AI
                  </a>
                  <a
                    href="https://www.growthops.asia/newsroom"
                    target="_self"
                    rel=""
                    className="w-fit transition duration-300 ease-out hover:text-pink-500"
                  >
                    Newsroom
                  </a>
                  <a
                    href="https://www.growthops.asia/contact"
                    target="_self"
                    rel="noopener noreferrer"
                    className="w-fit transition duration-300 ease-out hover:text-pink-500"
                  >
                    Join Us
                  </a>
                </div>
              </div>
              <div className="flex gap-8">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full text-[#F5F5F5] transition duration-300 ease-out hover:bg-[#F5F5F5]/10"
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                      <path d={social.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4 md:grow">
              <p className="text-sm text-[#F5F5F5] md:text-base">
                Sign up to our newsletter
              </p>
              <div>
                <p className="mb-2 text-sm font-semibold text-[#999D9F] md:text-base">
                  Email
                </p>
                <div id="footerHubspotForm" />
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col-reverse gap-4 md:flex-row md:items-center md:justify-between md:gap-10">
            <p className="text-center text-xs uppercase text-[#F5F5F5] opacity-50">
              © Copyright GrowthOps. All rights reserved.
            </p>
            <div className="flex flex-col items-center gap-4 text-xs font-semibold text-[#F5F5F5] md:flex-row md:gap-10">
              <a
                href="https://www.growthops.asia/privacy-policy"
                target="_self"
                rel=""
                className="flex items-center gap-1 transition duration-300 ease-out hover:text-pink-500"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                  <path d="M14 3v2h3.586l-9.293 9.293 1.414 1.414L19 6.414V10h2V3h-7zM5 5h6V3H5C3.897 3 3 3.897 3 5v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-6h-2v6H5V5z" />
                </svg>
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
