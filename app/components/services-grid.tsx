const services = [
  {
    href: "https://www.growthops.asia/digital-first-creative",
    imgSrc: "/placeholder.svg",
    alt: "Digital-First Creative",
    overlayColor: "bg-primary-cyan-base",
  },
  {
    href: "https://www.growthops.asia/performance-marketing-and-analytics",
    imgSrc: "/placeholder.svg",
    alt: "Performance Marketing",
    overlayColor: "bg-primary-pink-base",
  },
  {
    href: "https://www.growthops.asia/marketing-technology",
    imgSrc: "/placeholder.svg",
    alt: "Marketing Technology",
    overlayColor: "bg-primary-blue-dark",
  },
  {
    href: "https://www.growthops.asia/experience-strategy-and-design",
    imgSrc:
      "/placeholder.svg",
    alt: "Experience Strategy and Design",
    overlayColor: "bg-primary-yellow-extradark",
  },
  {
    href: "https://www.growthops.asia/fsi-tech",
    imgSrc: "/placeholder.svg",
    alt: "FSI-Technology",
    overlayColor: "bg-primary-blue-extradark",
  },
  {
    href: "https://www.growthops.asia/research-insights-and-strategy",
    imgSrc:
      "/placeholder.svg",
    alt: "Research, Insights and Strategy ",
    overlayColor: "bg-primary-cyan-base",
  },
];

export default function ServicesGrid() {
  return (
    <section className="reveal mt-[80px] md:mt-[100px]">
      <div className="generic-container">
        <h2 className="heading-h2-extrabold text-neutral-white-base mb-8 md:mb-12">
          Our Services
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-5">
          {services.map((service) => (
            <a key={service.href} href={service.href} target="_self" rel="">
              <div className="group cursor-pointer bg-tansparent p-[1.5px] h-full transition ease-out duration-300 rounded-[20px]">
                <div className="py-3 md:px-3 flex-col gap-3 md:gap-4 justify-center bg-neutral-black-light h-full flex items-center border-neutral-white-base border rounded-[30px] transition ease-out duration-300 hover:bg-primary-cyan-extradark">
                  <div className="relative h-18 w-18 md:w-[120px] md:h-[120px] rounded-full overflow-hidden">
                    <div
                      className={`absolute top-0 left-0 w-full h-full opacity-80 mix-blend-color ${service.overlayColor} z-20`}
                    />
                    <img
                      src={service.imgSrc}
                      alt={service.alt}
                      className="h-full w-full object-cover group-hover:scale-110 transition ease-out duration-300"
                    />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
