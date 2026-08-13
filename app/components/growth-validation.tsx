import ShowAllArrow from "./icons/show-all-arrow";

export default function GrowthValidation() {
  return (
    <section className="reveal mt-[80px] md:mt-[100px]">
      <div className="generic-container">
        <div className="flex justify-between items-center mb-8 md:mb-12">
          <h2 className="heading-h2-extrabold text-neutral-white-base">
            Growth Validation
          </h2>
          <a href="https://www.growthops.asia/awards" target="_self" rel="" className="group">
            <div className="flex items-center gap-5">
              <p className="max-md:hidden body1-semibold text-neutral-white-base group-hover:text-primary-pink-base transition duration-300 ease-out">
                Show all
              </p>
              <ShowAllArrow />
            </div>
          </a>
        </div>

        <div className="relative flex max-md:flex-col h-[415px] w-full bg-gradient-to-b md:bg-gradient-to-r from-primary-blue-extradark via-primary-blue-dark to-primary-cyan-base rounded-[40px] overflow-hidden">
          <div className="md:w-2/5 max-md:h-1/2 flex flex-col justify-center md:pl-16 max-md:px-6 max-md:pt-8">
            <p className="body2-semibold md:body1-semibold mb-1 md:mb-2">
              Southeast Asia&apos;s Best
            </p>
            <p className="heading-h3-bold mb-6 md:mb-8">
              Customer Engagement Agency of the Year by Campaign Asia
            </p>
            <div className="flex gap-4 justify-between md:justify-start">
              <a
                className="aspect-video w-1/2 md:w-40"
                href="https://www.growthops.asia/awards"
                target="_self"
                rel=""
              >
                <div
                  className="group relative h-full rounded-lg p-2 flex flex-col justify-end bg-cover bg-center overflow-hidden"
                  style={{
                    backgroundImage: "url('/placeholder.svg')",
                  }}
                >
                  <div className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-40 bg-gradient-to-r from-primary-pink-extradark to-primary-pink-light transition ease-out duration-300 z-10" />
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-neutral-black-light/80" />
                </div>
              </a>
            </div>
          </div>
          <div className="relative md:w-3/5 max-md:h-1/2">
            <img
              src="/placeholder.svg"
              alt="Customer Engagement Agency of the Year by Campaign Asia"
              className="absolute bottom-0 object-cover w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
