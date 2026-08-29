"use client";

import { FaPlus } from "react-icons/fa6";
import { Accordion } from "radix-ui";

import type { IFaqData } from "@/content/types";
import { FaqAnswer } from "./faq-answer";

interface FaqProps {
  data: IFaqData;
}

/**
 * The question-and-answer panel.
 *
 * This is the one light block in an otherwise dark page, so the panel paints
 * its own background and ink rather than inheriting either. Only one answer is
 * open at a time — `collapsible` lets the reader close that one too, which
 * matters because the open answer pushes every question below it down.
 *
 * The plus rotates 45deg into a cross instead of swapping to a second icon, so
 * the two states animate into each other rather than popping.
 */
export default function Faq({ data }: FaqProps) {
  const { title, eyebrow, items, openFirst } = data;

  return (
    <section className="reveal mt-[80px] md:mt-[100px]">
      <div className="generic-container">
        <div className="rounded-[30px] bg-neutral-white-base px-6 py-12 md:rounded-[40px] md:px-16 md:py-20">
          <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] md:gap-16 lg:gap-24">
            {/* The heading stays put while the column beside it grows, so on
                desktop it sticks rather than stranding itself at the top of a
                long list of open answers. */}
            <div className="md:sticky md:top-32 md:self-start">
              {eyebrow && (
                <p className="body2-semibold mb-3 uppercase tracking-wide text-primary-pink-base">
                  {eyebrow}
                </p>
              )}
              <h2 className="text-[2rem] font-extrabold leading-[1.15] text-neutral-black-light md:text-[2.75rem]">
                {title}
              </h2>
            </div>

            <Accordion.Root
              type="single"
              collapsible
              defaultValue={openFirst ? items[0]?.id : undefined}
              className="w-full"
            >
              {items.map((item) => (
                <Accordion.Item
                  key={item.id}
                  value={item.id}
                  className="border-b border-neutral-black-light/10"
                >
                  <Accordion.Header>
                    <Accordion.Trigger className="group flex w-full items-start justify-between gap-6 py-6 text-left outline-none focus-visible:ring-2 focus-visible:ring-primary-pink-base focus-visible:ring-offset-4 focus-visible:ring-offset-neutral-white-base">
                      <span className="body1-bold text-neutral-black-light transition duration-300 ease-out group-hover:text-primary-pink-base md:text-[1.0625rem]">
                        {item.question}
                      </span>
                      <FaPlus
                        aria-hidden
                        className="mt-1 shrink-0 text-lg text-primary-pink-base transition-transform duration-300 ease-out group-data-[state=open]:rotate-45"
                      />
                    </Accordion.Trigger>
                  </Accordion.Header>

                  <Accordion.Content className="accordion-content">
                    <div className="pb-6 pr-10">
                      <FaqAnswer answer={item.answer} />
                    </div>
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </div>
        </div>
      </div>
    </section>
  );
}
