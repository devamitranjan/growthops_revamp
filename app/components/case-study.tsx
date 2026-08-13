const caseStudySlides = [
  { label: "Unifi: Wedding Crashers", bg: "/placeholder.svg" },
  { label: "CelcomDigi: Dari Mata Kita", bg: "/placeholder.svg" },
  { label: "Unifi Device Fiesta", bg: "/placeholder.svg" },
  { label: "Gen Unifi", bg: "/placeholder.svg" },
  { label: "Taylor's University: Ignite Your Passion", bg: "/placeholder.svg" },
  { label: "Grab: Greater with Grab", bg: "/placeholder.svg" },
  { label: "Shell 135 Years", bg: "/placeholder.svg" },
];

export default function CaseStudy() {
  return (
    <section className="reveal case-study-wrapper">
      <div
        className="relative pb-[40px] h-[800px] w-full bg-cover bg-center transition duration-300 ease-out"
        style={{
          backgroundImage: "url('/placeholder.svg')",
        }}
      >
        <div className="absolute w-full h-full top-0 left-0 bg-gradient-to-b from-neutral-black-base to-transparent to-80%" />
        <div className="absolute w-full h-full top-0 left-0 bg-gradient-to-r from-neutral-black-base to-transparent to-60% shadow-[inset_0px_5px_20px_rgb(7,12,15)]" />

        <div className="relative generic-container h-full w-full flex flex-col justify-center z-10">
          <div className="md:w-1/2">
            <div className="content-wrapper flex flex-col">
              <p className="body2-semibold md:body1-semibold mb-2">
                Unforgettable Digital Experience
              </p>
              <p className="heading-h2-extrabold mb-3 md:mb-4">
                Shell: Quest 2.0
              </p>
              <p className="body2-regular md:body1-regular mb-8 md:mb-10" />
              <button className="scroll-text-cta rounded-[40px] bg-transparent hover:bg-neutral-white-base text-white hover:text-primary-pink-base body2-bold border border-neutral-white-base px-10 py-3 w-fit transition ease-out duration-300">
                Explore more
              </button>
            </div>
          </div>

          <div className="swiper-wrapper generic-container absolute w-full left-0 bottom-0 z-10">
            <div className="flex gap-[18px] md:gap-8 overflow-x-auto">
              {/* Slide 1: Shell Quest 2.0 - video preview */}
              <div className="group relative aspect-video w-72 shrink-0 flex flex-col justify-end rounded-xl overflow-hidden p-4 shadow-lg cursor-pointer bg-cover bg-center bg-[url('/placeholder.svg')]">
                <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center z-30">
                  <span className="text-neutral-white-base body3-semibold md:body1-semibold z-40">
                    Watch now
                  </span>
                  <div className="absolute bottom-0 left-0 w-full bg-transparent rounded-full h-1 z-40">
                    <div className="bg-gradient-to-r from-primary-pink-light to-primary-orange-light h-1 rounded-full" />
                  </div>
                  <video
                    className="absolute top-0 left-0 w-full h-full"
                    preload="auto"
                    muted
                    loop
                    playsInline
                    poster="/placeholder.svg"
                  >
                    Your browser does not support the video tag.
                  </video>
                  <div className="absolute top-0 left-0 w-full h-full mix-blend-multiply backdrop-blur-[1px] bg-neutral-black-base opacity-80" />
                </div>
                <div className="absolute top-0 left-0 w-full h-full backdrop-blur-[1px] bg-gradient-to-r from-primary-pink-extradark to-primary-pink-light opacity-0 transition duration-300 ease-out" />
                <p className="card__label text-left text-neutral-white-base body3-semibold md:body1-semibold z-20">
                  Shell: Quest 2.0
                </p>
              </div>

              {caseStudySlides.map((slide) => (
                <div
                  key={slide.label}
                  className="group relative aspect-video w-72 shrink-0 flex flex-col justify-end rounded-xl overflow-hidden p-4 shadow-lg cursor-pointer bg-cover bg-center"
                  style={{ backgroundImage: `url('${slide.bg}')` }}
                >
                  <div className="absolute top-0 left-0 w-full h-full backdrop-blur-[1px] bg-gradient-to-r from-primary-pink-extradark to-primary-pink-light opacity-0 group-hover:opacity-40 transition duration-300 ease-out" />
                  <p className="card__label text-left text-neutral-white-base body3-semibold md:body1-semibold z-20">
                    {slide.label}
                  </p>
                </div>
              ))}
            </div>
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
            controls
            poster="/placeholder.svg"
          >
            Your browser does not support the video tag.
          </video>
          <div className="w-full flex flex-col gap-1 md:gap-2" />
        </div>
      </div>
    </section>
  );
}
