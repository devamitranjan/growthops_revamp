"use client";

import Image from "next/image";
import { useHorizontalScroll } from "../shared/hooks/use-horizontal-scroll";
import { ShowAllLink } from "../shared/components/show-all-links";

const articles = [
  {
    href: "https://www.growthops.asia/signals-in-the-noise-winning-in-malaysia-mature-telco-market",
    imgSrc: "/AccelerateLearningCurve/malaysia-telco-fv2.webp",
    alt: "Signals in the Noise: Winning in Malaysia’s Mature Telco Market",
    tag: "Whitepaper",
    title: "Signals in the Noise: Winning in Malaysia’s Mature Telco Market",
    date: "October 2022",
  },
  {
    href: "https://www.growthops.asia/asean-consumer-telco-landscape-2024",
    imgSrc:
      "/AccelerateLearningCurve/the-asean-b2c-telco-experience-by-goa-&-rakuten insight.webp",
    alt: "The ASEAN Consumers Telco Experience",
    tag: "Whitepaper",
    title: "The ASEAN Consumers Telco Experience",
    date: "October 2024",
  },
  {
    href: "https://www.growthops.asia/asean-b2b-consumer-telco-landscape-2024",
    imgSrc: "/AccelerateLearningCurve/asean-telcos-by Goa-b2b.webp",
    alt: "The ASEAN SME Telco Experience",
    tag: "Whitepaper",
    title: "The ASEAN SME Telco Experience",
    date: "October 2024",
  },
  {
    href: "https://www.growthops.asia/asean-fsi-landscape-2024",
    imgSrc:
      "/AccelerateLearningCurve/perspective-on-asean-banks-digital-t-e-o.webp",
    alt: "A Perspective on ASEAN Banks Digital Transformation",
    tag: "Whitepaper",
    title:
      "A Perspective on ASEAN Banks Digital Transformation: Efforts and Opportunities",
    date: "January 2024",
  },
  {
    href: "https://www.growthops.asia/banking-to-asean-individuals-2024",
    imgSrc: "/AccelerateLearningCurve/banking-to-asean-individuals-by-goa.webp",
    alt: "Banking to ASEAN Individuals",
    tag: "Whitepaper",
    title: "Banking to ASEAN Individuals",
    date: "June 2024",
  },
  {
    href: "https://www.growthops.asia/banking-to-asean-smes-2024",
    imgSrc: "/AccelerateLearningCurve/wp.webp",
    alt: "Banking to ASEAN SMEs by GrowthOps Asia",
    tag: "Whitepaper",
    title: "Banking to ASEAN SMEs",
    date: "May 2024",
  },
  {
    href: "https://www.growthops.asia/post/2024-marketing-trends-how-technology-is-transforming-creativity",
    imgSrc: "/AccelerateLearningCurve/marketing-trends2024.webp",
    alt: "2024 Marketing Trends",
    tag: "Perspective",
    title: "2024 Marketing Trends: How Technology Is Transforming Creativity",
    date: "December 2023",
  },
  {
    href: "https://www.growthops.asia/post/how-ministries-can-create-compelling-social-media-content-to-engage-singaporeans-0",
    imgSrc: "/AccelerateLearningCurve/marketing-trends.webp",
    alt: "How generative AI is impacting the creative industry",
    tag: "Insight",
    title: "How generative AI is impacting the creative industry",
    date: "May 2023",
  },
  {
    href: "https://www.growthops.asia/post/how-ministries-can-create-compelling-social-media-content-to-engage-singaporeans",
    imgSrc: "/AccelerateLearningCurve/digital-mat.webp",
    alt: "How Ministries Can Create Compelling Social Media Content",
    tag: "Insight",
    title:
      "How Ministries Can Create Compelling Social Media Content to Engage Singaporeans",
    date: "February 2023",
  },
  {
    href: "https://www.growthops.asia/post/time-to-reimagine-talent-retention-marketing-agencies-need-to-rethink-adapt-and-evolve",
    imgSrc: "/AccelerateLearningCurve/digital-maturity.webp",
    alt: "Time to Reimagine Talent Retention",
    tag: "Perspective",
    title:
      "Time to Reimagine Talent Retention: Marketing Agencies Need to Rethink, Adapt and Evolve",
    date: "February 2023",
  },
];

export default function ArticleCards() {
  const { scrollRef, canScrollLeft, canScrollRight, scroll } =
    useHorizontalScroll<HTMLDivElement>();

  return (
    <section className="reveal mt-[80px] md:mt-[100px]">
      <div className="mx-auto w-full max-w-[1366px] px-5 md:px-20">
        <div className="mb-8 flex items-center justify-between md:mb-12">
          <h2 className="heading-h2-bold max-w-[300px] text-4xl font-extrabold leading-[1.05] text-white max-md:text-[22px] md:max-w-none md:text-5xl">
            Accelerate Your Learning Curve
          </h2>

          <ShowAllLink link="https://www.growthops.asia/post" />
        </div>

        <div className="relative">
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-[-40px] top-1/2 z-20 -translate-y-1/2 cursor-pointer text-2xl text-white opacity-60 transition duration-300 ease-out hover:opacity-100 max-md:hidden"
              aria-label="Scroll left"
            >
              <i className="fa-solid fa-angle-left" />
            </button>
          )}

          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-[-40px] top-1/2 z-20 -translate-y-1/2 cursor-pointer text-2xl text-white opacity-60 transition duration-300 ease-out hover:opacity-100 max-md:hidden"
              aria-label="Scroll right"
            >
              <i className="fa-solid fa-angle-right" />
            </button>
          )}

          {/* CARDS */}
          <div
            ref={scrollRef}
            className="flex gap-[18px] overflow-x-auto scroll-smooth md:gap-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {articles.map((article) => (
              <a
                key={article.href}
                href={article.href}
                target="_self"
                className="w-60 shrink-0 md:w-[272px]"
              >
                {/* OUTER CARD */}
                <div className="group h-full cursor-pointer rounded-xl bg-transparent p-[1.5px] transition duration-300 ease-out hover:bg-gradient-to-r hover:from-pink-600 hover:to-pink-400">
                  {/* INNER CARD */}
                  <div className="h-full rounded-xl bg-[#111315]">
                    <div className="flex h-full flex-col gap-2 rounded-xl bg-white/[0.04] p-2.5 pb-4 transition duration-300 ease-out group-hover:bg-white/[0.08] md:gap-1">
                      {/* IMAGE */}
                      <div className="relative h-[240px] overflow-hidden rounded-xl md:h-[260px]">
                        {/* TAG */}
                        <div className="absolute bottom-0 left-0 z-20 rounded-tr-lg bg-[#FA3C6F]">
                          <p className="px-3 py-1 text-xs font-bold text-white md:text-sm">
                            {article.tag}
                          </p>
                        </div>

                        <Image
                          src={article.imgSrc}
                          alt={article.alt}
                          fill
                          className="object-cover transition duration-300 ease-out group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, 300px"
                        />
                      </div>

                      {/* TITLE */}
                      <p className="text-left text-base font-semibold text-white md:text-lg">
                        {article.title}
                      </p>

                      {/* DATE */}
                      <p className="text-xs text-white/70 md:text-sm">
                        {article.date}
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
