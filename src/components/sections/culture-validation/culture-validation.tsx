import type { ICultureValidationData } from "@/content/types";

import { CultureCard } from "./culture-card";

export default function CultureValidation({
  data,
}: {
  data: ICultureValidationData;
}) {
  return (
    <section className="reveal mt-[80px] pb-[80px] md:mt-[100px] md:pb-[100px]">
      <div className="generic-container">
        <h2 className="heading-h2-bold mb-8 text-4xl font-extrabold text-white md:mb-12 md:text-5xl">
          {data.title}
        </h2>

        <div className="flex flex-wrap gap-6 max-sm:justify-center md:gap-8">
          {data.cards.map((card) => (
            <CultureCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
