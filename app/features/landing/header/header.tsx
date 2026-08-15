"use client";

import Image from "next/image";
import { Dialog, VisuallyHidden } from "radix-ui";
import { NavLink } from "./nav-link";
import { navLinks } from "./header.data";

export default function Header() {
  return (
    <header>
      <Dialog.Root>
        <div className="generic-container w-full absolute top-0 left-0 _header_4b1x2_1">
          <div>
            <a
              href="https://www.growthops.asia"
              target="_self"
              rel="noopener noreferrer"
            >
              <Image
                src="/placeholder.svg"
                alt="goasia-logo"
                width={56}
                height={56}
                priority
                className="md:w-14 md:h-14 w-10 h-10"
              />
            </a>
          </div>
          <Dialog.Trigger className="group fixed right-0 mr-6 md:mr-20 bg-neutral-white-base/20 flex flex-col gap-1.5 h-14 w-14 scale-100 max-md:scale-75 rounded-full justify-center items-center transition ease-out duration-300 hover:bg-neutral-white-base/40">
            <div className="h-[3px] w-6 rounded-full bg-neutral-white-base transition ease transform duration-300 group-data-[state=open]:translate-y-[3.5px] group-data-[state=open]:rotate-45" />
            <div className="h-[3px] w-6 rounded-full bg-neutral-white-base transition ease transform duration-300 group-data-[state=open]:-translate-y-[3.5px] group-data-[state=open]:-rotate-45" />
          </Dialog.Trigger>
        </div>

        <Dialog.Portal forceMount>
          <Dialog.Overlay
            forceMount
            className="h-screen w-full fixed transition duration-700 ease-in-out top-0 left-0 bg-neutral-black-base opacity-0 pointer-events-none data-[state=open]:opacity-90 data-[state=open]:pointer-events-auto"
          />
          <Dialog.Content
            forceMount
            className="group h-screen w-full fixed transition duration-700 ease-in-out top-0 left-0 opacity-0 pointer-events-none data-[state=open]:opacity-100 data-[state=open]:pointer-events-auto outline-none"
          >
            <VisuallyHidden.Root asChild>
              <Dialog.Title>Navigation menu</Dialog.Title>
            </VisuallyHidden.Root>
            <div className="generic-container relative h-full flex pt-[10vh] md:justify-center">
              <div className="md:pr-[56px] md:pt-[10vh] transition duration-300 ease-in-out delay-100 flex flex-col gap-12 md:gap-16 opacity-0 translate-y-10 group-data-[state=open]:opacity-100 group-data-[state=open]:translate-y-0">
                {navLinks.map((link) => (
                  <NavLink key={link.label} link={link} />
                ))}
              </div>
              <div className="md:w-2/5 transition duration-300 ease-in-out flex flex-col gap-12 md:gap-8 md:px-[56px] overflow-y-auto border-l border-neutral-white-base opacity-0 pointer-events-none" />
              <div className="md:w-1/3 transition duration-300 ease-in-out flex flex-col gap-12 md:gap-8 md:px-[56px] overflow-y-auto border-l border-neutral-white-base opacity-0 pointer-events-none" />
              <div className="h-[90px] w-full absolute bottom-0 left-0 _header__overlay_menu_bottom_4b1x2_24" />
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </header>
  );
}
