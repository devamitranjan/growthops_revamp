"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Dialog, VisuallyHidden } from "radix-ui";
import { NavLink } from "./nav-link";
import { SubNavLink } from "./sub-nav-link";
import { SubNavPanel } from "./sub-nav-panel";
import { navLinks } from "./header.data";
import { NavLinkData } from "./header.types";

export default function Header() {
  const [expandedLabel, setExpandedLabel] = useState<string | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const expandedLink =
    navLinks.find((link) => link.label === expandedLabel) ?? null;

  const [lastSubMenu, setLastSubMenu] = useState<NavLinkData | null>(null);

  return (
    <header>
      <Dialog.Root
        onOpenChange={(open) => {
          if (open) setExpandedLabel(null);
        }}
      >
        <div className="generic-container w-full absolute top-0 left-0 z-50 pt-6 md:pt-8 pb-6">
          <div>
            <Link href="/">
              <Image
                src="/go-logo.png"
                alt="goasia-logo"
                width={56}
                height={56}
                priority
                className="md:w-14 md:h-14 w-10 h-10"
              />
            </Link>
          </div>

          <Dialog.Trigger
            ref={triggerRef}
            aria-label="Toggle navigation menu"
            className="fixed top-2 md:top-6 right-0 mr-6 md:mr-18 pointer-events-auto bg-neutral-white-base/20 flex flex-col gap-1.5 h-18 w-18 scale-100 md:scale-75 rounded-full justify-center items-center group transition ease-out duration-300 hover:bg-neutral-white-base/40"
          >
            {/* 4.5px == half the distance between the two bars' centres
                (3px bar + 6px gap), so the open state closes them onto a
                single point instead of a slightly splayed X. */}
            <div className="h-[3px] w-9 rounded-full bg-neutral-white-base transition ease transform duration-300 group-data-[state=open]:translate-y-[4.5px] group-data-[state=open]:rotate-45" />
            <div className="h-[3px] w-9 rounded-full bg-neutral-white-base transition ease transform duration-300 group-data-[state=open]:-translate-y-[4.5px] group-data-[state=open]:-rotate-45" />
          </Dialog.Trigger>
        </div>

        <Dialog.Portal>
          <Dialog.Overlay className="h-screen w-full fixed top-0 left-0 z-40 bg-neutral-black-light/92 backdrop-blur-xl opacity-0 data-[state=open]:animate-[menu-overlay-in_500ms_ease-in-out_forwards] data-[state=closed]:animate-[menu-overlay-out_500ms_ease-in-out_forwards]" />
          <Dialog.Content
            onPointerDownOutside={(event) => {
              if (triggerRef.current?.contains(event.target as Node)) {
                event.preventDefault();
              }
            }}
            className="h-screen w-full fixed top-0 left-0 z-40 opacity-0 outline-none data-[state=closed]:pointer-events-none data-[state=open]:animate-[menu-content-in_500ms_ease-in-out_forwards] data-[state=closed]:animate-[menu-content-out_500ms_ease-in-out_forwards]"
          >
            <VisuallyHidden.Root asChild>
              <Dialog.Title>Navigation menu</Dialog.Title>
            </VisuallyHidden.Root>
            <div className="generic-container relative h-full flex">
              <div
                className={`transition duration-500 ease-in-out max-md:h-full max-md:w-full pt-[20vh] md:mt-20 md:pt-[calc(20vh-5rem)] md:pr-[56px] md:border-r ${
                  expandedLink
                    ? "md:border-neutral-white-base/40 max-md:-translate-x-full max-md:opacity-0 max-md:pointer-events-none"
                    : "md:border-transparent"
                }`}
              >
                <div className="h-full flex flex-col gap-12 md:gap-16 overflow-y-auto pb-[90px] animate-[menu-list-in_400ms_ease-out_150ms_both]">
                  {navLinks.map((link) => (
                    <NavLink
                      key={link.label}
                      link={link}
                      isExpanded={expandedLabel === link.label}
                      isDimmed={
                        expandedLabel !== null && expandedLabel !== link.label
                      }
                      onToggle={() => {
                        setExpandedLabel((current) =>
                          current === link.label ? null : link.label,
                        );
                        setLastSubMenu(link);
                      }}
                    />
                  ))}
                </div>
              </div>

              <div
                className={`max-md:hidden pt-[20vh] pl-14 overflow-y-auto pb-[90px] transition-opacity duration-300 ease-out ${
                  expandedLink ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                <div className="flex flex-col gap-8 max-w-[360px]">
                  {lastSubMenu?.children?.map((child) => (
                    <SubNavLink key={child.label} link={child} />
                  ))}
                </div>
              </div>

              <SubNavPanel
                link={expandedLink}
                onBack={() => setExpandedLabel(null)}
              />

              <div className="h-[90px] w-full absolute bottom-0 left-0 bg-gradient-to-t from-neutral-black-light to-transparent pointer-events-none" />
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </header>
  );
}
