import Image from "next/image";

import type { LogoPairData } from "@/content/types";

/** Cycle length varies slightly per slot so the wall never beats in sync. */
const DURATION_STEPS_S = [5, 6, 7, 8] as const;
/** Stagger so slots don't all cross-fade at the same instant. */
const DELAY_STEP_S = 0.9;

interface GoodCompanyLogoProps {
  /** One slot: two logos cross-fade in place, or one renders statically if
   *  the CMS entry has no second logo. */
  slot: LogoPairData;
  index: number;
}

export function GoodCompanyLogo({ slot, index }: GoodCompanyLogoProps) {
  const { primary, secondary } = slot;
  const durationS = DURATION_STEPS_S[index % DURATION_STEPS_S.length];
  const delayS = -((index * DELAY_STEP_S) % durationS);

  return (
    <div className="good-company-logo relative h-10 w-full md:h-12">
      <Image
        src={primary.src}
        alt={primary.alt}
        fill
        sizes="(min-width: 768px) 160px, 40vw"
        className="good-company-logo__img object-contain object-left"
        style={
          secondary
            ? { animationDuration: `${durationS}s`, animationDelay: `${delayS}s` }
            : undefined
        }
      />
      {secondary && (
        <Image
          src={secondary.src}
          alt={secondary.alt}
          fill
          sizes="(min-width: 768px) 160px, 40vw"
          className="good-company-logo__img good-company-logo__img--alt object-contain object-left"
          style={{ animationDuration: `${durationS}s`, animationDelay: `${delayS}s` }}
        />
      )}
    </div>
  );
}
