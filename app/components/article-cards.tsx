"use client";

import React, { useRef } from "react";
import Image from "next/image";
import ShowAllArrow from "./icons/show-all-arrow";

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
    imgSrc: "/AccelerateLearningCurve/marketing-trends.webp",
    alt: "2024 Marketing Trends",
    tag: "Perspective",
    title: "2024 Marketing Trends: How Technology Is Transforming Creativity",
    date: "December 2023",
  },
  {
    href: "https://www.growthops.asia/post/how-ministries-can-create-compelling-social-media-content-to-engage-singaporeans-0",
    imgSrc: "/AccelerateLearningCurve/2024 Marketing Trends.webp",
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
  const scrollRef = useRef<HTMLDivElement>(null);

  // 2. Add the type "left" | "right" to the direction parameter
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300; // Scroll by roughly one card width
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="reveal mt-[80px] md:mt-[100px]">
      <div className="mx-auto w-full max-w-[1366px] px-5 md:px-20">
        <div className="mb-8 flex items-center justify-between md:mb-12">
          <h2 className="heading-h2-bold text-4xl font-extrabold text-white md:text-5xl">
            Accelerate Your Learning Curve
          </h2>
          <a
            className="group outline-none"
            href="https://www.growthops.asia/post"
            target="_self"
            rel=""
          >
            <div className="flex items-center gap-5">
              <p className="max-md:hidden body1-semibold text-neutral-white-base group-hover:text-primary-pink-base transition duration-300 ease-out">
                Show all
              </p>
              <ShowAllArrow />
            </div>
          </a>
        </div>

        <div className="relative">
          {/* 4. Added onClick handlers to buttons and centered them vertically */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-[-40px] top-1/2 z-20 -translate-y-1/2 cursor-pointer text-2xl text-white opacity-60 transition duration-300 ease-out hover:opacity-100 max-md:hidden"
            aria-label="Scroll left"
          >
            <i className="fa-solid fa-angle-left" />
          </button>

          <button
            onClick={() => scroll("right")}
            className="absolute right-[-40px] top-1/2 z-20 -translate-y-1/2 cursor-pointer text-2xl text-white opacity-60 transition duration-300 ease-out hover:opacity-100 max-md:hidden"
            aria-label="Scroll right"
          >
            <i className="fa-solid fa-angle-right" />
          </button>

          {/* 5. Added ref and CSS classes to hide the scrollbar */}
          <div
            ref={scrollRef}
            className="flex gap-[18px] overflow-x-auto scroll-smooth md:gap-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {articles.map((article) => (
              <a
                key={article.href}
                href={article.href}
                target="_self"
                className="w-72 shrink-0 md:w-80" // Slightly widened cards to match your UI image proportions
              >
                <div className="group h-full cursor-pointer rounded-xl bg-transparent p-[1.5px] transition duration-300 ease-out hover:bg-gradient-to-r hover:from-pink-600 hover:to-pink-400">
                  <div className="h-full rounded-xl bg-[#111315]">
                    <div className="flex h-full flex-col gap-3 rounded-xl bg-white/[0.04] p-4 pb-6 transition duration-300 ease-out group-hover:bg-white/[0.08] md:gap-4">
                      <div className="relative h-[228px] overflow-hidden rounded-xl md:h-[250px]">
                        <div className="absolute bottom-0 left-0 z-20 rounded-tr-lg bg-[#FA3C6F]">
                          <p className="px-3 py-1 text-xs font-bold text-white md:text-sm">
                            {article.tag}
                          </p>
                        </div>
                        {/* 6. Upgraded to Next.js Image Component */}
                        <Image
                          src={article.imgSrc}
                          alt={article.alt}
                          fill
                          className="object-cover transition duration-300 ease-out group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, 300px"
                        />
                      </div>

                      <p className="text-left text-base font-semibold text-white md:text-lg">
                        {article.title}
                      </p>
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
