import Image from "next/image";

import type { CultureCardData } from "@/content/types";

/** Award artwork, printed for a light background, so it gets the white circle. */
function BadgeArtwork({ card }: { card: CultureCardData }) {
  return (
    <div className="relative aspect-square h-full overflow-hidden rounded-full bg-white">
      <Image
        src={card.image}
        alt={card.alt ?? ""}
        fill
        sizes="260px"
        className="object-contain p-5 md:p-6"
      />
    </div>
  );
}

/** A flat pictogram over the dark card, with its name set underneath. The
 *  label is the visible text, so the image itself is decorative. */
function IconArtwork({ card }: { card: CultureCardData }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6 px-4 text-center md:gap-8">
      <div className="relative h-[88px] w-[88px] shrink-0 md:h-[104px] md:w-[104px]">
        <Image
          src={card.image}
          alt={card.alt ?? ""}
          fill
          sizes="104px"
          className="object-contain"
        />
      </div>

      {card.label && (
        <p className="text-xl font-extrabold text-white md:text-2xl">
          {card.label}
        </p>
      )}
    </div>
  );
}

export function CultureCard({ card }: { card: CultureCardData }) {
  const tile = (
    <div className="culture-card flex h-[301px] w-[379px] max-w-full cursor-pointer items-center justify-center rounded-[30px] border border-neutral-white-base bg-white/[0.04] p-5 transition duration-300 ease-out hover:shadow-[0_0_20px_4px_rgba(255,51,102,0.48)]">
      {card.variant === "icon" ? (
        <IconArtwork card={card} />
      ) : (
        <BadgeArtwork card={card} />
      )}
    </div>
  );

  if (!card.href) return tile;

  return (
    <a
      href={card.href}
      target="_self"
      className="block w-[379px] max-w-full rounded-[30px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-pink-base"
    >
      {tile}
    </a>
  );
}
