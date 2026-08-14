"use client";

import Image from "next/image";
import { Dialog } from "radix-ui";
import { SectionHeader } from "../../shared/components/section-header";
import { VideoDialogPortal } from "../../shared/components/video-dialog-portal";

const growthCards = [
  {
    imgSrc: "/growth-spurts/bersama-grab.webp",
    alt: "Going from Mengapa to Mantap Bersama Grab",
    label: "Going from Mengapa to Mantap Bersama Grab",
    description: "Malaysia Effie and Kancil winner",
  },
  {
    imgSrc: "/growth-spurts/unifi-business.webp",
    alt: "Unifi Business: Unibizity",
    label: "Unifi Business: Unibizity",
    description: "345% increase in brand engagement",
  },
  {
    imgSrc: "/growth-spurts/malaysia-airlines.webp",
    alt: "Malaysia Airlines: Windows of Hospitality",
    label: "Malaysia Airlines: Windows of Hospitality",
    description: "Multi-country roll out",
  },
  {
    imgSrc: "/growth-spurts/digital-ecosystem.webp",
    alt: "U Mobile: Digital Ecosystem Refresh",
    label: "U Mobile: Digital Ecosystem Refresh",
    description: "55% increase in conversion rate",
  },
];

export default function GrowthSpurts() {
  return (
    <section className="reveal mt-[80px] md:mt-[100px]">
      <div className="generic-container">
        <SectionHeader
          title="Growth Spurts"
          titleClassName="heading-h2-extrabold text-neutral-white-base"
          subtitle={<p className="body1-regular text-neutral-white-base" />}
          link="https://www.growthops.asia/work"
        />

        <div className="relative">
          <Dialog.Root>
            <div className="flex justify-between gap-5 group/gallery">
              {growthCards.map((card) => (
                <Dialog.Trigger
                  key={card.label}
                  className="swiper-slide relative overflow-hidden cursor-pointer w-[277px] text-left transition duration-500 ease-out opacity-100 group-has-[:hover]/gallery:opacity-40 group-has-[:hover]/gallery:blur-[2px] hover:!opacity-100 hover:!blur-none"
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
                </Dialog.Trigger>
              ))}
            </div>

            <VideoDialogPortal
              title="Growth spurt video"
              videoProps={{ autoPlay: true }}
            >
              <source type="video/mp4" />
            </VideoDialogPortal>
          </Dialog.Root>
        </div>
      </div>
    </section>
  );
}
