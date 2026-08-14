const stats = [
  {
    stat: "817%",
    description: "increase in organic traffic with SEO services",
  },
  {
    stat: "100%",
    description: "increase in conversion with paid media services",
  },
  {
    stat: "180%",
    description: "improvement in brand sentiment with creative services",
  },
  {
    stat: "71%",
    description:
      "reduction in Cost Per Lead with performance marketing services",
  },
  {
    stat: "96%",
    description: "faster campaign launches with platform development services",
    cta: true,
  },
];

export default function UnrivaledGrowth() {
  return (
    <section className="scroll-animation-wrapper generic-conatiner h-screen flex max-md:flex-col justify-center items-center gap-12 md:gap-24 mt-[80px] md:mt-[100px]">
      <div className="scroll-animation-bg absolute top-0 left-0 h-full w-full">
        <div className="h-full w-full bg-gradient-to-r from-primary-pink-extradark to-primary-pink-light" />
      </div>
      <div className="scroll-animation-title heading-h2-extrabold bg-neutral-white-base bg-clip-text text-transparent md:w-full max-md:h-1/2 md:pl-32 flex justify-center max-md:items-end text-center">
        <h2>Unrivaled Growth</h2>
      </div>
      <ul className="rolling-text-wrapper relative h-full w-9/12 md:w-full md:mr-32 invisible overflow-hidden z-10">
        {stats.map((item) => (
          <li
            key={item.stat}
            className="rolling-text inline-block absolute left-0 top-0 md:top-1/2 md:-translate-y-1/2 flex max-md:flex-col gap-4 items-center"
          >
            <p className="heading-h1-extrabold">{item.stat}</p>
            <p className="max-md:text-center md:w-3/5">{item.description}</p>
            {item.cta && (
              <a
                href="https://www.growthops.asia/work"
                target="_self"
                rel=""
                className="scroll-text-cta rounded-[40px] bg-transparent hover:bg-neutral-white-base text-white hover:text-primary-pink-base body2-bold border border-neutral-white-base px-10 py-3 transition ease-out duration-300 inline-block absolute left-1/2 max-md:-translate-x-1/2 md:left-0 -bottom-16 md:-bottom-14 max-md:w-max"
              >
                View more results
              </a>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
