"use client";

import { FaAngleLeft } from "react-icons/fa6";
import { SubNavLink } from "./sub-nav-link";
import type { NavLinkData } from "@/sanity/types";

interface SubNavPanelProps {
  link: NavLinkData | null;
  onBack: () => void;
}

/**
 * Mobile-only drill-down. Absolutely positioned children resolve against the
 * overlay's padding box, so this re-applies `generic-container` to line its
 * links up with the main menu it slides over.
 */
export function SubNavPanel({ link, onBack }: SubNavPanelProps) {
  const isOpen = Boolean(link?.children?.length);

  return (
    <div
      className={`generic-container absolute top-0 left-0 h-full w-full pt-[20vh] flex flex-col gap-8 overflow-y-auto transition duration-500 ease-in-out md:hidden ${
        isOpen
          ? "translate-x-0 opacity-100"
          : "translate-x-full opacity-0 pointer-events-none"
      }`}
    >
      <button
        type="button"
        onClick={onBack}
        className="body3-semibold flex w-fit items-center gap-2 rounded-[40px] border border-white px-3 py-1 text-white transition duration-300 ease-out hover:bg-white/10"
      >
        <FaAngleLeft className="z-10" />
        Back
      </button>

      <div className="flex flex-col gap-8">
        {link?.children?.map((child) => (
          <SubNavLink key={child.label} link={child} />
        ))}
      </div>
    </div>
  );
}
