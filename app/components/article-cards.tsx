import ShowAllArrow from "./icons/show-all-arrow";

const articles = [
  {
    href: "https://www.growthops.asia/signals-in-the-noise-winning-in-malaysia-mature-telco-market",
    imgSrc:
      "/placeholder.svg",
    alt: "Signals in the Noise: Winning in Malaysia’s Mature Telco Market",
    tag: "Whitepaper",
    title: "Signals in the Noise: Winning in Malaysia’s Mature Telco Market",
    date: "October 2022",
  },
  {
    href: "https://www.growthops.asia/asean-consumer-telco-landscape-2024",
    imgSrc:
      "/placeholder.svg",
    alt: "The ASEAN Consumers Telco Experience",
    tag: "Whitepaper",
    title: "The ASEAN Consumers Telco Experience",
    date: "October 2024",
  },
  {
    href: "https://www.growthops.asia/asean-b2b-consumer-telco-landscape-2024",
    imgSrc:
      "/placeholder.svg",
    alt: "The ASEAN SME Telco Experience",
    tag: "Whitepaper",
    title: "The ASEAN SME Telco Experience",
    date: "October 2024",
  },
  {
    href: "https://www.growthops.asia/asean-fsi-landscape-2024",
    imgSrc:
      "/placeholder.svg",
    alt: "A Perspective on ASEAN Banks Digital Transformation: Efforts and Opportunities",
    tag: "Whitepaper",
    title:
      "A Perspective on ASEAN Banks Digital Transformation: Efforts and Opportunities",
    date: "January 2024",
  },
  {
    href: "https://www.growthops.asia/banking-to-asean-individuals-2024",
    imgSrc:
      "/placeholder.svg",
    alt: "Banking to ASEAN Individuals",
    tag: "Whitepaper",
    title: "Banking to ASEAN Individuals",
    date: "June 2024",
  },
  {
    href: "https://www.growthops.asia/banking-to-asean-smes-2024",
    imgSrc: "/placeholder.svg",
    alt: "Banking to ASEAN SMEs by GrowthOps Asia",
    tag: "Whitepaper",
    title: "Banking to ASEAN SMEs",
    date: "May 2024",
  },
  {
    href: "https://www.growthops.asia/post/2024-marketing-trends-how-technology-is-transforming-creativity",
    imgSrc: "/placeholder.svg",
    alt: "2024 Marketing Trends: How Technology Is Transforming Creativity",
    tag: "Perspective",
    title: "2024 Marketing Trends: How Technology Is Transforming Creativity",
    date: "December 2023",
  },
  {
    href: "https://www.growthops.asia/post/how-ministries-can-create-compelling-social-media-content-to-engage-singaporeans-0",
    imgSrc:
      "/placeholder.svg",
    alt: "How generative AI is impacting the creative industry",
    tag: "Insight",
    title: "How generative AI is impacting the creative industry",
    date: "May 2023",
  },
  {
    href: "https://www.growthops.asia/post/how-ministries-can-create-compelling-social-media-content-to-engage-singaporeans",
    imgSrc: "/placeholder.svg",
    alt: "How Ministries Can Create Compelling Social Media Content to Engage Singaporeans",
    tag: "Insight",
    title:
      "How Ministries Can Create Compelling Social Media Content to Engage Singaporeans",
    date: "February 2023",
  },
  {
    href: "https://www.growthops.asia/post/time-to-reimagine-talent-retention-marketing-agencies-need-to-rethink-adapt-and-evolve",
    imgSrc: "/placeholder.svg",
    alt: "Time to Reimagine Talent Retention: Marketing Agencies Need to Rethink, Adapt and Evolve",
    tag: "Perspective",
    title:
      "Time to Reimagine Talent Retention: Marketing Agencies Need to Rethink, Adapt and Evolve",
    date: "February 2023",
  },
];

export default function ArticleCards() {
  return (
    <section className="reveal mt-[80px] >md:mt-[100px]">
      <div className="generic-container">
        <div className="flex justify-between items-center mb-8 >md:mb-12">
          <h2 className="heading-h2-extrabold text-neutral-white-base">
            Accelerate Your Learning Curve
          </h2>
          <a className="group" href="https://www.growthops.asia/post" target="_self" rel="">
            <div className="flex items-center gap-5">
              <p className="md:hidden body1-semibold text-neutral-white-base group-hover:text-primary-pink-base transition duration-300 ease-out">
                Show all
              </p>
              <ShowAllArrow />
            </div>
          </a>
        </div>

        <div className="relative">
          <div className="swiper__prev absolute left-[-28px] top-1/2 text-neutral-white-base text-2xl opacity-60 hover:opacity-100 z-20 cursor-pointer aria-disabled:hidden md:hidden transition duration-300 ease-out">
            <i className="fa-solid fa-angle-left" />
          </div>
          <div className="swiper__next absolute right-[-28px] top-1/2 text-neutral-white-base text-2xl opacity-60 hover:opacity-100 z-20 cursor-pointer aria-disabled:hidden md:hidden transition duration-300 ease-out">
            <i className="fa-solid fa-angle-right" />
          </div>
          <div className="flex gap-[18px] >md:gap-8 overflow-x-auto">
            {articles.map((article) => (
              <a
                key={article.href}
                href={article.href}
                target="_self"
                rel=""
                className="w-64 shrink-0"
              >
                <div className="group cursor-pointer h-full bg-tansparent hover:bg-gradient-to-r from-primary-pink-extradark to-primary-pink-light transition ease-out duration-300 rounded-xl p-[1.5px]">
                  <div className="h-full bg-neutral-black-light rounded-xl">
                    <div className="h-full p-4 pb-6 flex flex-col gap-3 >md:gap-4 bg-neutral-white-base/[0.08] group-hover:bg-neutral-white-base/[0.04] rounded-xl transition ease-out duration-300">
                      <div className="relative max-h-[228px] >md:max-h-[250px] rounded-xl overflow-hidden">
                        <div className="absolute bottom-0 left-0 bg-primary-pink-base rounded-tr-lg z-20">
                          <p className="body3-bold >md:body2-bold px-3">
                            {article.tag}
                          </p>
                        </div>
                        <img
                          loading="lazy"
                          src={article.imgSrc}
                          alt={article.alt}
                          className="h-full w-full object-cover group-hover:scale-110 transition ease-out duration-300"
                        />
                      </div>
                      <p className="text-left text-neutral-white-base body3-semibold >md:body1-semibold">
                        {article.title}
                      </p>
                      <p className=">md:body2-regular body3-regular">
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
