import Image from "next/image";

import type { CultureCardData } from "@/content/types";

export function CultureCard({ card }: { card: CultureCardData }) {
  const tile = (
    <div className="culture-card flex h-[301px] w-[379px] max-w-full cursor-pointer items-center justify-center rounded-[32px] border border-white/10 bg-white/[0.04] p-5 transition duration-300 ease-out hover:shadow-[0_0_20px_4px_rgba(255,51,102,0.48)]">
      <div className="relative aspect-square h-full overflow-hidden rounded-full bg-white">
        <Image
          src={card.image}
          alt={card.alt}
          fill
          sizes="260px"
          className="object-contain p-5 md:p-6"
        />
      </div>
    </div>
  );

  if (!card.href) return tile;

  return (
    <a
      href={card.href}
      target="_self"
      className="block w-[379px] max-w-full rounded-[32px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-pink-base"
    >
      {tile}
    </a>
  );
}
