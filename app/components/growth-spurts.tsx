import Image from "next/image";
import ShowAllArrow from "./icons/show-all-arrow";

const growthCards = [
  {
    imgSrc: "/bersama-grab.webp",
    alt: "Going from Mengapa to Mantap Bersama Grab",
    label: "Going from Mengapa to Mantap Bersama Grab",
    description: "Malaysia Effie and Kancil winner",
  },
  {
    imgSrc: "/unifi-business.webp",
    alt: "Unifi Business: Unibizity",
    label: "Unifi Business: Unibizity",
    description: "345% increase in brand engagement",
  },
  {
    imgSrc: "/malaysia-airlines.webp",
    alt: "Malaysia Airlines: Windows of Hospitality",
    label: "Malaysia Airlines: Windows of Hospitality",
    description: "Multi-country roll out",
  },
  {
    imgSrc: "/digital-ecosystem.webp",
    alt: "U Mobile: Digital Ecosystem Refresh",
    label: "U Mobile: Digital Ecosystem Refresh",
    description: "55% increase in conversion rate",
  },
];

export default function GrowthSpurts() {
  return (
    <section className="reveal mt-[80px] md:mt-[100px]">
      <div className="generic-container">
        <div className="flex justify-between items-center mb-8 md:mb-12">
          <div className="flex flex-col gap-3 md:gap-4">
            <h2 className="heading-h2-extrabold text-neutral-white-base">
              Growth Spurts
            </h2>
            <p className="body1-regular text-neutral-white-base" />
          </div>
          <a
            className="group outline-none"
            href="https://www.growthops.asia/work"
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
          <div className="flex justify-between gap-5 group/gallery">
            {growthCards.map((card, index) => (
              <div
                key={card.label}
                className={`swiper-slide relative overflow-hidden cursor-pointer w-[277px] transition duration-500 ease-out ${
                  index === 0 ? "opacity-100" : "opacity-50"
                } group-has-[:hover]/gallery:opacity-40 group-has-[:hover]/gallery:blur-[2px] hover:!opacity-100 hover:!blur-none`}
              >
                <div className="opacity-0 absolute inset-0 w-full h-full bg-neutral-black-light/70 backdrop-blur-sm z-20 transition duration-300 ease-out pointer-events-none" />
                <div className="flex flex-col gap-3 md:gap-4 justify-center">
                  <div className="relative aspect-[3/5] rounded-[20px] overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-neutral-black-light pointer-events-none" />
                    <Image
                      src={card.imgSrc}
                      alt={card.alt}
                      fill
                      sizes="277px"
                      className="object-cover"
                      priority
                    />
                  </div>
                  <p className="text-neutral-white-base card__label text-left md:body1-semibold body3-semibold">
                    {card.label}
                  </p>
                  <div className="card__description flex gap-2 items-center">
                    <i className="fa-solid fa-circle-check text-sm text-primary-pink-base" />
                    <p className="text-neutral-white-base body3-regular">
                      {card.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Video lightbox overlay (static markup only, no interactivity) */}
      <div
        className="h-screen w-full fixed transition duration-700 ease-in-out top-0 left-0 _header__overlay_4b1x2_14 opacity-0 pointer-events-none"
        style={{ zIndex: 99 }}
      >
        <button className="fixed top-[24px] md:top-[40px] right-0 mr-6 md:mr-20 flex text-2xl md:text-4xl justify-center items-center">
          <i className="fa-solid fa-xmark" />
        </button>
        <div className="generic-container h-full md:w-[90%] flex flex-col gap-6 justify-center items-center">
          <video
            className="w-full aspect-auto md:aspect-video bg-neutral-black-base"
            preload="auto"
            autoPlay
            controls
          >
            <source type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="w-full flex flex-col gap-1 md:gap-2" />
        </div>
      </div>
    </section>
  );
}
