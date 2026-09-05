import type { IGoodCompanyData } from "@/content/types";

import { GoodCompanyLogo } from "./good-company-logo";

interface GoodCompanyProps {
  data: IGoodCompanyData;
}

export default function GoodCompany({ data }: GoodCompanyProps) {
  return (
    <section className="generic-container reveal good-company-wrapper bg-background">
      <h2 className="mb-2 text-[2.5rem] font-extralight leading-[125%] text-neutral-white-base md:mb-2 md:text-[4rem]">
        {data.title}
      </h2>
      <div className="py-16 md:py-24">
        <div className="flex flex-col gap-12 md:flex-row md:gap-16 lg:gap-24">
          <div className="md:w-2/5 lg:w-1/3">
            {data.eyebrow && (
              <p className="body2-semibold md:body1-semibold mb-3 text-primary-pink-base md:mb-4">
                {data.eyebrow}
              </p>
            )}

            <p className="text-[1.3333rem] font-light leading-[180%] text-[#b1b3b6]">
              {data.description}
            </p>
          </div>
          <div className="md:w-3/5 lg:w-2/3">
            <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 md:grid-cols-4 md:gap-x-10 md:gap-y-14">
              {data.logos.map((slot, index) => (
                <GoodCompanyLogo key={slot.id} slot={slot} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
