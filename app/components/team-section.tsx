export default function TeamSection() {
  return (
    <section className="reveal mt-[80px] >md:mt-[100px]">
      <div className="generic-container">
        <h2 className="heading-h2-extrabold text-neutral-white-base mb-8 >md:mb-12">
          Meet Our GOGetters
        </h2>
        <div className="team-card-wrapper flex flex-col >md:flex-row gap-6 >md:gap-8">
          <div className="relative h-auto w-full >md:w-1/4 px-5 py-8 bg-primary-blue-dark/[0.2] overflow-hidden">
            <div className="relative flex flex-col justify-center h-full z-10">
              <div className="mb-6 >md:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary-blue-light to-primary-blue-dark">
                <p className="heading-headline">+250</p>
                <p className="body1-semibold">
                  team members embracing our #GrowTogether culture
                </p>
              </div>
              <a
                href="https://www.growthops.asia/culture"
                target="_self"
                rel=""
                className="rounded-[40px] bg-transparent hover:bg-neutral-white-base text-white hover:text-primary-pink-base body2-bold border border-neutral-white-base px-6 py-2 w-fit transition ease-out duration-300"
              >
                Learn more
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
